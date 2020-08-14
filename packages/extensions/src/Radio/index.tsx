import { IExtensionConfig } from '../types'
import { buildDataSourceSchema } from '../util'

export const RadioExtension:IExtensionConfig = {
  type: 'string',
  'x-component': 'Radio',
  title: '单选框',
  getSchema: () => {
    return {
      type: "object",
      properties: {
        dataSource: buildDataSourceSchema()
      }
    }
  }
} 

