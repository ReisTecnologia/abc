import React from 'react'
import styled from 'styled-components'
import { CardWrapper } from './CardWrapper'
import { CompleteMark } from './CompleteMark'

export const Card = ({ children, complete }) => (
  <CardWrapper>
    {complete ? <CompleteMark /> : null}
    {children}
  </CardWrapper>
)
