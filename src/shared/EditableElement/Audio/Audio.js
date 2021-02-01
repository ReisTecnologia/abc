import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'

import styled from 'styled-components'

export const NameWrapper = styled.div`
  margin-right: 5px;
`

export const InputWrapper = styled.div`
  margin-right: 5px;
  padding: 3px;
  color: #999;
  display: inline-block;
  border: dashed 1px #999;
  background-color: #fff;
`

export const Audio = ({ audioUrl }) => {
  const [inputIsVisible, setInputIsVisible] = useState(true)
  const showInput = () => setInputIsVisible(true)
  // const hideInput = () => setInputIsVisible(false)

  return inputIsVisible ? (
    // <InputWrapper onClick={hideInput}>
    <InputWrapper>
      {audioUrl} <br />
      <Uploader filename={audioUrl}>
        <i>arraste seu arquivo para cá</i>
      </Uploader>
    </InputWrapper>
  ) : (
    <NameWrapper onClick={showInput}>{audioUrl}</NameWrapper>
  )
}

Audio.propTypes = {
  audioUrl: PropTypes.string,
}
