import React, { useState, useRef } from 'react'
import { Button } from '@alifd/next'
import { useEditor } from '../../hooks/useEditor'
import Rule from './components/Rule/Rule'
import Condition from './components/Condition/Condition'
import { LinkageContext } from './context'
import * as linkagesUtil from './libs/linkagesUtil'
import * as listUtil from './libs/listUtil'
import getRuleId from './libs/getRuleId'
import EventEmitter from './libs/EventEmitter'
import rulesEqual from './libs/rulesEqual'
import { LinkageWidgetProps } from '../../types'
import './style.scss'

const LinkageWidget = React.memo(({
  locale = {},
  value,
  onChange,
}: LinkageWidgetProps) => {
  const { schema, selectedPath } = useEditor()
  const boxRef = useRef(null)
  const [currentValue, setCurrentValue] = useState(value)

  const rules = linkagesUtil.transform(currentValue || [])

  if (!rulesEqual(currentValue, value)) {
    setCurrentValue(value)
  }

  const onAddClick = () => {
    rules.push({
      id: getRuleId(),
      conditions: [
        Condition.getDefaultCondition(field, true),
      ],
      meetActions: [
        { isMeet: true, target: '', prop: 'value', value: '' },
      ],
      missActions: [
        { isMeet: false, target: '', prop: 'value', value: '' },
      ],
    })

    changed()

    setTimeout(() => {
      const node = boxRef.current
      if (node) node.scrollTop = node.scrollHeight
    }, 0)
  }

  const schemNode = schema.get(selectedPath.entire)
  if (!schemNode) return null
  let field = schemNode.toJSON()

  const changed = () => {
    const linkages = linkagesUtil.restore(rules)

    setCurrentValue(linkages)

    onChange(linkages)
  }

  const ee = new EventEmitter()

  const onFoldAllClick = () => {
    ee.emit('foldAll')
  }

  const onRuleDelete = rule => {
    listUtil.deleteItem(rules, rule)

    changed()
  }

  return (
    <LinkageContext.Provider value={{
      locale,
      changed,
      ee,
      schema,
      field,
    }}>
      <div ref={boxRef} className="linkage-widget-box">
        {/* <Message closeable={false} type="notice">
          调整字段顺序后需手动修改目标字段的路径
        </Message> */}
        <div className="linkage-widget">
          {
            false && rules.length > 1 ?
            <div className="toolbar">
              <Button size="small" onClick={onFoldAllClick}>全部收起</Button>
            </div> :
            null
          }
          <div className="rule-list">
            {
              rules.map((rule, index) => (
                <Rule
                  key={rule.id}
                  title={`规则 ${index + 1}`}
                  value={rule}
                  onDelete={onRuleDelete}
                />
              ))
            }
          </div>
          <div className="add-new" onClick={onAddClick}>
            <Button size="large" text type="primary">添加规则</Button>
          </div>
        </div>
      </div>
    </LinkageContext.Provider>
  )
})

export default LinkageWidget
