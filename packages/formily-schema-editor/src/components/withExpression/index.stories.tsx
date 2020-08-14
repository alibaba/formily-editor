import React from 'react'
import { ISchema } from '@formily/react-schema-renderer/lib/types'
import { SchemaForm, LifeCycleTypes } from '@formily/next'

import setupExpression from './setupExpression'
import '@alifd/next/dist/next.css'

export default { title: 'withExpression' };

setupExpression()

const schema: ISchema = {
  type: "object",
  properties: {
    input: {
      type: "string",
      title: "input",
      "x-component": "inputWithExpression"
    },
    select: {
      type: "string",
      title: "select",
      "x-component": "selectWithExpression",
      enum: [{ label: 'x', value: 'x' }]
    },
    numberPicker: {
      type: "number",
      title: "numberPicker",
      "x-component": "numberPickerWithExpression",
    },
    radio: {
      type: "string",
      title: "radio",
      "x-component": "radioWithExpression",
      enum: [{ label: 'x', value: 'x' }, { label: 'y', value: 'y' }]
    },
    checkbox: {
      type: "array",
      title: "checkboxWithExpression",
      "x-component": "checkboxWithExpression",
      enum: [{ label: 'x', value: 'x' }, { label: 'y', value: 'y' }]
    },
    switch: {
      type: "boolean",
      title: "switch",
      "x-component": "switchWithExpression",
    },
    timePicker: {
      type: "string",
      title: "timePicker",
      "x-component": "timePickerWithExpression",
    },
    datePicker: {
      type: "string",
      title: "datePicker",
      "x-component": "datePickerWithExpression",
    },
    rating: {
      type: "number",
      title: "rating",
      "x-component": "ratingWithExpression",
    }
  }
}

export const Demo = () => {
  return <div>
    <SchemaForm 
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 12 }}
      schema={schema}
      effects={($) => {
        $(LifeCycleTypes.ON_FORM_VALUES_CHANGE).subscribe(state => {
          // console.log(state)
        })
      }}
    />
  </div>
}
