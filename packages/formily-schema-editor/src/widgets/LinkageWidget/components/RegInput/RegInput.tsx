import React from 'react'
import { Input, Select } from '@alifd/next'
import * as regUtil from '../../libs/regUtil'
import './style.scss'

const flagsEnum = [
  'g',
  'i',
  'm',
  's',
  'u',
  'y',
]

const RegInput = ({
  value,
  onChange,
}) => {
  const [content, flags] = regUtil.transform(value)

  const onContentChange = _content => {
    const newReg = regUtil.restore(_content, flags)

    onChange(newReg)
  }

  const onFlagsChange = _flags => {
    const newReg = regUtil.restore(content, _flags || [])

    onChange(newReg)
  }

  return (
    <div className="reg-input">
      <Input
        className="content"
        value={content}
        onChange={onContentChange}
        addonTextBefore="/"
        addonTextAfter="/"
        placeholder="内容"
      />
      <Select
        className="flags"
        mode="multiple"
        dataSource={flagsEnum}
        value={flags}
        onChange={onFlagsChange}
        placeholder="标识"
        hasClear
      />
    </div>
  )
}

export default RegInput
