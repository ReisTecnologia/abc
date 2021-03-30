import React, { useState } from 'react'
import { FileUploader } from './EditableElements/EditableElement/FileUploader'
import { colors } from 'shared/colors'
import { Spinner } from 'shared/Spinner'
import styled from 'styled-components'
import { DragAndDrop } from './EditableElements/EditableElement/DragAndDrop'
import PropTypes from 'prop-types'

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
`
const Wrapper = styled.div`
  display: flex;
  background-color: #eee;
  flex-direction: column;
`
const Img = styled.img`
  border-radius: 5px;
`
const Title = styled.div`
  @media (min-width: 361px) {
    position: relative;
    text-align: center;
    margin: 1rem 0 0 0;
    font-size: 1.2rem;
    color: ${colors.grayText};
    border-bottom: solid 1px ${colors.grayText};
    padding-bottom: 0.5rem;
  }
  @media (max-width: 360px) {
    position: relative;
    text-align: center;
    margin: 1rem 0 0 0;
    font-size: 1.2rem;
    color: ${colors.grayText};
    border-bottom: solid 1px ${colors.grayText};
    padding-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
  }
`
const ContentWrapper = styled.div`
  @media (min-width: 601px) {
    padding: 2rem;
    display: flex;
  }
  @media (max-width: 600px) {
    padding: 1rem;
    display: flex;
  }
  @media (max-width: 375px) {
    padding: 0.5rem;
    display: flex;
  }
`

export const LessonImage = ({ id, imageUrl, setImageUrl }) => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Wrapper>
          <Title>Ícone para menus</Title>
          <ContentWrapper>
            <DragAndDrop imageFilePrefix={`${id}___`} setImageUrl={setImageUrl}>
              <ImageWrapper>
                <Img
                  src={`https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${imageUrl}`}
                  alt="Imagem da aula"
                />
              </ImageWrapper>
              <FileUploader
                imageFilePrefix={`${id}___`}
                color={colors.grayText}
                setImageUrl={setImageUrl}
                loading={loading}
                setLoading={setLoading}
              />
            </DragAndDrop>
          </ContentWrapper>
        </Wrapper>
      )}
    </>
  )
}

LessonImage.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
}
