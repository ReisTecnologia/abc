import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../shared/colors'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
  margin-bottom: 10px;
`

const ButtonWrapper = styled.div`
  padding: 3px 20px;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.primary};
  border-radius: 7px;
  cursor: pointer;
`

export const AddElementButtons = ({ addElement }) => {
  const [isShowingButtons, setIsShowingButtons] = useState(false)

  const showButtons = useCallback(() => setIsShowingButtons(true), [
    setIsShowingButtons,
  ])
  const hideButtons = useCallback(() => setIsShowingButtons(false), [
    setIsShowingButtons,
  ])

  const addAudio = useCallback(() => {
    addElement({
      type: 'Audio',
      audios: [],
      description: '',
    })
    hideButtons()
  }, [addElement, hideButtons])

  const addVideo = useCallback(() => {
    addElement({
      type: 'Video',
      videos: [],
      description: '',
    })
    hideButtons()
  }, [addElement, hideButtons])

  return (
    <Wrapper>
      {isShowingButtons ? (
        <>
          <ButtonWrapper onClick={addAudio}>Áudio</ButtonWrapper>
          <ButtonWrapper onClick={addVideo}>Vídeo</ButtonWrapper>
        </>
      ) : (
        <ButtonWrapper onClick={showButtons}>
          Adicionar novo elemento
        </ButtonWrapper>
      )}
    </Wrapper>
  )
}

AddElementButtons.propTypes = {
  index: PropTypes.string,
  addElement: PropTypes.func,
}
