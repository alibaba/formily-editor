import React from 'react'
import './style.scss'
import { SchemaForm, SchemaMarkupField as Field } from '@formily/next'
import {
  Input,
  ArrayTable,
} from '@formily/next-components'

const ArrayTableInput = ({
  value = [],
  onChange,
}) => {
  const onFormChange = newValue => {
    // console.log('---', newValue)

    if (!newValue.array) return

    onChange(newValue.array)
  }

  return (
    <div className="array-table-input">
      <SchemaForm
        value={{ array: value }}
        onChange={onFormChange}
        components={{
          Input,
          ArrayTable
        }}
      >
        <Field
          type="array"
          title=""
          name="array"
          x-component="simpleArrayTable"
          x-component-props={{
            operationsWidth: 120,
            // renderMoveDown: () => null,
            // renderMoveUp: () => null,
            // dragable: true,
            canRemoveAll: true,
          }}
        >
          <Field type="object">
            <Field
              type="string"
              title="标签"
              name="label"
              x-component="Input"
              required
              // default=""
            />
            <Field
              type="string"
              title="值"
              name="value"
              x-component="Input"
              required
              // default=""
            />
          </Field>
        </Field>
      </SchemaForm>
    </div>
  )
}

export default ArrayTableInput
