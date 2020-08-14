import React, { useState, useRef, Fragment } from 'react'

import { Button, Dialog } from '@alifd/next'
import Editor from './editor'

import useToggle from '../../hooks/useToggle'

const JsonDialogInputer = (props) => {
    const [visible, toggleVisible] = useToggle(false)
    const [valid, setValid] = useState(true)
    const editorRef = useRef(null)

    const validateContent = (v) => {
      if(!v){
        setValid(true)
        return
      }
      try {
        const parsedRet = JSON.parse(v)
        if(typeof props.validator === 'function'){
          setValid(props.validator(parsedRet))
        }
      } catch (error) {
        setValid(false)
      }
    }

    const editorDidMount = editor => {
      editor.focus()
    }

    const renderFooter = () => {
      return (<Fragment>
        <Button
          type="primary" 
          style={{ marginRight: '8px' }}
          disabled={!valid}
          onClick={() => {
            let value = editorRef.current.getSession().getDocument().getValue()
            if(!value)value = props.emptyValue || ''
            props.onChange(value ? JSON.parse(value) : props)
            toggleVisible()
          }}>确定</Button>

        <Button
          type="primary" 
          style={{ marginRight: '8px' }}
          disabled={!valid}
          onClick={() => {
            let value = editorRef.current.getSession().getDocument().getValue()
            if(!value)return
            value = JSON.stringify(JSON.parse(value), null, '\t')
            editorRef.current.setValue(value || '');
          }}>格式化</Button>
          
        <Button onClick={toggleVisible}>取消</Button>
      </Fragment>)
    }

    return <div className="inputer-expression">
      <Button onClick={toggleVisible}>配置JSON</Button>
      <Dialog 
        title={'输入JSON'}
        visible={visible}
        footer={renderFooter()}
        onClose={toggleVisible}
      >
        <Editor
          ref = {editorRef}
          defaultValue={props.default}
          value={JSON.stringify(props.value || props.emptyValue, null, '\t')}
          width="500"
          height="400"
          editorDidMount={editorDidMount}
          onChange={validateContent}
        />
      </Dialog>
    </div>
  }  



export default JsonDialogInputer