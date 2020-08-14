/**
 * 注意：临时模块，目前的策略是，先在此处完善完成，上线之后，会将扩展的方法merge到formily核心代码中
 *
 */

import {
  ValidatePatternRules,
  ValidateArrayRules,
  getMessage
} from "@formily/validator";
import {
  lowercase,
  map,
  each,
  isEmpty,
  isEqual,
  isArr,
  toArr,
  isBool,
  isValid,
  FormPathPattern,
  FormPath,
  deprecate
} from "@formily/shared";
import { SchemaMessage, ISchema } from "@formily/react-schema-renderer";

const numberRE = /^\d+$/;

type SchemaProperties<T = Schema> = {
  [key: string]: T;
};

const findProperty = (object: any, propertyKey: string | number) => {
  if (!object) return object;
  if (object[propertyKey]) {
    return object[propertyKey];
  }
  //降级搜索，如果key通过映射的方式没有完全映射上，会提供降级搜索方式，保证完备性
  for (let key in object) {
    if (FormPath.parse(key).match(`[[${propertyKey}]]`)) {
      return object[key];
    }
  }
};

export const filterProperties = <T extends object>(
  object: T,
  keys: string[]
): T => {
  let result = {} as any;
  for (let key in object) {
    if (!keys.includes(key) && Object.hasOwnProperty.call(object, key)) {
      result[key] = object[key];
    }
  }
  return result;
};

//向后兼容逻辑，未来会干掉
const COMPAT_FORM_ITEM_PROPS = [
  //next
  "required",
  "prefix",
  "labelAlign",
  "hasFeedback",
  "labelCol",
  "wrapperCol",
  "label",
  "help",
  "labelTextAlign",
  "fullWidth",
  "extra",
  "size",
  "asterisk",
  "labelWidth",
  "device",
  "isPreview",
  "renderPreview",
  "validateState",
  //antd
  "colon",
  "htmlFor",
  "validateStatus",
  "prefixCls",
  //formily
  "triggerType",
  "itemStyle",
  "itemClassName",
  "addonAfter"
];

export class Schema implements ISchema {
  /** base json schema spec**/
  public title?: SchemaMessage;
  public description?: SchemaMessage;
  public default?: any;
  public readOnly?: boolean;
  public writeOnly?: boolean;
  public type?: ISchema["type"];
  public enum?: ISchema["enum"];
  public const?: any;
  public multipleOf?: number;
  public maximum?: number;
  public exclusiveMaximum?: number;
  public minimum?: number;
  public exclusiveMinimum?: number;
  public maxLength?: number;
  public minLength?: number;
  public pattern?: string | RegExp;
  public maxItems?: number;
  public minItems?: number;
  public uniqueItems?: boolean;
  public maxProperties?: number;
  public minProperties?: number;
  public required?: string | boolean | string[];
  public format?: string;
  /** nested json schema spec **/
  public properties?: SchemaProperties;
  public items?: Schema | Schema[];
  public additionalItems?: Schema;
  public patternProperties?: {
    [key: string]: Schema;
  };
  public additionalProperties?: Schema;
  /** extend json schema specs */
  public editable?: boolean;
  public visible?: boolean;
  public display?: boolean;
  public triggerType?: "onBlur" | "onChange";
  public ["x-props"]?: { [name: string]: any };
  public ["x-index"]?: number;
  public ["x-rules"]?: ValidatePatternRules;
  public ["x-component"]?: string;
  public ["x-component-props"]?: ISchema["x-component-props"];
  public ["x-render"]?: ISchema["x-render"];
  public ["x-effect"]?: ISchema["x-effect"];
  /** schema class self specs**/

  public parent?: Schema;

  public children?: Schema[];

  public _isJSONSchemaObject = true;

  public __ID__?:string

  public key?: string;

  public path?: string;

