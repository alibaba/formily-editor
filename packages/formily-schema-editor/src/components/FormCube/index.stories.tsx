import React from 'react'

import { SchemaForm, Field } from '@formily/next'
import Printer from '@formily/printer'
import FormCube from './index'


export default { title: 'FormCube' }

export const Demo = () => {
  return (<Printer><SchemaForm>
    <FormCube hasBorder={false} title="hello">
      <Field type="string" name="aa" title="aa" />
    </FormCube>
  </SchemaForm></Printer>)
}