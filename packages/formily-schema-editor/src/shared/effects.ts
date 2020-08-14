

// import { LifeCycleTypes } from '@formily/next'

// // 根据节点类型联动控件类型
// export const typeEffect = (typePath = 'type', xComponentPath = 'x-component') => ($, { setFieldState }) => {

//   $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, typePath).subscribe(({ value, props }) => {
//     props['x-component-props']  = props['x-component-props'] || {}
//     const { disabled: typeDisabled } = props['x-component-props']

//     setFieldState(xComponentPath, state => state.visible = value !== 'object')

//     setFieldState(xComponentPath, state => {
//       if(!typeDisabled)state.value = ''
//       state.props['x-component-props'] = state.props['x-component-props'] || {}

//       if(value === 'object'){}
//       state.props['x-component-props'].dataSource = 
//       (state.props['x-component-props'].xComponents || []).filter(item => item.type === value)
//     })
//   })
// }


import { LifeCycleTypes } from '@formily/react-schema-renderer'


const TYPE_PATH = 'tabs.propertyTabPane.basicConfigure.commconConfig.type'
const X_XOMPONENT_PATH = 'tabs.propertyTabPane.basicConfigure.commconConfig.x-component'

export default ({ xComponents, xComponentPath = X_XOMPONENT_PATH, typePath = TYPE_PATH }) => ($, { setFieldState }) => {
  $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, xComponentPath).subscribe(({ value }) => {
    const { type } = xComponents.find(item => item.value === value)

    setFieldState(typePath, state => {
      state.value = type
    })
  })

  $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, typePath).subscribe((state) => {
    state.props['x-component-props'] = state.props['x-component-props'] || {}

    const { dataSource = [] } = state.props['x-component-props']

    state.props['x-component-props'].dataSource = dataSource.map(d => ({
      ...d,
      disabeld: d.type !== state.value
    }))
  })
}