  constructor(json: ISchema, parent?: Schema, key?: string) {
    if (key) {
      this.key = key;
    }
    this.setParent(parent);
    if (json instanceof Schema) {
      if (this.parent) {
        json.parent = this.parent;
      }
      if (this.key) {
        json.key = this.key;
      }
      if (this.path) {
        json.path = this.path;
      }
      return json;
    }
    return this.fromJSON(json) as any;
  }

  setParent(parent?: Schema) {
    if (parent) {
      this.parent = parent;
    }
    if (this.parent && this.parent.isArray()) {
      this.path = this.parent.path + ".0";
    } else {
      if (this.parent) {
        this.path = this.parent.path
          ? this.parent.path + "." + this.key
          : this.key;
      } else {
        this.path = "";
      }
    }
  }

  /**
   * getters
   */
  get(path?: FormPathPattern) {
    if (!path) {
      return this;
    }
    let res: Schema = this;
    let depth = 0;
    let parsed = FormPath.parse(path);
    parsed.forEach(key => {
      if (res && !isEmpty(res.properties)) {
        res =
          findProperty(res.properties, key) ||
          findProperty(res.properties, parsed.segments.slice(depth).join("."));
      } else if (res && !isEmpty(res.items) && numberRE.test(key as string)) {
        res = isArr(res.items) ? findProperty(res.items, key) : res.items;
      }
      depth++;
    });
    return res;
  }

  merge(spec: any) {
    if (spec instanceof Schema) {
      Object.assign(this, spec.getSelfProps());
    } else {
      Object.assign(this, spec);
    }
    return this;
  }

  getEmptyValue() {
    if (this.type === "string") {
      return "";
    }
    if (this.type === "array") {
      return [];
    }
    if (this.type === "object") {
      return {};
    }
    if (this.type === "number") {
      return 0;
    }
  }

  getSelfProps() {
    const {
      _isJSONSchemaObject,
      __ID__,
      properties,
      additionalProperties,
      additionalItems,
      patternProperties,
      items,
      path,
      parent,
      children,
      ...props
    } = this;
    return props;
  }
  getExtendsRules() {
    let rules: ValidateArrayRules = [];
    if (this.format) {
      rules.push({ format: this.format });
    }
    if (isValid(this.maxItems)) {
      rules.push({ max: this.maxItems });
    }
    if (isValid(this.minItems)) {
      rules.push({ min: this.minItems });
    }
    if (isValid(this.maxLength)) {
      rules.push({ max: this.maxLength });
    }
    if (isValid(this.minLength)) {
      rules.push({ min: this.minLength });
    }
    if (isValid(this.maximum)) {
      rules.push({ maximum: this.maximum });
    }
    if (isValid(this.minimum)) {
      rules.push({ minimum: this.minimum });
    }
    if (isValid(this.exclusiveMaximum)) {
      rules.push({ exclusiveMaximum: this.exclusiveMaximum });
    }
    if (isValid(this.exclusiveMinimum)) {
      rules.push({ exclusiveMinimum: this.exclusiveMinimum });
    }
    if (isValid(this.pattern)) {
      rules.push({ pattern: this.pattern });
    }
    if (isValid(this.const)) {
      rules.push({
        validator: value => {
          return value === this.const ? "" : getMessage("schema.const");
        }
      });
    }
    if (isValid(this.multipleOf)) {
      rules.push({
        validator: value => {
          return value % this.multipleOf === 0
            ? ""
            : getMessage("schema.multipleOf");
        }
      });
    }
    if (isValid(this.maxProperties)) {
      rules.push({
        validator: value => {
          return Object.keys(value || {}).length <= this.maxProperties
            ? ""
            : getMessage("schema.maxProperties");
        }
      });
    }
    if (isValid(this.minProperties)) {
      rules.push({
        validator: value => {
          return Object.keys(value || {}).length >= this.minProperties
            ? ""
            : getMessage("schema.minProperties");
        }
      });
    }
    if (isValid(this.uniqueItems) && this.uniqueItems) {
      rules.push({
        validator: value => {
          value = toArr(value);
          return value.some((item: any, index: number) => {
            for (let start = index; start < value.length; start++) {
              if (isEqual(value[start], item)) {
                return false;
              }
            }
          })
            ? getMessage("schema.uniqueItems")
            : "";
        }
      });
    }
    /**剩余校验的都是关联型复杂校验，不抹平，让用户自己处理 */
    if (isValid(this["x-rules"])) {
      rules = rules.concat(this["x-rules"]);
    }

    return rules;
  }
  getExtendsRequired() {
    if (isBool(this.required)) {
      return this.required;
    }
  }
  getExtendsEditable(): boolean {
    const { editable } = this.getExtendsComponentProps();
    if (isValid(this.editable)) {
      return this.editable;
    } else if (isValid(editable)) {
      return editable;
    } else if (isValid(this.readOnly)) {
      return !this.readOnly;
    }
  }
  getExtendsVisible(): boolean {
    const { visible } = this.getExtendsComponentProps();
    if (isValid(this.visible)) {
      return this.visible;
    } else if (isValid(visible)) {
      return visible;
    }
  }
  getExtendsDisplay(): boolean {
    const { display } = this.getExtendsComponentProps();
    if (isValid(this.display)) {
      return this.display;
    } else if (isValid(display)) {
      return display;
    }
  }
  getExtendsTriggerType() {
    const itemProps = this.getExtendsItemProps();
    const props = this.getExtendsProps();
    const componentProps = this.getExtendsComponentProps();
    if (this.triggerType) {
      return this.triggerType;
    }
    if (itemProps.triggerType) {
      return itemProps.triggerType;
    } else if (props.triggerType) {
      return props.triggerType;
    } else if (componentProps.triggerType) {
      return componentProps.triggerType;
    }
  }
  getExtendsItemProps() {
    if (isValid(this["x-item-props"])) {
      deprecate("x-item-props is deprecate in future, Please do not use it.");
    }
    return this["x-item-props"] || {};
  }

