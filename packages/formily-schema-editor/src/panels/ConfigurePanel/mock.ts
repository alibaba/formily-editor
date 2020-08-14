import { Schema } from '../../shared/schema'
import { getCommonConfigSchema } from './getConfigurePanleProps'

const type = 'string'

export const props = {
  type: type,
  commonConfigSchema: getCommonConfigSchema(type),
  // commonConfigSchema: new Schema(getCommonConfigSchema(type)),
  extensionSchema: new Schema({}),
  locale: {
    title: '标题',
  },
  types: [{ label: 'string', value: 'string' }],
  xComponents: [{ label: '输入框', value: 'input' }]
}