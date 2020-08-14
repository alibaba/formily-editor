import { IExtensionConfig } from '../types'

import { buildDataSourceSchema } from '../util'

export const CheckboxExtension:IExtensionConfig = {
  type: 'array',
  'x-component': 'Checkbox',
  title: '复选框',
  getSchema: () => {
    return {
      type:"object",
      properties: {
        dataSource: buildDataSourceSchema()
      }
    }
  }
}

