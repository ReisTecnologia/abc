import React, { useState } from 'react'
import { FileUploader } from 'shared/FileUploader'
import { colors } from 'shared/colors'
import { Spinner } from 'shared/Spinner'
import styled from 'styled-components'
import { DeleteMenuImageButton } from './DeleteMenuImageButton'
import { DragAndDrop } from 'shared/DragAndDrop'
import PropTypes from 'prop-types'
import { MenuImageContainer } from './MenuImageContainer'

const Wrapper = styled.div`
  display: flex;
  background-color: ${colors.dimmedPrimary};
  flex-direction: column;
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
  justify-content: center;
  background-color: ${colors.white};

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

export const MenuBackground = ({ id, menuImage, setMenuImage }) => {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Wrapper>
        <Title>Imagem de fundo</Title>
        <ContentWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <DragAndDrop
              imageFilePrefix={`${id}___`}
              setMenuImage={setMenuImage}
            >
              <MenuImageContainer image={menuImage} />
              <FileUploader
                imageFilePrefix={`${id}___`}
                color={colors.grayText}
                setMenuImage={setMenuImage}
                loading={loading}
                setLoading={setLoading}
              />
              <DeleteMenuImageButton setMenuImage={setMenuImage} />
            </DragAndDrop>
          )}
        </ContentWrapper>
      </Wrapper>
    </>
  )
}

MenuBackground.propTypes = {
  id: PropTypes.string,
  menuImage: PropTypes.string,
  setMenuImage: PropTypes.func,
}
