import React from 'react'
import './style.scss'

export default ({ children, onClick, className='' }) => {
  return (
    <div className={`linkage-square-btn ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
