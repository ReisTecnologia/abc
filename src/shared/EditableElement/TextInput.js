import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useOnClickOutside } from '../useOnClickOutside'

export const Wrapper = styled.div`
  display: flex;
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
  const [showInput, setShowInput] = useState(false)

  const cleanAndHideInput = useCallback(() => {
    setInputValue(value)
    setShowInput(false)
  }, [setShowInput])

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
    <Wrapper>
      {showInput ? (
        <InputWrapper
          ref={ref}
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
}
