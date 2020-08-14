
import { useState } from 'react'

export const MODES = {
  'PREVIEW_ONLY': {
    label: '纯预览',
    value: 'PREVIEW_ONLY'
  }, 
  'EDIT_ONLY': {
    label: '纯编辑',
    value: 'EDIT_ONLY'
  },
  'HALF_PREVIEW': {
    label: '半预览',
    value: 'HALF_PREVIEW'
  }
}

const useMode = (defaultMode = MODES.EDIT_ONLY.value) => {
  const [mode, setMode] = useState(defaultMode)

  const isPreviewMode = (mode === MODES.PREVIEW_ONLY.value) || (mode === MODES.HALF_PREVIEW.value)

  return {
    mode,
    isPreviewMode,
    setMode,
  }
}

export default useMode