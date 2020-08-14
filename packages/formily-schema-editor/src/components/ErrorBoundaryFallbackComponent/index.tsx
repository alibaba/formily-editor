import React from 'react'
import './style.scss'

export default (className = '', style = {}) => ({error, componentStack}) => {
  return (<div className={`error-boundary-fallback ${className}`} style={style}>
  <p><strong>渲染出错!</strong></p>
  <p>错误信息</p>
  <p><strong>Error:</strong> {error.toString()}</p>
  <p><strong>Stacktrace:</strong> {componentStack}</p>
</div>)
}