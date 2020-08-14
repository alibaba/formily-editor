import { IExtensionConfig } from '../types'

export const TimePickerExtension: IExtensionConfig = {
  type: 'string',
  'x-component': 'TimePicker',
  title: '时间选择',
  defaultProps: {
    hasClear: true,
  }
}


