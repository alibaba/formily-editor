import React, { useRef, useEffect } from 'react';
import MoveTo from 'moveto';
import {
  SchemaForm, 
  SchemaMarkupField as Field,
  FormButtonGroup,
  createAsyncFormActions
} from '@formily/next';
import { Input, Select, Button } from '@alifd/next';
import { IFormProps } from '../../types';

const env = {
  nonameId: 0
}

const transFormTypeDataSource = (types = []) => {

  return types.map(type => {
    const { children = [], ...others } = type;

    return {
      ...others,
      children: children.map(item => ({...item, value: `${item.type}/${item.value}`}))
    }
  })
}

const Form: React.FC<IFormProps> = (props) => {
  const ref = useRef(null)
  const actionRef = useRef(createAsyncFormActions())

  useEffect(() => {
    const top = ref.current.getBoundingClientRect().top
    if (window.innerHeight < top) {
      new MoveTo({
        container: document.querySelector('.main-left') || window
      }).move(top - 100)
    }
  }, [])

  const handleCancel = () => {
    props.onCancel();
  }

  const handleUpdate = () => {
    actionRef.current.validate().then(async() => {
      const form = await Promise.resolve(actionRef.current.getFormState(form => {
        return form.values
      }))
      if(form['x-component'] === 'object'){
        delete form['x-component']
      } 
      else {
        form['x-component'] = form['x-component'].split('/')[1]
      }
      props.onUpdate(form)
    })
  }


  return (
    <div ref={ref} className="rst__formWrapper__content">
      <SchemaForm
        labelAlign="left"
        labelTextAlign="left"
        labelCol={6}
        wrapperCol={18}
        components={{
          Input,
          Select
        }}
        validateFirst
        size="small"
        actions={actionRef.current}
        effects={($, { setFieldState }) => {
          $('onFieldValueChange', 'x-component').subscribe(({ value }) => {
            if(!value)return

            const [type, component] = value.split('/')

            setFieldState('type', state => {
              state.value =type
            })

            setFieldState('title', state => {
              state.visible = type.toLowerCase() !== 'layout'
            })

            if(type.toLowerCase() === 'layout'){
              setFieldState('key', state => {
                if(!state.value)state.value = `${component}_${env.nonameId++}`
              })
            }
          })

          $('onFieldChange', 'key').subscribe(({ value }) => {
            const ancestorChildren = (props.parent.parentNode || {}).children || []
            if (ancestorChildren.filter(child => child.data.key == value).length > 0) {
              setFieldState('key', state => {
                state.errors = [`该层级存在同名节点${value}，添加失败!`]
              })
            } else {
              setFieldState('key', state => {
                state.errors = []
              })
            }
          })
        }}
      >
        <Field
          title="类型:"
          name="x-component"
          enum={[]}
          x-component="TypeCascaderSelector"
          required
          x-component-props={{
            dataSource: transFormTypeDataSource(props.types),
          }}
        />
        <Field
          title="标识:"
          name="key"
          x-component="Input"
          x-props={{
            placeholder: '同层级节点的唯一标识别',
          }}
          required
          x-rules={[{
            pattern: /^[0-9a-zA-Z_]{1,}$/,
            message: '请输入由数字，字母或下划线组成的标识'
          }]}
        />
        <Field
          title="标题:"
          name="title"
          x-component="Input"
          x-props={{
            placeholder: '配置项字段标签',
          }}
        />
        <Field
          title="类型:"
          name="type"
          type="string"
          display={false}
          editable={false}
        />
      <FormButtonGroup align="right">
        <Button onClick={handleCancel}>取消</Button>
        <Button onClick={handleUpdate} type="primary">确定</Button>
      </FormButtonGroup>
    </SchemaForm>
  </div>
  )
}

export default Form