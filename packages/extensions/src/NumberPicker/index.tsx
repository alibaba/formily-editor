import { IExtensionConfig } from '../types'

export const NumberPickerExtension:IExtensionConfig = {
  type: 'number',
  'x-component': 'NumberPicker',
  title: '数字输入框',
  getSchema: (schema) => {
    schema.properties.step.type = "number"
    return schema
  }
}


