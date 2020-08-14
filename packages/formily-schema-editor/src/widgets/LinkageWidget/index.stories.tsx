import React, { useState } from 'react'
import LinkageWidget from './index'
import { Button } from '@alifd/next'
import {
  Form,
  FormItem,
  SchemaForm,
} from '@formily/next'
import { Input } from '@formily/next-components'
import ArrayTableInput from './components/ArrayTableInput/ArrayTableInput'
import '@alifd/next/dist/next.css'

export default { title: 'LinkageWidget' }

export const Demo = () => {
  const [linkages, setLinkages] = useState([])

  const onChange = linkages => {

    setLinkages(linkages)
  }

  return (
    <LinkageWidget
      value={linkages}
      onChange={onChange}
    />
  )
}

export const TestForm = () => {
  const [value, setValue] = useState({
    xxx: '123',
    _: '',
  })

  // const onChange = _value => {
  //   // console.log(_value)

  //   setValue(_value)
  // }

  const onClick = () => {
    setValue({
      xxx: '321',
      _: Math.random() + '',
    })
  }

  return (
    <div>
      <Form value={value}>
        <FormItem
          label=""
          name="xxx"
          component={Input}
          // value={'xxx'}
          // onChange={onChange}
        />
      </Form>
      <Button onClick={onClick}>测试</Button>
    </div>
  )
}

export const TestSchemaForm = () => {
  const schema = {
    type: 'object',
    properties: {
      field1: {
        type: 'string',
        title: 'field1',
        'x-component': 'input',
        'x-linkages': [
          {
            name: '',
            type: 'value:state',
            condition: '{{$self.value=="ok"}}',
            target: 'field2',
            state: {
              value: 'xxx',
            },
            otherwise: {},
          },
          {
            name: '',
            type: 'value:state',
            condition: '{{$self.value=="ok"}}',
            target: 'field2',
            state: {},
            otherwise: {
              value: 'yyy',
            },
          },
        ],
      },
      field2: {
        type: 'string',
        title: 'field2',
        'x-component': 'input',
      },
    },
  }

  return (
    <div>
      <SchemaForm components={{ Input }} schema={schema} />
    </div>
  )
}

export const TestArrayTableInput = () => {
  const [value, setValue] = useState([])

  const onChange = _value => {
    // console.log(_value)

    setValue([])
  }

  return (
    <div>
      <ArrayTableInput value={value} onChange={onChange} />
    </div>
  )
}
