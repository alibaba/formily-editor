import { FormPath } from '@formily/shared'

export const createMatchUpdate = (name: string, path: string) => (
  targetName: string,
  targetPath: string,
  callback: () => void
) => {
  if (targetName || targetPath) {
    if (targetName) {
      if (FormPath.parse(targetName).matchAliasGroup(name, path)) {
        callback()
      }
    } else if (targetPath) {
      if (FormPath.parse(targetPath).matchAliasGroup(name, path)) {
        callback()
      }
    }
  } else {
    callback()
  }
}
