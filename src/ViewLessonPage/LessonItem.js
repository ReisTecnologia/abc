import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from 'shared/colors'

const Wrapper = styled.div`
  background-color: ${colors.white};
  margin: 10px;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 3rem;
  min-height: 3rem;
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`
const ImageWrapper = styled.div`
  background-color: ${colors.white};
  margin: 10px;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 3rem;
  min-height: 3rem;
  width: 3rem;
  height: 3rem;
  position: fixed;
`
const Img = styled.img`
  border-radius: 5px;
`

export const LessonItem = ({ initials, imageUrl, onClick }) => {
  return (
    <>
      {imageUrl ? (
        <ImageWrapper onClick={onClick}>
          <Img
            src={`https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${imageUrl}`}
            alt="Imagem da aula"
          />
        </ImageWrapper>
      ) : (
        <Wrapper onClick={onClick}>{initials}</Wrapper>
      )}
    </>
  )
}

LessonItem.propTypes = {
  initials: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
}
