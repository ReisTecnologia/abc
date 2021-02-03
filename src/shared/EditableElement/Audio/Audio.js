import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Uploader } from './Uploader'
import { InputWrapper } from './InputWrapper'
import { AudioWrapper } from './AudioWrapper'
import { AudioNameWrapper } from './AudioNameWrapper'
import { AudioUrlWrapper } from './AudioUrlWrapper'
import { AudioNumberWrapper } from './AudioNumberWrapper'
import { AudioNumber } from './AudioNumber'
import { AudioFieldsWrapper } from './AudioFieldsWrapper'
import { NameAndUrlWrapper } from './NameAndUrlWrapper'

export const Audio = ({ url, name, updateAudio }) => {
  const [inputIsVisible, setInputIsVisible] = useState(true)
  const showInput = () => setInputIsVisible(true)
  const hideInput = () => setInputIsVisible(false)
  const toggleInput = () => (inputIsVisible ? hideInput() : showInput())
  const input = inputIsVisible && (
    <InputWrapper>
      <Uploader
        filename={url}
        dragHereMessage="arraste seu arquivo para cá"
        dropHereMessage="solte o arquivo para enviar"
        updateAudio={updateAudio}
      />
    </InputWrapper>
  )

  return (
    <AudioWrapper>
      <AudioNumberWrapper>
        <AudioNumber>1</AudioNumber>
      </AudioNumberWrapper>
      <AudioFieldsWrapper>
        <NameAndUrlWrapper onClick={toggleInput}>
          <AudioNameWrapper>{name}</AudioNameWrapper>
          <AudioUrlWrapper>{url}</AudioUrlWrapper>
        </NameAndUrlWrapper>
        {input}
      </AudioFieldsWrapper>
    </AudioWrapper>
  )
}

Audio.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  updateAudio: PropTypes.func,
}
