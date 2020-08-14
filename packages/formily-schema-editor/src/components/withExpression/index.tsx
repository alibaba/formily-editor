import React, { useState, useRef } from 'react'

import { Input, Button, Balloon } from '@alifd/next'
import './style.scss'

const WithExpression = (Component: React.JSXElementConstructor<any>) => {
  return (props) => {
    const initialMode = /^{{.*}}$/.test(props.value) ? 'expression' : 'normal';
    const [mode, setMode] = useState(initialMode)

    let _value = props.value

    if (mode === 'expression') {
      _value = Array.isArray(props.value) ? props.value[0] : _value;
      if(_value && /^{{.*}}$/.test(_value)){
        _value = _value.replace(/^{{/, '').replace(/}}$/, '')
      } else {
        _value = undefined
      }
    } 

    const expressionValue = useRef(_value)
    const normalValue = useRef(_value)

    const onChange = v => {
      if(mode == 'expression'){
        expressionValue.current = `{{${v}}}`
        props.onChange(`{{${v}}}`)
      } else {
        normalValue.current = v
        props.onChange(v)
      }

    }

    const expressionBtn = <Button 
      className="inputer-expression-button"
      text
      // type={mode === 'expression' ? "secondary" : "text"}
      style={{ marginLeft: '10px' }}
      onClick={() => {
        if(mode === 'expression'){
          setMode('normal')
          props.onChange(normalValue.current)
        } else {
          setMode('expression')
          props.onChange(expressionValue.current)
        }
      }}
    >
      <i className="iconfont icon-daima" />
    </Button>

    return <div className="inputer-expression">
      {mode === 'normal' && React.createElement(Component, { ...props, value: _value, onChange  })}
      {mode === 'expression' && <Input 
        placeholder="请输入表达式"
        addonTextBefore="{{" 
        addonTextAfter="}}"
        {...props} 
        onChange={onChange}
        value={_value}
      />}
      <Balloon trigger={expressionBtn} closable={false} triggerType="hover">
        点击输入表达式
      </Balloon>
    </div>
  }  
}


export default WithExpression