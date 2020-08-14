const trim = str => str.trim()

const operatorMap = {
  '==': 'equal',
  '===': 'equal',
  '!=': 'notEqual',
  '!==': 'notEqual',
  '>': 'largeThan',
  '>=': 'largeThanEqual',
  '<': 'lessThan',
  '<=': 'lessThanEqual',
}

const operatorMapReverse = {
  equal: '==',
  notEqual: '!=',
  largeThan: '>',
  largeThanEqual: '>=',
  lessThan: '<',
  lessThanEqual: '<=',
}

export function transform(conditionStr: string) {
  conditionStr = conditionStr.replace(/(^{{\s*)|(\s*}}$)/g, '')

  const logics = []

  conditionStr.replace(/\s*(&&|\|\|)\s*/g, (_, matched) => {
    logics.push(matched === '&&' ? 'and' : 'or')

    return ''
  })

  const conditions = conditionStr.split(/&&|\|\|/).map(trim).map(condition => {
    let matched

    matched = condition.match(/^\$self\.value(\.length)?\s*(===?|!==?|>=?|<=?)\s*(.+)$/)

    if (matched) {
      const target = matched[1] ? 'length' : 'value'
      let operator = matched[2]
      let value = matched[3]

      if (value === 'undefined') {
        if (operator === '==' || operator === '===') {
          operator = 'notExist'
        } else {
          operator = 'exist'
        }

        value = ''
      } else {
        operator = operatorMap[operator]
        try {
          value = JSON.parse(value)
        } catch (err) {
          value = value.replace(/(^['"])|(['"]$)/g, '')
        }
      }

      return { target, operator, value }
    }

    matched = condition.match(/^\$self\.value\.(includes|startsWith|endsWith)\((.+)\)$/)

    if (matched) {
      const target = 'value'
      const operator = matched[1]
      const value = matched[2].replace(/(^['"])|(['"]$)/g, '')

      return { target, operator, value }
    }

    matched = condition.match(/^(.*)\.test\(\$self\.value\)$/)

    if (matched) {
      const target = 'value'
      const operator = 'match'
      const value = matched[1]

      return { target, operator, value }
    }

    return null
  })

  const ret = []
  let isFirst = true

  conditions.forEach((condition, index) => {
    if (condition) {
      ret.push({
        logic: isFirst ? '' : logics[index - 1],
        ...condition,
      })

      if (isFirst) isFirst = false
    }
  })

  return ret
}

export function restore(conditions) {
  let conditionStr = ''

  conditions.forEach((condition, index) => {
    if (index !== 0) {
      conditionStr += condition.logic === 'and' ? '&&' : '||'
    }

    let expression

    if (condition.operator === 'exist') {
      expression = '$self.value !== undefined'
    } else if (condition.operator === 'notExist') {
      expression = '$self.value === undefined'
    } else if (['equal', 'notEqual', 'largeThan', 'largeThanEqual', 'lessThan', 'lessThanEqual'].indexOf(condition.operator) >= 0) {
      expression = `$self.value${condition.target === 'length' ? '.length' : ''}${operatorMapReverse[condition.operator]}${JSON.stringify(condition.value)}`
    } else if (['includes', 'startsWith', 'endsWith'].indexOf(condition.operator) >= 0) {
      expression = `$self.value.${condition.operator}(${JSON.stringify(condition.value)})`
    } else if (condition.operator === 'match') {
      expression = `${condition.value}.test($self.value)`
    }

    conditionStr += expression
  })

  return `{{${conditionStr}}}`
}
