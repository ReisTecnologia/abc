import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Audio } from './Audio/Audio'
import { AddAudioButton } from './AddAudioButton'
import { v4 as uuidv4 } from 'uuid'
import { TextInput } from './TextInput'

const Wrapper = styled.div`
  padding: 0px 21px;
  color: #555;
  text-align: left;
  width: 100%;
`

const ElementType = styled.div`
  margin-bottom: 5px;
  /* float: right; */
  display: flex;
  justify-content: center;
  background-color: #fff;
  font-weight: bold;
`

export const ElementParams = ({ elementParams, updateElementParams }) => {
  const addAudio = () => {
    const newElementParams = { ...elementParams }
    const newAudioUrl = `${uuidv4()}.m4a`
    newElementParams.audioUrls = [
      ...elementParams.audios,
      { url: newAudioUrl, name: 'new name' },
    ]
    updateElementParams(newElementParams)
  }
  const changeDescription = (newDescription) => {
    updateElementParams({
      ...elementParams,
      description: newDescription,
    })
  }
  const changeText = (newText) => {
    updateElementParams({
      ...elementParams,
      text: newText,
    })
  }
  const changeLetter = (newLetter) => {
    updateElementParams({
      ...elementParams,
      letter: newLetter,
    })
  }
  const changeCorrectLetters = (newCorrectLetters) => {
    newCorrectLetters = correctLettersString
      ? correctLettersString.split(',')
      : null
    console.log('newCorrectLetters', newCorrectLetters)
    updateElementParams({
      ...elementParams,
      correctletters: newCorrectLetters,
    })
  }
  const {
    type,
    correctLetters,
    letter,
    description,
    audios,
    urlVideo,
    words,
    text,
  } = elementParams

  const correctLettersString = correctLetters ? correctLetters.join() : null
  const correctLettersArray = correctLettersString
    ? correctLettersString.split(',')
    : null
  console.log('correctLettersArray', correctLettersArray)
  console.log('correctLetter', correctLettersString)

  console.log('correctLetters', correctLetters)
  // console.log('letter', letter)
  console.log('words', words)
  // console.log('text', text)
  // console.log('description', description)

  const buildUpdateAudio = (audioIndex) => (payload) => {
    console.log('updateAudio', 'index', audioIndex, payload)
    const newAudios = [...elementParams.audios]
    newAudios[audioIndex] = {
      ...elementParams.audios[audioIndex],
      ...payload,
    }
    updateElementParams({
      ...elementParams,
      audios: newAudios,
    })
  }

  return (
    <Wrapper>
      <ElementType>{type}</ElementType>
      <TextInput
        value={description}
        onChange={changeDescription}
        title={'Descrição:'}
      />
      <br />
      {text && (
        <TextInput value={text} onChange={changeText} title={'Texto:'} />
      )}
      {letter && (
        <TextInput value={letter} onChange={changeLetter} title={'Letra:'} />
      )}
      {correctLetters && (
        <TextInput
          value={correctLettersString}
          onChange={changeCorrectLetters}
          title={'Letras corretas:'}
        />
      )}
      <b>Audios</b>:
      {audios &&
        audios.map(({ name, url }, audioIndex) => (
          <Audio
            url={url}
            updateAudio={buildUpdateAudio(audioIndex)}
            name={name}
            key={url}
          />
        ))}
      <AddAudioButton onClick={addAudio} />
      <br />
      {urlVideo ? <b>urlVideo:</b> && urlVideo : null}
    </Wrapper>
  )
}

ElementParams.propTypes = {
  elementParams: PropTypes.shape({
    type: PropTypes.string,
    letter: PropTypes.string,
    correctLetters: PropTypes.arrayOf(PropTypes.string),
    audios: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    urlVideo: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string,
    words: PropTypes.array,
  }),
  updateElementParams: PropTypes.func,
}
