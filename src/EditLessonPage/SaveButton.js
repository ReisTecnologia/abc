import React from 'react'

import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
// import { SaveButtonWrapper } from './SaveButtonWrapper'

export const SAVE_LESSON = gql`
  mutation editLesson($id: ID!, $input: EditLessonInput!) {
    editLesson(id: $id, input: $input) {
      success
      lesson {
        name
        elements {
          type
        }
      }
    }
  }
`

export const SaveButton = ({ id, name, elements }) => {
  const [mutate, { loading }] = useMutation(SAVE_LESSON, {
    variables: { id, input: { name, elements } },
  })

  const confirmAndSave = () => {
    var response = window.confirm('Salvar alterações?')
    // response && console.log('save button elements', elements)
    // console.log('name', name)
    response && mutate()
  }
  return loading ? (
    '...'
  ) : (
    // <SaveButtonWrapper>
    <button onClick={confirmAndSave}>Salvar</button>
    /* </SaveButtonWrapper> */
  )
}

SaveButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      letter: PropTypes.string,
      correctLetters: PropTypes.arrayOf(PropTypes.string),
      audioUrls: PropTypes.arrayOf(PropTypes.string),
      urlVideo: PropTypes.string,
      description: PropTypes.string,
      text: PropTypes.string,
      words: PropTypes.array,
    })
  ),
}
