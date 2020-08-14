import { IExtensionConfig } from '../types'

// 暂时不开放，不能换行
const schema = {
  type: "object",
  properties: {
    gutter: {
      type: "number",
      title: "列间距",
      default: 16,
    },
    cols: { // 需要做解析与转换
      type: "array",
      title: "列数量",
      default: [8, 8, 8],
      "x-component": "GridColsInputer",
      "x-component-props": {
        dataSource: [2,3,4]
      }
    }
  }
}

export const FormItemGridExtension:IExtensionConfig = {
  type: 'layout',
  'x-component': 'grid',
  title: '网格布局',
  defaultProps:{},
  getSchema: () => {
    return schema
  }
} 