  getExtendsComponent() {
    return this["x-component"];
  }
  getExtendsRenderer() {
    if (isValid(this["x-render"])) {
      deprecate("x-render is deprecate in future, Please do not use it.");
    }
    return this["x-render"];
  }
  getExtendsEffect() {
    return this["x-effect"];
  }
  getExtendsProps() {
    return this["x-props"] || {};
  }
  getExtendsComponentProps() {
    return {
      ...filterProperties(this["x-props"], COMPAT_FORM_ITEM_PROPS),
      ...this["x-component-props"]
    };
  }
  getExtendsLinkages() {
    return this["x-linkages"];
  }
  /**
   * getters
   */
  setProperty(key: string, schema: ISchema) {
    this.properties = this.properties || {};
    this.children = this.children || [];
    const alreadyHaveProperty = !!this.properties[key];
    this.properties[key] = new Schema(schema, this, key);
    if (!alreadyHaveProperty) {
      this.properties[key]["x-index"] = this.children.length;
      this.children.push(this.properties[key]);
    } else {
      this.children[this.properties[key]["x-index"]] = this.properties[key];
    }
    return this.properties[key];
  }

  setProperties(properties: SchemaProperties<ISchema>) {
    let orderProperties = [];
    const unorderProperties = [];
    each(properties, (item, key) => {
      if (!item) return;
      const index = item["x-index"];
      this.properties[key] = new Schema(item, this, key);
      if (typeof index === "number") {
        orderProperties[index] = this.properties[key];
      } else {
        unorderProperties.push(this.properties[key]);
      }
    });
    orderProperties = orderProperties.filter(item => item)
    this.children = orderProperties
      .concat(unorderProperties)
      .map((schema, index) => {
        schema["x-index"] = index;
        return schema;
      });
    return this.properties;
  }

  setArrayItems(schema: ISchema) {
    this.items = new Schema(schema, this);
    return this.items;
  }

