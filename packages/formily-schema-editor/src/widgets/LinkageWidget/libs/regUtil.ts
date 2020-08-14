export function test(str) {
  return toReg(str) instanceof RegExp
}

export function toReg(str) {
  if (typeof str !== 'string') return ''

  const match = str.match(/^\/(.+)\/([a-z]*)$/i)

  if (!match) {
    return str
  }

  try {
    return new RegExp(match[1], match[2])
  } catch (err) {
    return str
  }
}

export function toStr(reg) {
  return String(reg)
}

export function transform(regStr) {
  const match = regStr.match(/^\/(.*)\/([a-z]*)$/i)

  if (!match) {
    return ['', []]
  }

  return [match[1], [...match[2]]]
}

export function restore(content, flags) {
  return `/${content}/${flags.join('')}`
}
