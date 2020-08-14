import React, { useContext } from 'react'
import { LinkageContext } from '../../context'
import {
  Input,
  Select,
  NumberPicker,
} from '@alifd/next'
import RegInput from '../../components/RegInput/RegInput'
import SquareBtn from '../../../../components/SquareBtn'
import './style.scss'

const logicEnum = [
  { label: '且', value: 'and' },
  { label: '或', value: 'or' },
]

const booleanEnum = [
  { label: '是', value: true },
  { label: '否', value: false },
]

const getTargetEnum = (type) => {
  return removeFalsy([
    (type !== 'array') && { label: '值', value: 'value' },
    (type === 'array') && { label: '长度', value: 'length' },
  ])
}

const getOperatorEnum = (type, target) => {
  return removeFalsy([
    (target !== 'length') && { label: '存在', value: 'exist' },
    (target !== 'length') && { label: '不存在', value: 'notExist' },
    (true) && { label: '等于', value: 'equal' },
    (true) && { label: '不等于', value: 'notEqual' },
    (type === 'number' || target === 'length') && { label: '大于', value: 'largeThan' },
    (type === 'number' || target === 'length') && { label: '大于等于', value: 'largeThanEqual' },
    (type === 'number' || target === 'length') && { label: '小于', value: 'lessThan' },
    (type === 'number' || target === 'length') && { label: '小于等于', value: 'lessThanEqual' },
    (type === 'string') && { label: '包含', value: 'includes' },
    (type === 'string') && { label: '以...开头', value: 'startsWith' },
    (type === 'string') && { label: '以...结尾', value: 'endsWith' },
    (type === 'string') && { label: '匹配', value: 'match' },
  ])
}

const removeFalsy = list => {
  return list.filter(item => item)
}

const find = (list, test) => {
  for (const item of list) {
    if (test(item)) {
      return item
    }
  }

  return null
}

const getFieldEnum = field => {
  return (
    field.enum ||
    field['x-component-props'] && field['x-component-props'].dataSource ||
    null
  )
}

const getValueType = (field, target, operator) => {
  if (operator === 'exist' || operator === 'notExist') {
    return 'none'
  }

  if (operator === 'match') {
    return 'reg'
  }

  if (target === 'length') {
    return 'number'
  }

  if (
    target === 'value' &&
    (operator === 'equal' || operator === 'notEqual') &&
    getFieldEnum(field)
  ) {
    return 'enum'
  }

  return field.type
}

const getDefaultValue = (field, valueType) => {
  switch (valueType) {
    case 'string':
      return ''
    case 'number':
      return 0
    case 'boolean':
      return true
    case 'reg':
      return '//'
    case 'enum':
      const _enum = getFieldEnum(field)
      return (_enum[0] && _enum[0].value) || undefined
    case 'none':
      return ''
  }
}

const Condition = ({
  value,
  onAdd,
  onDelete,
}) => {
  const { field, changed } = useContext(LinkageContext)

  const valueType = getValueType(field, value.target, value.operator)

  const onLogicChange = logic => {
    value.logic = logic

    changed()
  }

  const onTargetChange = target => {
    value.target = target

    const enums = getOperatorEnum(field.type, target)
    const found = find(enums, item => item.value === value.operator)

    if (!found) {
      value.operator = enums[0].value
    }

    const newValueType = getValueType(field, value.target, value.operator)

    if (newValueType !== valueType) {
      value.value = getDefaultValue(field, newValueType)
    }

    changed()
  }

  const onOperatorChange = _value => {
    value.operator = _value

    const newValueType = getValueType(field, value.target, value.operator)

    if (newValueType !== valueType) {
      value.value = getDefaultValue(field, newValueType)
    }

    changed()
  }

  const onValueChange = _value => {
    if (valueType === 'number' && _value === undefined) {
      value.value = 0
    } else {
      value.value = _value
    }

    changed()
  }

  const onAddAndClick = () => {
    onAdd(getDefaultCondition(field, false) , value)
  }

  const onDeleteClick = () => {
    onDelete(value)
  }

  return (
    <div className="linkage-condition">
      <div className="logic">
        {
          value.logic ?
            <Select
              className="xxx"
              dataSource={logicEnum}
              value={value.logic}
              onChange={onLogicChange}
            /> :
            '触发条件：'
        }
      </div>
      <div className="target">
        <Select
          dataSource={getTargetEnum(field.type)}
          value={value.target}
          onChange={onTargetChange}
        />
      </div>
      <div className="operator">
        <Select
          dataSource={getOperatorEnum(field.type, value.target)}
          value={value.operator}
          onChange={onOperatorChange}
        />
      </div>
      {
        valueType !== 'none' ?
        <div className={`value ${valueType}`}>
          {(() => {
            switch (valueType) {
            case 'enum':
              return <Select dataSource={getFieldEnum(field)} value={value.value} onChange={onValueChange} />
            case 'string':
              return <Input value={value.value} onChange={onValueChange} />
            case 'number':
              return <NumberPicker value={value.value} onChange={onValueChange} />
            case 'boolean':
              return <Select dataSource={booleanEnum} value={value.value} onChange={onValueChange} />
            case 'reg':
              return <RegInput value={value.value} onChange={onValueChange} />
            }
          })()}
        </div> :
        null
      }
      <div className="buttons">
        <SquareBtn onClick={onAddAndClick}>+</SquareBtn>
        {value.logic ? <SquareBtn onClick={onDeleteClick}>-</SquareBtn> : null}
      </div>
    </div>
  )
}

const getDefaultCondition = (field, isFirst) => {
  const logic = isFirst ? '' : 'and'
  const target = field.type === 'array' ? 'length' : 'value'
  const operator = 'equal'
  const valueType = getValueType(field, target, operator)
  const value = getDefaultValue(field, valueType)

  return {
    logic,
    target,
    operator,
    value,
  }
}

Condition.getDefaultCondition = getDefaultCondition

export default Condition
