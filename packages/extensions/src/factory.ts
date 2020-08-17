import {
  IExtensionConfig,
  SchemaEditorExtension,
  ISchemaEditorExtension
} from './types'
import config from './config'

export default (extensionConfig: IExtensionConfig): SchemaEditorExtension => {
  const {
    type,
    title,
    defaultProps = {},
    getSchema = schema => schema,
    ...others
  } = extensionConfig

  return (): ISchemaEditorExtension => {
    const xComponent = extensionConfig['x-component']
    const initialSchema = config[xComponent]
      ? config[xComponent].schema
      : { type: 'object', properties: {} }
    return {
      type,
      title,
      'x-component': xComponent,
      ...others,
      configs: {
        defaultProps,
        schema: getSchema(initialSchema)
      }
    }
  }
}
