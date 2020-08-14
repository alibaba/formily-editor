import { IExtensionConfig } from '../types'
import { buildDataSourceSchema } from '../util'

export const TransferExtension:IExtensionConfig = {
  type: 'array',
  'x-component': 'Transfer',
  title: '穿梭框',
  defaultProps: {
    notFoundContent: "暂无数据"
  },
  getSchema: (schema) => {
    const dataSourceSchema = buildDataSourceSchema()
    schema.properties.dataSource = dataSourceSchema

    return schema
  }
}


