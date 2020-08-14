import React, { useState, useRef } from 'react'
import { Button } from '@alifd/next'
import { SchemaField, FormItemDeepProvider } from '@formily/next'
import SquareBtn from '../SquareBtn';
import { isArr, FormPath } from '@formily/shared'
import { Dialog } from '@alifd/next'

import './style.scss'

const SimpleArrayTable = ({ schema, value = [{}], mutators, path, props, form,  ...others }) => {
  props['x-component-props'] = props['x-component-props'] || {}
  const { canRemoveAll = false } = props['x-component-props']
  console.log('@SimpleArrayTable', value)
  if(value.length == 0 && !canRemoveAll)value.push({})
  const [visible, setVisible] = useState(false)

  const initialValue = useRef(value)

  // const onAdd = (index) =>{
  //   mutators.insert(index+1, {})
  //   setTimeout(() => {
  //     const newRow = document.getElementById(`row-${value.length-1}`);
  //     if(newRow)newRow.scrollIntoView()
  //   }, 0);
  // } 

  const onRemove = (index) => {
    mutators.remove(index)
  }

  const onClose = () => {
    setVisible(!visible)
  }

  const renderColumns = (items, index) => {
    return items.mapProperties((props, key) => {
      const newPath = FormPath.parse(path).concat(index, key)

      return <FormItemDeepProvider labelCol={undefined} wrapperCol={undefined}>
              <SchemaField path={newPath} schema={props} />
      </FormItemDeepProvider>
    })
  }

  return (<div className="simple-array-table">
      <Button onClick={() => setVisible(true)}>配置</Button>
      {/* <Button onClick={() => setVisible(true)}>查看</Button> */}
        <Dialog 
          className={`dataSource-dailog ${visible ? 'show' : 'hide'}`}
          visible={true}
          title={props.dialogTitle || schema.title || "配置数据"}
          closeable={false}
          hasMask={visible}
          shouldUpdatePosition
          onOk={() => {
            form.validate().then(({ errors }) => {
              if(errors.some(err => err.path.includes(path)))return
              initialValue.current = form.value
              onClose()
            })
          }}
        >
          <div className={`rows`}>
            {value.map((item, index) => {
            let showRemove;

            if(value.length > 1)showRemove = true;
            if(value.length <= 1)showRemove = canRemoveAll
           
              return (
              <div className="row" key={index}>
                <div id={`row-${index}`} className="row-index">{index+1}</div>
                  {isArr(schema.items)
                    ? schema.items.reduce((buf, items) => {
                        return buf.concat(renderColumns(items, index))
                      }, [])
                    : renderColumns(schema.items, index)
                  }
                  <span>
                    {/* <SquareBtn onClick={() => onAdd(index)}>+</SquareBtn> */}
                    {showRemove && <SquareBtn onClick={() => onRemove(index)}>-</SquareBtn>}
                    {/* <SquareBtn onClick={onRemove}>↑</SquareBtn>
                    <SquareBtn onClick={onRemove}>↓</SquareBtn> */}
                  </span>
              </div>)
            })}
          </div>
          { canRemoveAll && <div className="add-new" onClick={() => {
            mutators.push({})
            // onAdd(value.length-1)
            }}>
            <Button className="add-btn" size="large" text type="primary">添加</Button>
          </div> }
        </Dialog>
      
  </div>)
}

export default SimpleArrayTable