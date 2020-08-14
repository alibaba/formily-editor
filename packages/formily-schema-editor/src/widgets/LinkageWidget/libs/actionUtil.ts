const stateOrSchemaProps = [
  'value',
  'visible',
  'editable',
  'enum',
]

const componentProps = [
  'disabled',
  'url',
]

export function transform(linkage, isMeet) {
  let changeKey

  if (!isMeet) {
    changeKey = 'otherwise'
  } else if (linkage.type === 'value:state') {
    changeKey = 'state'
  } else if (linkage.type === 'value:schema') {
    changeKey = 'schema'
  }

  let prop
  let value

  if (changeKey && linkage[changeKey]) {
    const change = linkage[changeKey]

    for (const _prop of stateOrSchemaProps) {
      if (_prop in change) {
        prop = _prop
        value = change[_prop]

        break
      }
    }

    if (!prop) {
      for (const _prop of componentProps) {
        if (change['x-component-props'] && _prop in change['x-component-props']) {
          prop = _prop
          value = change['x-component-props'][_prop]

          break
        }
      }
    }
  }

  return {
    isMeet,
    target: linkage.target,
    prop,
    value,
  }
}

export function restore(action, condition, id) {
  let changeKey
  let type

  if (
    action.prop === 'value' ||
    action.prop === 'visible' ||
    action.prop === 'editable'
  ) {
    changeKey = 'state'
    type = 'value:state'
  } else if (
    action.prop === 'disabled' ||
    action.prop === 'url' ||
    action.prop === 'enum'
  ) {
    changeKey = 'schema'
    type = 'value:schema'
  }

  if (!action.isMeet) {
    changeKey = 'otherwise'
  }

  const linkage = {
    id,
    name: '',
    type,
    condition,
    target: action.target,
    [type === 'value:state' ? 'state' : 'schema']: {},
    otherwise: {},
  }

  if (componentProps.includes(action.prop)) {
    linkage[changeKey]['x-component-props'] = {
      [action.prop]: action.value,
    }
  } else {
    linkage[changeKey][action.prop] = action.value
  }

  return linkage
}
