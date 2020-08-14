import { IExtensionConfig} from '../types'

export const DatePickerExtension:IExtensionConfig = {
  type: 'string',
    'x-component': 'DatePicker',
    title: '日期选择',
    defaultProps: {
      hasClear: true,
      showTime: false,
    },
    getSchema: (schema) => {
      schema.properties.showTime.type = 'boolean'
      return schema
    }
}