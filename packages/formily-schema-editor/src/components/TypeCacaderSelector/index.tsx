import React from 'react'
import { CascaderSelect } from '@alifd/next'
import './style.scss'

export default (props) => {
  return (<CascaderSelect popupClassName="node-type-popup" {...props} />)
}