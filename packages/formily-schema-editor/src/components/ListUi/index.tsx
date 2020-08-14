import React, { useState } from 'react'
import { Button, Input } from '@alifd/next'
import { Form, FormItem, createFormActions } from '@formily/next'
import SquareBtn from '../SquareBtn';
// import { isArr, FormPath } from '@formily/shared'
import { Dialog } from '@alifd/next'

// SchemaField, FormItemDeepProvider, 

import './style.scss'

const actions = createFormActions()

const ListUI = ({ value = [], path, onChange }) => {
  const [visible, setVisible] = useState(false)
  const [dataSource, setDataSource] = useState(value)

  const onClose = () => {
    setVisible(!visible)
  }

  const onAdd = index => {
    // const state = actions.getFormState()
    // console.log(state)
    // if(index >= 0){
    //   setDataSource(dataSource.concat([]).splice(index, 0, {}))
    // } else {
    //   setDataSource(dataSource.concat([{}]))
    // }
    setDataSource(dataSource.concat([{}]))
  }

  const onRemove = index => {
    let data = [...dataSource];
    data.splice(index, 1)
    setDataSource(data)

    actions.setFormState(state => state.value = data)
    // onChange(data)
  }

  console.log('@@dataSource', dataSource)

  return (<div className="simple-array-table">
      <Button onClick={() => setVisible(true)}>配置</Button>
      <Dialog 
        className={`dataSource-dailog ${visible ? 'show' : 'hide'}`}
        visible={true}
        title={"配置数据"} // props.dialogTitle || schema.title || 
        onClose={() => {
          // form.validate().then(({ errors }) => {
          //   if(errors.some(err => err.path.includes(path)))return

          onClose()
          // })
          
        }}
        hasMask={visible}
        shouldUpdatePosition
        onOk={() => onChange([])}
      >
        <Form actions={actions}>
          <div className={`rows ${ true ? 'max-height-270' : 'max-height-300'}`}>
            {dataSource.map((item, index) => {
              return (
              <div className="row" key={index}>
                <div id={`row-${index}`} className="row-index">{index+1}</div>
                <div className="row-item">
                  <FormItem onChange={v => {console.log(v)}} value={dataSource[index].label} name={`${path}.${index}.label`} component={Input} required placeholder="文案" />
                </div>
                <div className="row-item">
                  <FormItem name={`${path}.${index}.value`} component={Input} required placeholder="值" />
                </div>
                <div className="row-item operator">
                  <SquareBtn onClick={() => onAdd(index)}>+</SquareBtn>
                  <SquareBtn onClick={() => onRemove(index)}>-</SquareBtn>
                </div>
              </div>)
            })}
          </div>
        </Form>
        
        <div className="add-new" onClick={() => onAdd(value.length-1)}>
          <Button className="add-btn" size="large" text type="primary">添加</Button>
        </div>
      </Dialog>
      
  </div>)
}

export default ListUI