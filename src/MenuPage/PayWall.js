import React from 'react'
import styled from 'styled-components'
import { colors } from '_shared/colors'

const PaywallWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${colors.dimmedPrimary};
  text-align: center;
  color: white;
`

export const PayWall = () => {
  return <PaywallWrapper>Paywall</PaywallWrapper>
}
