import { useContext, useEffect, useMemo, useRef } from "react";
import { ISchemaEditorProps, SchemaEditorExtension } from "../types";
import {
  Schema,
  EditorContext,
  FormPath,
  isEqual,
  isEmpty,
  FormPathPattern,
  toArr,
  isFn,
  camelCase,
  lowercase,
  uid,
  merge,
  clone
} from "../shared";
import { useForceUpdate } from "./useForceUpdate";
import { ISchema } from "@formily/next";
import editorLocale from '../locale'

const equalString = (a1: string, a2: string) => {
  return lowercase(a1) === lowercase(a2);
};

const parseExtensions = (
  extensions: SchemaEditorExtension[],
  schema: Schema,
  { isRoot, locale }: { isRoot: boolean; locale: any }
) => {
  const types = {};
  const components = {};
  return toArr(extensions).reduce((buf, extension: SchemaEditorExtension) => {
    if (!isFn(extension)) return buf;
    const item = extension({ locale });
    if (item.type && !types[item.type]) {
      buf.types = buf.types || [];
      buf.types.push({
        label: camelCase(item.type),
        value: item.type,
        icon: item.icon,
        isLeaf: item.isLeaf,
        children: [],
      });
      types[item.type] = true;
    }
    if (item["x-component"]) {
      buf["x-components"] = buf["x-components"] || [];
      buf["x-components"].push({
        label: item.title,
        value: lowercase(item["x-component"]),
        icon: item.icon,
        type: item.type,
        isLeaf: item.isLeaf,
        extensionSchema: item.configs.schema
      });

      if (isRoot && item.isRoot) {
        if (item.configs) {
          buf.schema = item.configs.schema;
          buf.props = item.configs.defaultProps;
        }
        return buf;
      }

      if(!item.isRoot) {
        buf.types.find(type => type.value === item.type).children.push({
          label: item.title,
          value: lowercase(item["x-component"]),
          icon: item.icon,
          type: item.type,
          isLeaf: item.isLeaf
        })
      }
      components[item["x-component"]] = true;
    }

    if (buf.schema || buf.props) return buf;
    
    if (schema) {
      if (schema["x-component"]) {
        if (equalString(item["x-component"], schema["x-component"]) && equalString(item.type, schema.type)) {
          if (item.configs) {
            buf.schema = item.configs.schema;
            buf.props = item.configs.defaultProps;
          }
          return buf;
        }
      } else {
        if (equalString(item.type, schema.type) && !isRoot) {
          if (item.configs) {
            buf.schema = item.configs.schema;
            buf.props = item.configs.defaultProps;
          }
          return buf;
        }
      }
    }

    return buf;
  }, {});
};

/**
 * 5个功能
 * 1. 扩展机制
 * 2. schema节点选择机制
 * 4. schema 节点操作广播功能
 * 5. undo/redo机制
 * @param props ISchemaEditorProps
 */
