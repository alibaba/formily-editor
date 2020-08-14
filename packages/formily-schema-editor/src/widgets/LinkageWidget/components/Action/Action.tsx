import React, { useContext } from 'react'
import { LinkageContext, RuleContext } from '../../context'
import {
  Input,
  Select,
} from '@alifd/next'
import SquareBtn from '../../../../components/SquareBtn'
import ArrayTableInput from '../ArrayTableInput/ArrayTableInput'
import './style.scss'

const booleanEnum = [
  { label: '是', value: true },
  { label: '否', value: false },
]

const propEnum = [
  { label: '值', value: 'value' },
  { label: '显示', value: 'visible' },
  { label: '禁用', value: 'disabled' },
  { label: '可编辑', value: 'editable' },
  { label: '数据源', value: 'enum' },
  { label: '接口地址', value: 'url' },
]

const propInfo = {
  value: {
    type: 'string',
    default: '',
  },
  visible: {
    type: 'boolean',
    default: true,
  },
  disabled: {
    type: 'boolean',
    default: true,
  },
  editable: {
    type: 'boolean',
    default: true,
  },
  enum: {
    type: 'array',
    default: [],
  },
  url: {
    type: 'string',
    default: '',
  },
}

const Action = ({
  index,
  value,
  onAdd,
  onDelete,
}) => {
  const { changed } = useContext(LinkageContext)
  const { rule } = useContext(RuleContext)

  let peer = null

  if (
    value.isMeet &&
    rule.missActions[index] &&
    rule.missActions[index].target === value.target
  ) {
    peer = rule.missActions[index]
  }

  const onTargetChange = target => {
    if (peer) {
      peer.target = target
    }

    value.target = target

    changed()
  }

  const onPropChange = prop => {
    const newPropType = propInfo[prop].type

    if (propInfo[value.prop].type !== newPropType) {
      value.value = propInfo[prop].default
    }

    if (peer) {
      if (propInfo[peer.prop].type !== newPropType) {
        peer.value = propInfo[prop].default
      }

      if (newPropType === 'boolean') {
        peer.value = !value.value
      }

      peer.prop = prop
    }

    value.prop = prop

    changed()
  }

  const onValueChange = _value => {
    if (peer) {
      if (
        typeof _value === 'boolean' &&
        peer.prop === value.prop
      ) {
        peer.value = !_value
      }
    }

    value.value = _value

    changed()
  }

  const onAddClick = () => {
    onAdd({
      isMeet: value.isMeet,
      target: '',
      prop: 'value',
      value: '',
    }, value)
  }

  const onDeleteClick = () => {
    onDelete(value)
  }

  return (
    <div className="linkage-action">
      <div className="let">将 </div>
      <div className="target">
        <Input.TextArea value={value.target} onChange={onTargetChange} />
      </div>
      <div className="prop">
        <Select
          dataSource={propEnum}
          value={value.prop}
          onChange={onPropChange}
        />
      </div>
      <span className="set-to">设置为</span>
      <div className={`value ${propInfo[value.prop].type}`}>
        {(() => {
          switch (propInfo[value.prop].type) {
            case 'boolean':
              return <Select
                dataSource={booleanEnum}
                value={value.value}
                onChange={onValueChange}
              />
            case 'string':
              return <Input
                className="value-input"
                value={value.value}
                onChange={onValueChange}
              />
            case 'array':
              return <ArrayTableInput
                value={value.value}
                onChange={onValueChange}
              />
          }
        })()}
      </div>
      <div className="buttons">
        <SquareBtn onClick={onAddClick}>+</SquareBtn>
        <SquareBtn onClick={onDeleteClick}>-</SquareBtn>
      </div>
    </div>
  )
}

export default Action
