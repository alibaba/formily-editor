
import { IExtensionConfig } from '../types'

export const FormDialogExtension:IExtensionConfig = {
  type: 'layout',
  'x-component': 'FormDialog',
  title: '弹窗',
  defaultProps:{
    btnText: '配置',
    title: '配置',
  },
  getSchema: () => {
    return {
      type: "object",
      properties: {
        "btnText": {
          title: "按钮文案",
          type: "string",
          'x-component': 'input',
        },
        "title": {
          type: 'string',
          title: '弹窗标题文案',
          'x-component': 'input',
        }
      }
    }
  }
} 
