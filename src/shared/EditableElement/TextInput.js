import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useOnClickOutside } from '../useOnClickOutside'
import TextareaAutosize from 'react-textarea-autosize'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const TextWrapper = styled.div`
  flex: 1;
  cursor: pointer;
`

export const ElementTitleWrapper = styled.div`
  display: block;
  font-weight: bold;
  cursor: pointer;
`

export const InputWrapper = styled.textarea`
  flex: 1;
  display: flex;
`

export const TextInput = ({ value, onChange, title }) => {
  const [inputValue, setInputValue] = useState(value)
  const [showInput, setShowInput] = useState(false)

  const cleanAndHideInput = useCallback(() => {
    setInputValue(value)
    setShowInput(false)
  }, [setShowInput, value])

  const onInputChange = useCallback(
    (event) => {
      setInputValue(event.target.value)
    },
    [setInputValue]
  )

  const ref = useOnClickOutside(cleanAndHideInput)

  const submitOnEnter = (e) => {
    if (e.charCode === 13) {
      onChange(inputValue)
      setShowInput(false)
    }
  }

  return (
    <Wrapper ref={ref}>
      <ElementTitleWrapper onClick={() => setShowInput(true)}>
        {title}
      </ElementTitleWrapper>
      {showInput ? (
        <TextareaAutosize
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={submitOnEnter}
        />
      ) : (
        <TextWrapper onClick={() => setShowInput(true)}>{value}</TextWrapper>
      )}
    </Wrapper>
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
}
