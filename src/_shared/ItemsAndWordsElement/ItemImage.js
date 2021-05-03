import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  font-family: Karla;
  display: flex;
`
const Img = styled.img`
  border-radius: 5px;
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin: 0;
`

export const ItemImage = ({ image }) => {
  return (
    <Wrapper>
      <Img src={image} />
    </Wrapper>
  )
}

ItemImage.propTypes = {
  image: PropTypes.string,
}
