import React, { useState } from 'react'
import './style.scss'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  createAsyncFormActions,
} from '@formily/next'
import { lowercase } from '@formily/shared'
import {
  Input,
  Radio,
  NumberPicker,
  ArrayTable,
  Select,
} from '@formily/next-components'
import RegInput from './components/RegInput/RegInput'
import * as rulesUtil from './libs/rulesUtil'
import * as regUtil from './libs/regUtil'

import { IRulesWidgetProps } from '../../types'

const RulesWidget : React.FC<IRulesWidgetProps> = props => {
  const {
    defaultValue = [],
    locale = {},
    type = 'string',
    onChange,
    formLayout,
    xComponent = '',
    ...others
  } = props

  const [currentValue, setCurrentValue] = useState(defaultValue)
  const controlled = 'value' in others
  const value = controlled ? others.value : currentValue

  const ruleDesp = rulesUtil.transform(value || [], type)

  // console.log('@xComponent', lowercase(xComponent) === lowercase('input'))
  // console.log(ruleDesp)

  const onFormChange = ruleDesp => {
    const rules = rulesUtil.restore(ruleDesp, type)

    if (!controlled) {
      setCurrentValue(rules)
    }
    
    onChange(rules)
  }

  const actions = createAsyncFormActions()

  // const test = () => {
  //   actions.getFieldState('maximum', state => {
  //     console.log(state)
  //   }).then(state => {
  //     console.log(state)
  //   })
  // }
  return (
    <div className="rules-widget">
      {/* <button onClick={test}>测试</button> */}

      <SchemaForm
        actions={actions}
        value={ruleDesp}
        onChange={onFormChange}
        {...formLayout}
        components={{
          Input,
          Radio,
          NumberPicker,
          RadioGroup: Radio.Group,
          ArrayTable,
          Select,
          RegInput,
        }}
      >
        <Field
          type="boolean"
          title="是否必填"
          name="required"
          x-component="RadioGroup"
          enum={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
        />
        {
          lowercase(xComponent) === lowercase('input') ?
          <Field
            type="string"
            title="格式"
            name="format"
            x-component="Select"
            x-component-props={{
              style: {
                minWidth: '150px',
              },
            }}
            enum={[
              { label: '无', value: '' },
              { label: 'URL', value: 'url' },
              { label: 'Email', value: 'email' },
              { label: 'Ipv6', value: 'ipv6' },
              { label: 'Ipv4', value: 'ipv4' },
              { label: 'IdCard', value: 'idcard' },
              { label: 'TaoDomain', value: 'taodomain' },
              { label: 'QQ', value: 'qq' },
              { label: 'Phone', value: 'phone' },
              { label: 'Money', value: 'money' },
              { label: 'Zh', value: 'zh' },
              { label: 'Date', value: 'date' },
              { label: 'Zip', value: 'zip' },
            ]}
          /> : null
        }
        {
          type === 'number' ?
          <Field
            type="number"
            title="最大值"
            name="maximum"
            x-component="NumberPicker"
            // x-rules={{
            //   async validator(maximum) {
            //     const minimum = await actions.getFieldValue('minimum')

            //     if (typeof minimum === 'number' && maximum < minimum) {
            //       return '最大值不能小于最小值'
            //     }
            //   },
            // }}
          /> : null
        }
        {
          type === 'number' ?
          <Field
            type="number"
            title="最小值"
            name="minimum"
            x-component="NumberPicker"
            // x-rules={{
            //   async validator(minimum) {
            //     const maximum = await actions.getFieldValue('maximum')

            //     if (typeof maximum === 'number' && minimum > maximum) {
            //       return '最小值不能大于最大值'
            //     }
            //   },
            // }}
          /> : null
        }
        {
          type === 'array' ?
          <Field
            type="number"
            title="最大长度"
            name="max"
            x-component="NumberPicker"
            // x-rules={{
            //   async validator(max) {
            //     const min = await actions.getFieldValue('min')

            //     if (typeof min === 'number' && max < min) {
            //       return '最大长度不能小于最小长度'
            //     }
            //   },
            // }}
          /> : null
        }
        {
          type === 'array' ?
          <Field
            type="number"
            title="最小长度"
            name="min"
            x-component="NumberPicker"
            // x-rules={{
            //   async validator(min) {
            //     const max = await actions.getFieldValue('max')

            //     if (typeof max === 'number' && min > max) {
            //       return '最小长度不能大于最大长度'
            //     }
            //   },
            // }}
          /> : null
        }
        {
          lowercase(xComponent) === lowercase('input') ?
          <Field
            type="array"
            title="正则规则"
            name="patterns"
            x-component="simpleArrayTable"
            x-component-props={{
              // operationsWidth: 50,
              // renderMoveDown: () => null,
              // renderMoveUp: () => null,
              canRemoveAll: true,
            }}
          >
            <Field type="object">
              <Field
                type="string"
                title="正则"
                name="pattern"
                // required
                default=""
                x-component="RegInput"
                x-rules={{
                  validator(regStr) {
                    // console.log(regStr)

                    if (!regUtil.test(regStr)) {
                      return '正则表达式格式不正确'
                    }
                  }
                }}
              />
              <Field
                type="string"
                title="提示"
                name="message"
                default=""
                x-component="Input"
              />
            </Field>
          </Field> : null
        }
      </SchemaForm>
    </div>
  )
}

export default RulesWidget
