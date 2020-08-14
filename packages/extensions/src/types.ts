import { ISchema} from '@formily/react-schema-renderer'

export type SupportedProps<T> = {
  [key in string]: T
}

export type SchemaEditorExtension = (
  context: IExtensionContext
) => ISchemaEditorExtension;

export interface IExtensionConfig {
  type: string; //类型标识 object/array/number/string/date/boolean/layout
  "x-component"?: string; //组件标识 Input/Select/Checkbox...
  isRoot?: boolean;
  isLeaf?: boolean;
  title?: string; //控件名称，内置扩展需要从locale中读取
  extensionKey?: string; // 导出对象的key, 如果不设置，默认规则为`${x-component}Extension`
  defaultProps?: {}; //默认配置数据;
  getSchema?: (schema?:ISchema) => ({})
}

export interface IExtensionContext {
  locale?: { [name: string]: any };
}

export interface ISchemaEditorExtension {
  type: string; //类型标识 object/array/number/string/date/boolean/layout
  "x-component"?: string; //组件标识 Input/Select/Checkbox...
  isRoot?: boolean;
  isLeaf?: boolean;
  title?: string; //控件名称，内置扩展需要从locale中读取
  // icon?: React.ReactNode; //图标
  configs: {
    defaultProps?: {}; //默认配置数据
    schema?: ISchema; //配置schema
  };
}