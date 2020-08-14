import * as regUtil from './regUtil'

export function transform(rules, type) {
  let ruleDesp

  if (type === 'string') {
    ruleDesp = {
      required: false,
      format: '',
      patterns: [],
    }
  } else if (type === 'number') {
    ruleDesp = {
      required: false,
      maximum: undefined,
      minimum: undefined,
    }
  } else if (type === 'array') {
    ruleDesp = {
      required: false,
      max: undefined,
      min: undefined,
    }
  } else {
    ruleDesp = {
      required: false,
    }
  }

  for (const rule of rules) {
    if (rule.required) {
      ruleDesp.required = true
    }

    if (type === 'string') {
      if (rule.format) {
        ruleDesp.format = rule.format
      }

      if ('pattern' in rule) {
        ruleDesp.patterns.push({
          pattern: rule.pattern ? regUtil.toStr(rule.pattern) : '',
          message: rule.message,
        })
      }
    } else if (type === 'number') {
      if (rule.maximum !== undefined) {
        ruleDesp.maximum = rule.maximum
      }

      if (rule.minimum !== undefined) {
        ruleDesp.minimum = rule.minimum
      }
    } else if (type === 'array') {
      if (rule.max !== undefined) {
        ruleDesp.max = rule.max
      }

      if (rule.min !== undefined) {
        ruleDesp.min = rule.min
      }
    }
  }

  return ruleDesp
}

export function restore(ruleDesp, type) {
  const rules = []
  let keyRule

  if (ruleDesp.required) {
    keyRule = keyRule || {}
    keyRule.required = true
  }

  if (type === 'string') {
    if (ruleDesp.format) {
      keyRule = keyRule || {}
      keyRule.format = ruleDesp.format
    }

    if (ruleDesp.patterns) {
      rules.push(...ruleDesp.patterns.map(pattern => ({
        pattern: regUtil.toReg(pattern.pattern),
        message: pattern.message,
      })))
    }
  } else if (type === 'number') {
    if (ruleDesp.maximum !== undefined) {
      keyRule = keyRule || {}
      keyRule.maximum = ruleDesp.maximum
    }

    if (ruleDesp.minimum !== undefined) {
      keyRule = keyRule || {}
      keyRule.minimum = ruleDesp.minimum
    }
  } else if (type === 'array') {
    if (ruleDesp.max !== undefined) {
      keyRule = keyRule || {}
      keyRule.max = ruleDesp.max
    }

    if (ruleDesp.min !== undefined) {
      keyRule = keyRule || {}
      keyRule.min = ruleDesp.min
    }
  }

  if (keyRule) {
    rules.unshift(keyRule)
  }

  return rules
}
