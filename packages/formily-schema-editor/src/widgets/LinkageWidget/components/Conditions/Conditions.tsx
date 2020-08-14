import React, { useContext } from 'react'
import { LinkageContext } from '../../context'
import Condition from '../Condition/Condition'
import * as listUtil from '../../libs/listUtil'
import './style.scss'

const Conditions = ({
  value,
}) => {
  const { changed } = useContext(LinkageContext)

  const onConditionAdd = (condition, afterCondition) => {
    listUtil.add(value, afterCondition, condition)

    changed()
  }

  const onConditionDelete = (condition) => {
    listUtil.deleteItem(value, condition)

    changed()
  }

  return (
    <div className="linkage-conditions">
      {
        value.map((condition, index) => (
          <Condition
            key={index}
            value={condition}
            onAdd={onConditionAdd}
            onDelete={onConditionDelete}
          />
        ))
      }
    </div>
  )
}

export default Conditions
