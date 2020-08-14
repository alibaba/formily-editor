import React from 'react'

import { ConfigurePanel } from './index'

export default { title: 'MyConfigurePanel' };


export const Demo = () => {
  return (<ConfigurePanel layout={{ labelAlign: 'left' }} />)
}
