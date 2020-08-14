import { useState } from 'react'

export const useFullScreen = (defaultIsFullScreen = false) => {
  const [isFullScreen, setIsFullScreen] = useState(defaultIsFullScreen)

  return {
    isFullScreen,
    setIsFullScreen,
  }
}