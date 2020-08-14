import { IExtensionConfig } from '../types'

export const FormExtension:IExtensionConfig = {
  type: 'object',
  title: '表单全局配置',
  'x-component': 'Form',
  isRoot: true,
  defaultProps: {
    labelTextAlign: 'right',
    labelCol: 7,
    wrapperCol: 12,
  },
  getSchema: (schema) => {
    schema.properties.size.description = ""
    schema.properties.size.title = "尺寸"
    schema.properties.labelCol = {
      ...schema.properties.labelCol,
      type: "range",
      "x-component-props": {
        min: 0,
        max: 24,
        step: 1,
        hasTip: true,
        marks: 12
      }
    }
    schema.properties.wrapperCol = {
      ...schema.properties.wrapperCol,
      type: "range",
      "x-component-props": {
        min: 0,
        max: 24,
        step: 1,
        hasTip: true,
        marks: 12
      }
    }

    return schema
  }
} 


