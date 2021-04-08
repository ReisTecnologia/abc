import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import triangleDown from '@iconify-icons/entypo/triangle-down'
import triangleRight from '@iconify-icons/entypo/triangle-right'

const Button = styled.div`
  float: left;
  margin-left: 1.7rem;
  :hover {
    cursor: pointer;
  }
`
const IIcon = styled(Icon)`
  color: black;
  height: 30px;
  width: 30px;
`

export const ToggleDetailsButton = ({
  setShowElementParams,
  showElementParams,
}) => {
  const toggleElementParams = () => {
    setShowElementParams(!showElementParams)
  }
  const buttonDisplay = showElementParams ? (
    <IIcon icon={triangleDown} />
  ) : (
    <IIcon icon={triangleRight} />
  )
  return <Button onClick={toggleElementParams}>{buttonDisplay}</Button>
}

ToggleDetailsButton.propTypes = {
  setShowElementParams: PropTypes.func,
  showElementParams: PropTypes.bool,
}
