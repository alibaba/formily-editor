import { IExtensionConfig } from '../types'
import { buildDataSourceSchema } from '../util' 

export const SelectExtension: IExtensionConfig = {
  type: 'string',
  'x-component': 'select',
  extensionKey: 'selectExtension',
  title: '下拉选择框(静态数据源)',
  defaultProps: {
    hasClear: true,
    useVirtual: false,
    filterLocal: false,
    showSearch: true,
  },
  getSchema: () => {
    return {
      type: "object",
      properties: {
        "placeholder": {
          title: "输入提示",
          type: "string"
        },
        dataSource: buildDataSourceSchema()
      }
    }
  }
}


