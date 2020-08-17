import React, { Fragment, useRef, useState } from 'react'
import { SchemaEditor } from './index'
import { props } from './mock'
import { Dialog, Tab, Button, Message } from '@alifd/next'
import { isEmpty, isStr } from '@formily/shared'
import MonacoEditor from 'react-monaco-editor'

import useToggle from './hooks/useToggle'
import useClipboard from './hooks/useClipboard'

export default { 
  title: 'Main',
}

interface IMode {
  value: string
  label: string
}

export const Demo = () => {
  const [visible, toggleVisible] = useToggle(false)
  const [exportDialogVisible, toggleExportDialogVisible] = useToggle(false)
  const { ref, copy } = useClipboard()

  const [schema, setSchema] = useState(props.schema)
  const [activeKey, setActiveKey] = useState('JSONSCHEMA')
  const [valid, setValid] = useState(true)
  const JsonSchemaMonaco = useRef(null)
  const JsonMonaco = useRef(null)

  const renderToolbar = context => {
    const { mode, MODES, setMode, getSchema } = context
    return (
      <Fragment>
        <Button.Group>
          {Object.values(MODES).map((item: IMode) => (
            <Button
              key={item.value}
              className="height-32"
              type={item.value === mode ? 'primary' : 'normal'}
              onClick={() => setMode(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </Button.Group>
        <Button onClick={toggleVisible}>导入数据</Button>
        <Button onClick={toggleExportDialogVisible}>导出数据</Button>
        <Button
          onClick={() => {
            console.log(getSchema())
            alert(JSON.stringify(getSchema()))
          }}
        >
          保存并关闭
        </Button>
      </Fragment>
    )
  }

  const validateContent = (currentTab = activeKey) => {
    const currentMonaco =
      currentTab === 'JSONSCHEMA'
        ? JsonSchemaMonaco.current
        : JsonMonaco.current
    if (!currentMonaco) return
    const decorations = currentMonaco.editor.getModel().getAllDecorations()
    const error = decorations.filter(decoration => {
      const cls = decoration.options.className
      return !isEmpty(cls) && isStr(cls) && cls.includes('error')
    })
    setValid(error.length <= 0)
  }

  const editorDidMount = editor => {
    editor.focus()
    editor.onDidChangeModelDecorations(function(e) {
      validateContent()
    })
  }

  const renderFooter = () => {
    return (
      <Fragment>
        <Button
          type="primary"
          style={{ marginRight: '8px' }}
          disabled={!valid}
          onClick={() => {
            const value = JsonSchemaMonaco.current.editor.getModel().getValue()
            setSchema(JSON.parse(value))
            toggleVisible()
          }}
        >
          确定
        </Button>
        <Button onClick={toggleVisible}>取消</Button>
      </Fragment>
    )
  }

  const renderExportDialogFooter = () => {
    return (
      <Fragment>
        <Button
          type="primary"
          style={{ marginRight: '8px' }}
          disabled={!valid}
          onClick={() => {
            copy(ref.current.editor.getModel().getValue()).then(() => {
              Message.success('已复制到剪切板')
            })
            toggleExportDialogVisible()
          }}
        >
          确定
        </Button>
        <Button onClick={toggleExportDialogVisible}>取消</Button>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <SchemaEditor {...props} renderToolbar={renderToolbar} schema={schema} />
      <Dialog visible={visible} footer={renderFooter()} onClose={toggleVisible}>
        <Tab
          activeKey={activeKey}
          onChange={key => {
            setActiveKey(key.toString())
            validateContent(key.toString())
          }}
        >
          <Tab.Item title="导入JSON SCHEMA" key="JSONSCHEMA">
            <MonacoEditor
              ref={JsonSchemaMonaco}
              width="500"
              height="400"
              language="json"
              editorDidMount={editorDidMount}
            />
          </Tab.Item>
          <Tab.Item title="导入JSON" key="JSON" disabled>
            <MonacoEditor
              ref={JsonMonaco}
              width="500"
              height="400"
              language="json"
              editorDidMount={editorDidMount}
            />
          </Tab.Item>
        </Tab>
      </Dialog>

      <Dialog
        title={'导出数据'}
        visible={exportDialogVisible}
        footer={renderExportDialogFooter()}
        onClose={toggleExportDialogVisible}
      >
        <MonacoEditor
          ref={ref}
          width="500"
          height="400"
          language="json"
          value={JSON.stringify(schema, null, '\t')}
          options={{
            readOnly: true
          }}
        />
      </Dialog>
    </Fragment>
  )
}
