import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useOnClickOutside } from 'shared/useOnClickOutside'
import TextareaAutosize from 'react-textarea-autosize'

export const Wrapper = styled.div`
  display: inline-flex;
  padding-left: 5px;
`
export const TextWrapper = styled.div`
  flex: 1;
  cursor: pointer;
`

export const InputWrapper = styled.textarea`
  flex: 1;
  display: flex;
`

export const TextInput = ({ value, onChange, color, width }) => {
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
    <Wrapper ref={ref} style={{ width: width }}>
      {showInput ? (
        <TextareaAutosize
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={submitOnEnter}
          style={{ minWidth: width }}
        />
      ) : (
        <TextWrapper
          onClick={() => setShowInput(true)}
          style={{ color: color }}
        >
          {value || '...'}
        </TextWrapper>
      )}
    </Wrapper>
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.string,
}
