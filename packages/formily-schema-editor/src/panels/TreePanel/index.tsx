import React from "react";
import { ISchema } from "@formily/react-schema-renderer";
import { FormSpy, LifeCycleTypes } from '@formily/next'

import { useEditor } from '../../hooks/useEditor'
import { FormPath, FormPathPattern } from "../../shared";
import SchemaTreeWidget from '../../widgets/SchemaTreeWidget'
import './style.scss'

export const TreePanel = () => {
  const context = useEditor()

  const { 
    selectSchemaNode, 
    appendSchemaNode,
    appendAfterSchemaNode, 
    appendBeforeSchemaNode, 
    removeSchemaNode,
    moveAfterSchemaNode,
    moveBeforeSchemaNode,
    moveChildrenSchemaNode
  } = context 

  const onAppend = (path: FormPathPattern, schema: ISchema & { key: string }) => {
    appendSchemaNode(path, schema)
  }
  
  //新增节点，并插入到指定节点的后面
  const onAppendAfter = (target:FormPath, schema: ISchema & { key: string }) => {
    appendAfterSchemaNode(target, schema)
  }
  //新增节点，并插入到指定节点的前面
  const onAppendBefore = (target:FormPath, schema: ISchema & { key: string }) => {
    appendBeforeSchemaNode(target, schema)
  }

  //删除节点
  const onRemove = (target: FormPath) => {
    removeSchemaNode(target)
  }

  //移动节点
  const onMoveBefore = (source:FormPath,target:FormPath) => {
    moveBeforeSchemaNode(source, target)
  }
  
  //移动节点
  const onMoveAfter = (source:FormPath,target:FormPath) => {
    moveAfterSchemaNode(source, target)
  }

  // 
  const onMoveChildren = (
    source: FormPath,
    target: FormPath
  ) => {
    moveChildrenSchemaNode(source, target)
  }

  //选择节点
  const onSelect = (path: FormPath) => {
    selectSchemaNode(path)
  }

  return (<div style={{ padding: '16px'}}>
        <FormSpy selector={LifeCycleTypes.ON_FORM_VALUES_CHANGE}>
          {() => {
            return (
              <SchemaTreeWidget 
                {...context} 
                onSelect={onSelect}
                onAppend={onAppend}
                onAppendAfter={onAppendAfter}
                onAppendBefore={onAppendBefore}
                onRemove={onRemove}
                onMoveBefore={onMoveBefore}
                onMoveAfter={onMoveAfter}
                onMoveChildren={onMoveChildren}
              />)
          }}
    </FormSpy>
  </div>)
}