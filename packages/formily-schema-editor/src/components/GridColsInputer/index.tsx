import React from 'react'
import { Radio } from '@alifd/next'

export default ({ value = 3, ...props }) => {
  // console.log(value, props)
  const _value = Array.isArray(value) ? value.length : value;
  // console.log(_value,)


  const onChange = (v) => {
    let cols = [];
    v = +v;
    for(let i=0; i<v; i++) {
      cols.push(24/v)
    }

    props.onChange(cols)
  }

  return <Radio.Group {...props} value={_value} onChange={onChange} />
}