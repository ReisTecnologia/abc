import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const TextWrapper = styled.div`
  flex: 1;
  cursor: pointer;
`

export const InputWrapper = styled.textarea`
  flex: 1;
  display: flex;
`

export const TextInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value)

  const onInputChange = useCallback(
    (event) => {
      setInputValue(event.target.value)
    },
    [setInputValue]
  )

  const submitOnEnter = (e) => {
    if (e.charCode === 13) {
      onChange(inputValue)
    }
  }

  return (
    <Wrapper>
      <TextareaAutosize
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={submitOnEnter}
      />
    </Wrapper>
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}
