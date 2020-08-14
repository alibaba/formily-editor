import React, { useState, useContext } from 'react'
import { LinkageContext, RuleContext } from '../../context'
import {
  Button,
  Icon,
} from '@alifd/next'
import Conditions from '../Conditions/Conditions'
import Actions from '../Actions/Actions'
import classnames from 'classnames'
import './style.scss'

const Rule = ({
  title = '',
  value,
  onDelete,
}) => {
  const ctx = useContext(LinkageContext)
  const [fold, setFold] = useState(false)

  ctx.ee.on('foldAll', () => {
    setFold(true)
  })

  const onDeleteClick = () => {
    onDelete(value)
  }

  const onFoldClick = () => {
    setFold(fold => !fold)
  }

  return (
    <RuleContext.Provider value={{ rule: value }}>
      <div className="linkage-rule">
        <div className="panel-head">
          <span className="title">{title}</span>
          <div className="operations">
            <Button className="btn-delete" text onClick={onDeleteClick}>
              <Icon type="ashbin" />删除规则
            </Button>
            <Button text onClick={onFoldClick}>
              <Icon className={classnames('fold-icon', { fold })} type="arrow-up" />
              <span>{fold ? '展开' : '收起'}</span>
            </Button>
          </div>
        </div>
        <div className={classnames('panel-body', { fold })}>
          <Conditions value={value.conditions} />
          <div className="devider" />
          <Actions
            isMeet={true}
            title="满足以上条件时，执行以下动作："
            value={value.meetActions}
          />
          <div className="devider" />
          <Actions
            isMeet={false}
            title="不满足以上条件时，执行以下动作："
            value={value.missActions}
          />
        </div>
      </div>
    </RuleContext.Provider>
  )
}

export default Rule
