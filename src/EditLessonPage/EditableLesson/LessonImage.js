import React, { useState } from 'react'
import { FileUploader } from '_shared/FileUploader'
import { colors } from '_shared/colors'
import { Spinner } from '_shared/Spinner'
import styled from 'styled-components'
import { DeleteLessonImageButton } from './DeleteLessonImageButton'
import { DragAndDrop } from '_shared/DragAndDrop'
import PropTypes from 'prop-types'
import { LessonItem } from '_shared/LessonItem'
import { TextAndInput } from '_shared/TextAndInput'

const Wrapper = styled.div`
  display: flex;
  background-color: ${colors.dimmedPrimary};
  flex-direction: column;
`
const InitialWrapper = styled.div`
  padding-right: 5px;
`
const Title = styled.div`
  position: relative;
  text-align: center;
  margin: 1rem 0 0 0;
  font-size: 1.2rem;
  color: ${colors.white};
  border-bottom: solid 1px ${colors.white};
  padding-bottom: 0.5rem;
  @media (max-width: 360px) {
    display: flex;
    flex-direction: column;
  }
`
const ContentWrapper = styled.div`
  display: flex;
  @media (min-width: 601px) {
    padding: 2rem;
  }
  @media (max-width: 600px) {
    padding: 1rem;
  }
  @media (max-width: 375px) {
    padding: 0.5rem;
  }
`
const TextInputWrapper = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  color: ${colors.white};
`

export const LessonImage = ({
  id,
  imageUrl,
  setImageUrl,
  initials,
  setInitials,
}) => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Wrapper>
        <Title>Ícone</Title>
        <ContentWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <DragAndDrop imageFilePrefix={`${id}___`} setImageUrl={setImageUrl}>
              <LessonItem image={imageUrl} />
              <FileUploader
                imageFilePrefix={`${id}___`}
                color={colors.white}
                setImageUrl={setImageUrl}
                loading={loading}
                setLoading={setLoading}
              />
              <DeleteLessonImageButton setImageUrl={setImageUrl} />
              <LessonItem initials={initials} />
              <TextInputWrapper>
                <InitialWrapper>{'Inicial:'}</InitialWrapper>
                <TextAndInput value={initials} onChange={setInitials} />
              </TextInputWrapper>
            </DragAndDrop>
          )}
        </ContentWrapper>
      </Wrapper>
    </>
  )
}

LessonImage.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  initials: PropTypes.string,
  setInitials: PropTypes.func,
}
