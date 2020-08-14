import React from 'react'
import { createVirtualBox } from '@formily/react-schema-renderer'
import { Card } from '@alifd/next'
import { CardProps } from '@alifd/next/types/card'
import styled from 'styled-components'

const Cube = ({ className, children, ...props } ) => {
  return <Card className={className} {...props}>{children}</Card>
}

const CubeCard = styled(Cube)`
  margin-bottom: 10px !important;
`

const CubeBlock = styled(Cube)`
  margin-bottom: 0px;
  .next-card-body {
    padding-top: 20px;
    padding-bottom: 0 !important;
  }
  &.next-card {
    border: none;
    padding-bottom: 15px;
  }
`

const FormCube = createVirtualBox<CardProps & { hasBorder?: boolean }>(
  'formcube',
  ({ children, hasBorder, ...props }) => {

    if(hasBorder){
      return <CubeCard {...props}>{children}</CubeCard>
    }

    return <CubeBlock {...props}>{children}</CubeBlock>
  }
)

export default FormCube
