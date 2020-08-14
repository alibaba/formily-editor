import React from 'react'
import SimpleArrayTable from './index'
// import { Schema } from '../schema'
import { SchemaForm, registerFormField } from '@formily/next'

export default { title: 'SimpleArrayTable' }

registerFormField('simpleArrayTable', (props) => {
  // console.log(props)
  return <SimpleArrayTable {...props} />
})

const schema = {
  type: "object",
  properties: {
    dataSource: {
      type: "array",
      "x-component": "simpleArrayTable", 
      "x-component-props": {
        canRemoveAll: true,
      },
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            required: true,
            "x-component-props": {
              placeholder: "label"
            }
          },
          value: {
            type: "string",
            required: true,
            "x-component-props": {
              placeholder: "value"
            }
          }
        }
      }
    }
  }
}

export const Demo = () => {
  return <div><SchemaForm schema={schema} /></div>
}
