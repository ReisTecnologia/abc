import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'
import { useOnClickOutside } from '../../useOnClickOutside'

import styled from 'styled-components'

export const NameWrapper = styled.div`
  margin-right: 5px;
  cursor: pointer;
`

export const InputWrapper = styled.div`
  margin-right: 5px;
  padding: 3px;
  color: #999;
  border: dashed 1px #999;
  background-color: #fff;
`

export const Audio = ({ audioUrl }) => {
  const [inputIsVisible, setInputIsVisible] = useState(false)
  const showInput = () => setInputIsVisible(true)
  const hideInput = () => setInputIsVisible(false)

  const ref = useOnClickOutside(hideInput)

  return inputIsVisible ? (
    <InputWrapper ref={ref}>
      <Uploader
        filename={audioUrl}
        dragHereMessage="arraste seu arquivo para cá"
        dropHereMessage="solte o arquivo para enviar"
      />
    </InputWrapper>
  ) : (
    <NameWrapper onClick={showInput}>{audioUrl}</NameWrapper>
  )
}

Audio.propTypes = {
  audioUrl: PropTypes.string,
}
