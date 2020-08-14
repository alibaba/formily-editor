export default (rules1, rules2) => {
  if (rules1 === rules2) {
    return true
  }

  if (rules1 && rules2) {
    if (rules1.length !== rules2.length) {
      return false
    }

    for (let i = 0; i < rules1.length; i++) {
      if (rules1[i].id !== rules2[i].id) {
        return false
      }
    }

    return true
  } else {
    return false
  }
}
