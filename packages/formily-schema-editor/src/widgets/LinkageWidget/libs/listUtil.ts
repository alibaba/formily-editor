export function replaceCopy<T>(list: Array<T>, oldItem: T, newItem: T) {
  const newList = []

  for (const item of list) {
    if (item !== oldItem) {
      newList.push(item)
    } else {
      newList.push(newItem)
    }
  }

  return newList
}

export function addCopy<T>(list: Array<T>, afterItem: T, newItem: T) {
  const newList = []

  for (const item of list) {
    newList.push(item)

    if (item === afterItem) {
      newList.push(newItem)
    }
  }

  return newList
}

export function deleteItemCopy<T>(list: Array<T>, itemToDelete: T) {
  return list.filter(item => item !== itemToDelete)
}

export function replace<T>(list: Array<T>, oldItem: T, newItem: T) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === oldItem) {
      list[i] = newItem

      break
    }
  }
}

export function add<T>(list: Array<T>, afterItem: T, newItem: T) {
  if (!afterItem) {
    list.unshift(newItem)
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i] === afterItem) {
      list.splice(i + 1, 0, newItem)

      break
    }
  }
}

export function deleteItem<T>(list: Array<T>, itemToDelete: T) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === itemToDelete) {
      list.splice(i, 1)

      break
    }
  }
}
