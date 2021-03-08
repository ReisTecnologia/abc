import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useOnClickOutside } from 'shared/useOnClickOutside'

const InputFieldWrapper = styled.div`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
  padding-left: 10px;
  height: 1.5rem;
`

const InputFieldInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  padding-left: 5px;
`

export const InputField = ({ value, setValue }) => {
  const [innerValue, setInnerValue] = useState(value)
  const resetValue = () => setInnerValue(value)
  const ref = useOnClickOutside(resetValue)

  const handleInputChange = (e) => {
    console.log('handleInputChange')
    setInnerValue(e.target.value)
  }

  const saveValue = (e) => {
    if (e.charCode === 13) {
      setValue(e.target.value)
      e.target.blur()
    }
  }

  return (
    <InputFieldWrapper ref={ref}>
      <InputFieldInput
        type="text"
        value={innerValue}
        onChange={handleInputChange}
        onKeyPress={saveValue}
      />
    </InputFieldWrapper>
  )
}

InputField.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
}
