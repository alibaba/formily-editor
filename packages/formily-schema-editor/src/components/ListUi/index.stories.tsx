import React from 'react'
import ListUI from './index'
import { SchemaForm, registerFormField, connect } from '@formily/next'

export default { title: 'ListUI' }

registerFormField('ListUI', connect()(ListUI))

const schema = {
  type: "object",
  properties: {
    dataSource: {
      type: "array",
      "x-component": "ListUI", 
    }
  }
}

export const Demo = () => {
  return <div><SchemaForm onChange={v => {
    console.log(v)
  }} schema={schema} /></div>
}
