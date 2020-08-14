import React, { useState } from 'react'
import RulesWidget from './index'
import RegInput from './components/RegInput/RegInput'
import '@alifd/next/dist/next.css'

export default { title: 'RulesWidget' };

export const Demo = () => {
  const [rules, setRules] = useState([])

  const onChange = rules => {
    // console.log(rules)

    setRules(rules)
  }

  return (
    <div>
      <RulesWidget value={rules} onChange={onChange} type='string' />
    </div>
  )
};

export const TestRegInput = () => {
  const [reg, setReg] = useState('/.*/')

  const onChange = reg => {
    // console.log(reg)

    setReg(reg)
  }

  return (
    <div>
      <RegInput value={reg} onChange={onChange} />
    </div>
  )
}
