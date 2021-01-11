import React from 'react'
import { CardWrapper } from './CardWrapper'
import { CompleteMark } from './CompleteMark'
import PropTypes from 'prop-types'

export const Card = ({ children, complete }) => (
  <CardWrapper>
    {complete ? <CompleteMark /> : null}
    {children}
  </CardWrapper>
)

Card.propTypes = {
  children: PropTypes.any,
  complete: PropTypes.bool,
}
