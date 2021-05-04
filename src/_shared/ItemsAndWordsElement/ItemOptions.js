import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '_shared/colors'

const Button = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  min-width: 41px;
  border: solid 1px ${colors.primary};
  border-radius: 5px;
  margin: 0px 5px;
  &:hover {
    cursor: pointer;
    background-color: ${colors.dimmedPrimary};
  }
`

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`

export const ItemOptions = ({ options, addNewAnswer }) => {
  return (
    <Wrapper>
      {options.map((letter, index) => (
        <Button key={index} onClick={addNewAnswer(options[index])}>
          {letter.toUpperCase()}
        </Button>
      ))}
    </Wrapper>
  )
}

ItemOptions.propTypes = {
  options: PropTypes.array,
  addNewAnswer: PropTypes.func,
}
