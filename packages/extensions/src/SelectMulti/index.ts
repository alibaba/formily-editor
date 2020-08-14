import { IExtensionConfig } from '../types'
import { buildDataSourceSchema } from '../util' 

export const SelectMultiExtension: IExtensionConfig = {
  type: 'array',
  extensionKey: 'selectmultiExtension',
  'x-component': 'select',
  title: '下拉选择框(静态数据源)',
  defaultProps: {
    hasClear: true,
    useVirtual: false,
    filterLocal: false,
    showSearch: true,
    mode: 'multiple',
    maxTagCount: undefined,
  },
  getSchema: () => {
    return {
      type: "object",
      properties: {
        "placeholder": {
          title: "输入提示",
          type: "string"
        },
        "tagInline": {
          title: "是否仅显示一行",
          type: "boolean"
        },
        "maxTagCount": {
          title: "最多显示个数",
          type: "number"
        },
        dataSource: buildDataSourceSchema()
      }
    }
  }
}


