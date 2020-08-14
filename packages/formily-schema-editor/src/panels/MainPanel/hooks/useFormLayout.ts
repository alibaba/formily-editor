
import { useState } from 'react'

const useFormLayout = (defaultLayout = { size: "medium", labelAlign: "left", labelCol: 4, wrapperCol: 10 }) => {
  const [layout, setLayout] = useState(defaultLayout)

 
  const setCompactLayout = () => {
    setLayout({ ...defaultLayout, labelAlign: "top"})
  }

  const setLooseLayout = () => {
    setLayout({...defaultLayout, labelAlign: "left"})
  }

  return {
    layout,
    setLayout,
    setCompactLayout,
    setLooseLayout
  }
}

export default useFormLayout