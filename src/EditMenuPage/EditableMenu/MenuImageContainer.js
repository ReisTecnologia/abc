import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '_shared/colors'

const ImageWrapper = styled.div`
  background-color: ${colors.primary};
  margin: 0.5rem 0.5rem 0.5rem 0px;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 202px;
  min-height: 202px;
  width: 202px;
  height: 202px;
  @media (max-width: 500px) {
    min-width: 152px;
    min-height: 152px;
    width: 152px;
    height: 152px;
  }
`
const Img = styled.img`
  border-radius: 5px;
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 0;
  @media (max-width: 500px) {
    width: 150px;
    height: 150px;
  }
`

export const MenuImageContainer = ({ image }) => {
  return (
    <>
      <ImageWrapper>
        {image && (
          <Img
            src={`https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${image}`}
            alt="Icone"
          />
        )}
      </ImageWrapper>
    </>
  )
}

MenuImageContainer.propTypes = {
  image: PropTypes.string,
}
