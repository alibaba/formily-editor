import { IExtensionConfig } from '../types'
const schema = {
  type: "object",
  properties: {
    renderAddition: {
      type: "string",
      title: "添加按钮文案",
      default: "添加",
    },
    renderRemove: {
      type: "string",
      title: "删除按钮文案",
      default: "删除"
    },
    renderEmpty: {
      type: "string",
      title: "无数据时的提示文案",
      default: "暂无数据"
    },
  }
}

export const ArrayTableExtension:IExtensionConfig = {
  type: 'array',
  'x-component': 'ArrayTable',
  title: '表格',
  getSchema: () => {
    return schema
  }
}


