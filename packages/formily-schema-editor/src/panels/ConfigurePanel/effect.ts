import { LifeCycleTypes } from '@formily/react-schema-renderer'


const TYPE_PATH = 'tabs.propertyTabPane.basicConfigure.commconConfig.type'
const X_COMPONENT_PATH = 'tabs.propertyTabPane.basicConfigure.commconConfig.x-component'
const EXTENSION_PROPS_PATH = 'tabs.propertyTabPane.xComponentPropsCard.x-component-props.extensionProps'

export default ({ xComponents, xComponentPath = X_COMPONENT_PATH, typePath = TYPE_PATH }) => ($, { setFieldState, getFieldState }) => {
  
  $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, xComponentPath).subscribe(({ value }) => {
    if(!value)return
    const { type, extensionSchema = { type: 'objetc', properties: {}} } = xComponents.find(item => item.value === value)

    setFieldState(typePath, state => {
      state.value = type
    })

    setFieldState(EXTENSION_PROPS_PATH, state => {
      state.props['x-component-props'] = state.props['x-component-props'] || {}
      state.props['x-component-props'].fieldSchema = extensionSchema
    })
  })
}