import pick from "lodash.pick"
import { Schema } from '../../shared/schema'
import { ISchema } from "@formily/next"

// enum 这个属性只和控件有关，不和type相关，所以这个属性应该声明在控件上
const mapper = {
  "string": ["key", "title", "type", "x-component", "description", "default", "editable", "visible", "x-rules"],
  "number": ["key", "title", "type", "x-component", "description", "default", "editable", "visible", "x-rules"],
  "boolean": ["key", "title", "type", "x-component", "description", "default", "editable", "visible", "x-rules"],
  "array": ["key", "title", "type", "x-component", "description", "default", "editable", "visible", "x-rules"],
  "object": ["key", "title", "type", "description", "default", "editable", "visible", "x-rules"],
  "layout": ["key", "title", "type", "x-component", "visible",],
}

// 固定不开启表达式功能的配置字段
const expressionExcludeKeys = ['key', 'type', 'x-component', 'x-rules', 'default'] 

const appendXComponent = (schema: ISchema, expression: boolean = false) => {
  if(!schema || Object.keys(schema.properties).length === 0)return schema;

  Object.keys(schema.properties).forEach(key => {
    if(expressionExcludeKeys.includes(key))return

    if(expression)schema.properties[key]['x-component'] += 'withExpression'
  })

  return schema
}

const getXComponentForDefaultField = (type) => {
  let xComponent = ''
  switch (type) {
    case 'array': xComponent = 'JsonDialogInputer';break;
    case 'object': xComponent = 'JsonDialogInputer';break;
    case 'boolean': xComponent = 'switch';break;
    default: xComponent = 'input'
  }

  return xComponent
}

export const getCommonConfigSchema = (type: string) => {
  const properties = {
    key: {
      type: "string",
      required: true,
      title: "标识",
      editable: false,
      "x-component": "input",
      'x-component-props': {
        placeholder: 'key'
      }
    },
    title: {
      type: "string",
      title: "标题",
      "x-component": "input",
      description: "作为表单字段的标题",
      'x-component-props': {
        placeholder: 'label'
      }
    },
    type: {
      type: "string",
      required: true,
      title: "类型",
      editable: false,
    },
    "x-component": {
      type: "string",
      required: true,
      title: "控件",
      enum: [],
      "x-component": "select",
    },
    "description": {
      type: "string",
      required: false,
      title: "描述",
      "x-component": "input"
    },
    "default": {
      type: "string", // 根据nodeType联动
      required: false,
      title: "默认值",
    },
    // "editable": {
    //   type: "boolean",
    //   title: "是否可修改",
    //   default: true,
    //   "x-component": "switch"
    // },
    // "visible": {
    //   type: "boolean",
    //   title: "是否可见",
    //   default: true,
    //   "x-component": "switch"
    // },
    "x-rules": {
      type: "array",
      "x-component": "RulesWidget",
      "x-component-props": {
        locale: {},
      }
    }
  }

  return {
    type: "object",
    properties: pick(properties, mapper[type]) 
  }
}

const getDefaultProps = (extensionSchema, configDefaultProps) => {
  const schema = new Schema(extensionSchema)

  let defaultProps = {}

  schema.mapProperties((s, key) => {
    defaultProps[key] = s.default || s.getEmptyValue()
  })

  return {
    ...defaultProps,
    ...configDefaultProps,
  }
}

export default (contex) => {
  
  const {
    schema, 
    selectedPath,
    currentSchema = new Schema({}), 
    isRoot, 
    extensionSchema, 
    locale, 
    types = [], 
    updateSchemaSelfProps,
    extensionDefaultProps,
    expression = false,
  } = contex
  
  currentSchema['x-component-props'] = 
    Object.assign(
      {},
      getDefaultProps(extensionSchema, extensionDefaultProps), 
      currentSchema['x-component-props'] || {},
    )
  const commonConfigSchema = getCommonConfigSchema(currentSchema.type)
  // if(isEmpty(currentSchema.editable))currentSchema.editable = true;
  // if(isEmpty(currentSchema.visible))currentSchema.editable = true;
  
  const xComponentDataSource = contex['x-components'].filter(item => item.type === currentSchema.type)

  return {
    schema,
    selectedPath,
    isRoot,
    extensionSchema,
    commonConfigSchema: appendXComponent(commonConfigSchema, expression), 
    types,
    xComponents: contex['x-components'],
    xComponentDataSource,
    locale,
    currentSchema,
    updateSchemaSelfProps,
    xComponentForDefaultField: getXComponentForDefaultField(currentSchema.type)
  }

}