import { IExtensionConfig } from '../types'

export const InputExtension:IExtensionConfig = {
  type: 'string',
  'x-component': 'Input',
  title: '文本输入框',
  defaultProps: {
    trim: true,
    hasClear: true,
  }
} 


