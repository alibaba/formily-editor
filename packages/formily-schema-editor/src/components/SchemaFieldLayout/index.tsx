import React from 'react'
import { SchemaField } from '@formily/next'

const SchemaFieldLayout = ({ schema, path }) => {
  const props = schema['x-component-props'] || {}
  return <SchemaField path={path} schema={props.fieldSchema} />
}

export default SchemaFieldLayout