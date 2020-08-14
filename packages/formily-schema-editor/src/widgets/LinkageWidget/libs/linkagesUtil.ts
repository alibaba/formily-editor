import * as conditionUtil from './conditionUtil'
import * as actionUtil from './actionUtil'
import getRuleId from './getRuleId'

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0
}

function linkageHasAction(linkage) {
  return !!(linkage.state || linkage.schema || linkage.otherwise)
}

function isMissLinkage(linkage) {
  return linkage.otherwise && !isEmptyObject(linkage.otherwise)
}

export function transform(linkages) {
  const rules = []

  let lastId
  let lastCondition
  let lastMeetActions
  let lastMissActions

  let pushAction = linkage => {
    if (linkageHasAction(linkage)) {
      if (isMissLinkage(linkage)) {
        lastMissActions.push(actionUtil.transform(linkage, false))
      } else {
        lastMeetActions.push(actionUtil.transform(linkage, true))
      }
    }
  }

  for (const linkage of linkages) {
    const { condition, id } = linkage

    if (condition === lastCondition && id === lastId) {
      pushAction(linkage)
    } else {
      lastId = id
      lastCondition = condition
      lastMeetActions = []
      lastMissActions = []

      rules.push({
        id: lastId,
        conditions: conditionUtil.transform(lastCondition),
        meetActions: lastMeetActions,
        missActions: lastMissActions,
      })

      pushAction(linkage)
    }
  }

  rules.forEach(rule => {
    if (rule.id === undefined) {
      rule.id = getRuleId()
    }
  })

  return rules
}

export function restore(rules) {
  const linkages = []

  for (const { id, conditions, meetActions, missActions } of rules) {
    const condition = conditionUtil.restore(conditions)

    // 需要支持仅有 condition 没有 action 的规则
    if (meetActions.length === 0 && missActions.length === 0) {
      linkages.push({
        id,
        name: '',
        type: 'value:state',
        condition,
        target: '',
      })
    }

    linkages.push(...meetActions.map(action => {
      return actionUtil.restore(action, condition, id)
    }), ...missActions.map(action => {
      return actionUtil.restore(action, condition, id)
    }))
  }

  return linkages
}