  toJSON() {
    const result: ISchema = this.getSelfProps();
    if (isValid(this.properties)) {
      result.properties = map(this.properties, schema => {
        return schema.toJSON();
      });
    }
    if (isValid(this.items)) {
      result.items = isArr(this.items)
        ? this.items.map(schema => schema.toJSON())
        : this.items.toJSON();
    }
    if (isValid(this.additionalItems)) {
      result.additionalItems = this.additionalItems.toJSON();
    }
    if (isValid(this.additionalProperties)) {
      result.additionalProperties = this.additionalProperties.toJSON();
    }
    if (isValid(this.patternProperties)) {
      result.patternProperties = map(this.patternProperties, schema => {
        return schema.toJSON();
      });
    }
    return result;
  }

  fromJSON(json: ISchema = {}) {
    if (typeof json === "boolean") return json;
    if (json instanceof Schema) {
      Object.assign(this, json);
      return this;
    } else {
      Object.assign(this, json);
    }
    if (isValid(json.type)) {
      this.type = lowercase(String(json.type));
    }
    if (isValid(json["x-component"])) {
      this["x-component"] = lowercase(json["x-component"]);
    }

    const emptyProperties = isEmpty(json.properties);
    const emptyItems = isEmpty(json.items);

    if (!emptyProperties) {
      this.children = [];
      this.setProperties(json.properties);
    }
    if (isValid(json.additionalProperties)) {
      this.additionalProperties = new Schema(json.additionalProperties, this);
    }
    if (isValid(json.patternProperties)) {
      this.patternProperties = map(json.patternProperties, (item, key) => {
        return new Schema(item, this, key);
      });
    }
    if (!emptyItems) {
      this.items = isArr(json.items)
        ? map(json.items, item => new Schema(item, this))
        : new Schema(json.items, this);
      if (isValid(json.additionalItems)) {
        this.additionalItems = new Schema(json.additionalItems, this);
      }
    }
    if (emptyProperties && emptyItems) {
      this.children = [];
    }
    return this;
  }
  /**
   * tools
   */
  isObject() {
    return this.type === "object";
  }
  isArray() {
    return this.type === "array";
  }

  mapProperties(callback?: (schema: Schema, key: string) => any) {
    if (this.children && this.children.length) {
      return this.children.map(schema => {
        return callback(schema, schema.key);
      });
    }
    return this.getOrderProperties().map(({ schema, key }) => {
      return callback(schema, key);
    });
  }

  getOrderProperties() {
    return Schema.getOrderProperties(this);
  }

  unrelease_getOrderPatternProperties() {
    return Schema.getOrderProperties(this, "patternProperties");
  }

  unrelease_mapPatternProperties(
    callback?: (schema: Schema, key: string) => any
  ) {
    return this.unrelease_getOrderPatternProperties().map(({ schema, key }) => {
      return callback(schema, key);
    });
  }

  /** node mutators **/

  append(key: string, json: ISchema): Schema {
    let schema:Schema
    if (this.isArray()) {
      this.items = new Schema(
        {
          type: "object"
        },
        this
      );
      this.children = [this.items];
      return this.items.append(key, json);
    } else {
      if (json instanceof Schema && json.parent) {
        json.remove();
        schema = json;
      } else {
        schema = new Schema(json)
      }
      this.setProperty(key, schema);
    }
    return this;
  }

  removeChildByKey(key: string): Schema {
    if (this.isArray()) {
      if (this.items instanceof Schema) {
        this.items.removeChildByKey(key);
      }
    } else {
      this.properties = this.properties || {};
      const foundIndex = this.children.findIndex(
        schema => this.properties[key] === schema
      );
      let index = 0;
      this.children = this.children.reduce((buf, schema, idx) => {
        if (idx === foundIndex) {
          return buf;
        } else {
          schema.setParent(this);
          schema["x-index"] = index++;
          return buf.concat(schema);
        }
      }, []);
      delete this.properties[key];
    }
    return this;
  }