export const useEditorProvider = (props: ISchemaEditorProps) => {
  const _schema = clone(props.schema)

  const forceUpdate = useForceUpdate();
  const histories = useRef({
    stack: [],
    timeline: 0
  });
  const selectedPath = useRef(FormPath.parse(""));
  const transaction = useRef(null);
  const timer = useRef(null);
  const prevSchema = useRef(_schema);
  const schema = useMemo(() => {
    let initialSchema = clone(_schema);
    if(isEmpty(initialSchema)){
      initialSchema = {
        type: "object",
        properties: {}
      }
    }else{
      initialSchema.type = "object"
    }
    return new Schema(initialSchema);
  }, [props.schema])

  useEffect(() => {
    setSchema(_schema)
  }, [props.schema]);

  const setSchema = (newSchema: ISchema) => {
    if (!isEqual(prevSchema.current, newSchema)) {
      schema.fromJSON(newSchema);
      selectedPath.current = FormPath.parse("");
      updateSchema()
    }
  }

  const updateSchema = () => {
    schema["__ID__"] = uid();
    forceUpdate();
  };

  const record = () => {
    if (transaction.current) return;
    histories.current.timeline = histories.current.stack.length;
    histories.current.stack.push({
      schema: schema.toJSON(),
      selectedPath: new FormPath(selectedPath.current)
    });
  };

  const undo = () => {
    const state = histories.current.stack[histories.current.timeline - 1];
    if (state) {
      transaction.current = true;
      schema.fromJSON(state.schema);
      selectedPath.current = state.selectedPath;
      updateSchema();
      histories.current.timeline--;
      transaction.current = false;
    }
  };

  const redo = () => {
    const state = histories.current.stack[histories.current.timeline + 1];
    if (state) {
      transaction.current = true;
      schema.fromJSON(state.schema);
      selectedPath.current = state.selectedPath;
      updateSchema();
      histories.current.timeline++;
      transaction.current = false;
    }
  };

  const updateSchemaSelfProps = (props: ISchema) => {
    const current = schema.get(selectedPath.current);
    if (current) {
        current.merge(props);
        schema["__ID__"] = uid();
    }
  };

  const updateSchemaXLinkages = (props: ISchema["x-linkages"]) => {
    const current = schema.get(selectedPath.current);
    if (current) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        current["x-linkages"] = props;
        updateSchema();
        // record();
      }, 100);
    }
  };

  const updateSchemaXRules = (props: ISchema["x-rules"]) => {
    const current = schema.get(selectedPath.current);
    if (current) {
      current["x-rules"] = props;
      updateSchema();
      //record();
    }
  };

  const appendSchemaNode = (
    path: FormPathPattern,
    node: ISchema & { key: string }
  ) => {
    const parent = schema.get(path);
    if (parent) {
      record();
      parent.append(node.key, node);
      updateSchema();
      selectSchemaNode(new FormPath(path).concat([node.key]));
      record();
    }
  };

  const appendAfterSchemaNode = (
    path: FormPathPattern,
    node: ISchema & { key: string }
  ) => {
    const source = schema.get(path);
    if (source) {
      record();
      source.insertAfter(node);
      selectSchemaNode(new FormPath(source.parent.path).concat([node.key]));
      record();
    }
  };

  const appendBeforeSchemaNode = (
    path: FormPathPattern,
    node: ISchema & { key: string }
  ) => {
    const source = schema.get(path);
    if (source) {
      record();
      source.insertBefore(node);
      updateSchema();
      selectSchemaNode(new FormPath(source.parent.path).concat([node.key]));
      record();
    }
  };

  const moveChildrenSchemaNode = (
    source: FormPathPattern,
    target: FormPathPattern
  ) => {
    const sourceNode = schema.get(source);
    const targetNode = schema.get(target);
    if (sourceNode && targetNode) {
      record();
      sourceNode.append(targetNode.key, targetNode);
      selectSchemaNode(targetNode.path);
      updateSchema();
      record();
    }
  };

  const moveAfterSchemaNode = (
    source: FormPathPattern,
    target: FormPathPattern
  ) => {
    const sourceNode = schema.get(source);
    const targetNode = schema.get(target);
    if (sourceNode && targetNode) {
      record();
      sourceNode.insertAfter(targetNode);
      selectSchemaNode(targetNode.path);
      updateSchema();
      record();
    }
  };

  const moveBeforeSchemaNode = (
    source: FormPathPattern,
    target: FormPathPattern
  ) => {
    const sourceNode = schema.get(source);
    const targetNode = schema.get(target);
    if (sourceNode && targetNode) {
      record();
      sourceNode.insertBefore(targetNode);
      selectSchemaNode(targetNode.path);
      updateSchema();
      record();
    }
  };

  const removeSchemaNode = (path: FormPathPattern) => {
    const node = schema.get(path);
    if (node) {
      record();
      node.remove();
      selectSchemaNode("");
      updateSchema();
      record();
    }
  };

  const selectSchemaNode = (path: FormPathPattern) => {
    selectedPath.current = FormPath.parse(path);
    forceUpdate();
  };

  const currentSchema = schema.get(selectedPath.current);

  const isRoot = selectedPath.current.length === 0;

  const locale = merge(editorLocale, (props.locale || {}));

  const allowUndo = () => {
    return histories.current.timeline > 0;
  };

  const allowRedo = () => {
    return histories.current.timeline < histories.current.stack.length - 1;
  };

  const {
    schema: extensionSchema,
    props: extensionDefaultProps,
    types,
    ["x-components"]: xcomponents
  } = parseExtensions(props.extensions, currentSchema, {
    isRoot,
    locale
  });


  const getSchema = (json = true) => {
    return json ? schema.toJSON() : schema
  }

  return {
    locale,
    types,
    ["x-components"]: xcomponents,
    selectedPath: selectedPath.current,
    schema,
    currentSchema,
    extensionSchema,
    extensionDefaultProps,
    isRoot,
    initialMode: props.initialMode,
    expression: props.expression,
    renderToolbar: props.renderToolbar,
    getSchema,
    setSchema,
    updateSchemaSelfProps,
    updateSchemaXLinkages,
    updateSchemaXRules,
    appendSchemaNode,
    moveChildrenSchemaNode,
    appendAfterSchemaNode,
    appendBeforeSchemaNode,
    moveAfterSchemaNode,
    moveBeforeSchemaNode,
    removeSchemaNode,
    selectSchemaNode,
    allowUndo,
    allowRedo,
    undo,
    redo
  };
};

export const useEditor = () => {
  return useContext(EditorContext);
};
