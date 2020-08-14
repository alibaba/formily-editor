import React, { useContext } from 'react'
import { LinkageContext, RuleContext } from '../../context'
import Action from '../Action/Action'
import * as listUtil from '../../libs/listUtil'
import SquareBtn from '../../../../components/SquareBtn'
import './style.scss'

const Actions = ({
  isMeet,
  title,
  value,
}) => {
  const { changed } = useContext(LinkageContext)
  const { rule } = useContext(RuleContext)

  const onAddFirstClick = () => {
    listUtil.add(value, null, {
      isMeet,
      target: '',
      prop: 'value',
      value: '',
    })

    if (isMeet) {
      rule.missActions.push({
        isMeet: false,
        target: '',
        prop: 'value',
        value: '',
      })
    }

    changed()
  }

  const onActionAdd = (action, afterAction) => {
    listUtil.add(value, afterAction, action)

    if (isMeet) {
      rule.missActions.push({
        isMeet: false,
        target: '',
        prop: 'value',
        value: '',
      })
    }

    changed()
  }

  const onActionDelete = (action) => {
    listUtil.deleteItem(value, action)

    changed()
  }

  return (
    <div className="linkage-actions">
      <div className="title">
        <span className="title-text">{title}</span>
        <span className="title-btn">
          {
            value.length === 0 ?
            <SquareBtn onClick={onAddFirstClick}>+</SquareBtn> :
            null
          }
        </span>
      </div>
      <div>
        {
          value.map((action, index) => (
            <Action
              key={index}
              index={index}
              value={action}
              onAdd={onActionAdd}
              onDelete={onActionDelete}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Actions