  removeChildByIndex(index: number): Schema {
    if (this.isArray()) {
      if (this.items instanceof Schema) {
        this.items.removeChildByIndex(index);
      }
    } else if (this.children && this.children[index]) {
      let _index = 0;
      this.children = this.children.reduce((buf, schema, idx) => {
        if (idx === index) {
          return buf;
        } else {
          schema.setParent(this);
          schema["x-index"] = _index++;
          return buf.concat(schema);
        }
      }, []);
      delete this.properties[this.children[index].key];
    }
    return this;
  }

  remove(): Schema {
    if (this.parent) {
      if (this.key) {
        this.parent.removeChildByKey(this.key);
      } else {
        if (this.parent.isArray()) {
          delete this.parent.items;
        }
      }
    }
    return this;
  }

  insertBefore(json: ISchema) {
    let schema: Schema;
    if (json instanceof Schema) {
      if (
        this.parent &&
        this.parent.properties &&
        this.parent.properties[json.key]
      ) {
        if (this.parent.properties[json.key] !== json) {
          throw new Error("The schema node key cannot be duplicated");
        }
      }

      if (json.parent) {
        json.remove();
      }

      schema = json;
    } else {
      schema = new Schema(json);
      if (!schema["key"]) {
        throw new Error("The schema node must have 'key' property.");
      }
    }
    if (this.parent) {
      let index = 0;
      const newChildren = [];
      const targetIndex = this["x-index"];
      for (let idx = 0; idx < this.parent.children.length; idx++) {
        const item = this.parent.children[idx];
        if (idx === targetIndex) {
          schema["x-index"] = index;
          item["x-index"] = index + 1;
          item.setParent(this.parent);
          index += 2;
          newChildren.push(schema, item);
        } else {
          item["x-index"] = index++;
          newChildren.push(item);
        }
      }
      schema.setParent(this.parent);
      this.parent.children = newChildren;
      this.parent.properties[schema["key"]] = schema;
    } else {
      throw new Error("The schema root node cannot be moved.");
    }
  }

  insertAfter(json: ISchema) {
    let schema: Schema;
    if (json instanceof Schema) {
      if (
        this.parent &&
        this.parent.properties &&
        this.parent.properties[json.key]
      ) {
        if (this.parent.properties[json.key] !== json) {
          throw new Error("The schema node key cannot be duplicated");
        }
      }

      if (json.parent) {
        json.remove();
      }

      schema = json;
    } else {
      schema = new Schema(json);
      if (!schema["key"]) {
        throw new Error("The schema node must have 'key' property.");
      }
    }
    if (this.parent) {
      let index = 0;
      const newChildren = [];
      const targetIndex = this["x-index"];
      for (let idx = 0; idx < this.parent.children.length; idx++) {
        const item = this.parent.children[idx];
        if (idx === targetIndex) {
          item["x-index"] = index;
          schema["x-index"] = index + 1;
          item.setParent(this.parent);
          index += 2;
          newChildren.push(item, schema);
        } else {
          item["x-index"] = index++;
          newChildren.push(item);
        }
      }
      schema.setParent(this.parent);
      this.parent.children = newChildren;
      this.parent.properties[schema["key"]] = schema;
    } else {
      throw new Error("The schema root node cannot be moved.");
    }
  }

  static getOrderProperties = (
    schema: ISchema = {},
    propertiesName: string = "properties"
  ) => {
    const newSchema = new Schema(schema);
    const orderProperties = [];
    const unorderProperties = [];
    each(newSchema[propertiesName], (item, key) => {
      const index = item["x-index"];
      if (typeof index === "number") {
        orderProperties[index] = { schema: item, key };
      } else {
        unorderProperties.push({ schema: item, key });
      }
    });

    return orderProperties.filter(schema => !!schema).concat(unorderProperties);
  };
}
