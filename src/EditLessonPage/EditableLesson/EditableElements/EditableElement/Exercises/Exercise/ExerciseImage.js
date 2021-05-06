import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { colors } from '_shared/colors'
import { DragAndDrop } from '_shared/DragAndDrop'
import { FileUploader } from '_shared/FileUploader'
import { FileDownloader } from '../../FileDownloader'
import { LessonItem } from '_shared/LessonItem'
import { UploaderWrapper, LessonItemWrapper } from './Exercise.styles'
import { Spinner } from '_shared/Spinner'

export const ExerciseImage = ({
  imageFilePrefix,
  updateExercise,
  imageUrl,
}) => {
  const [loading, setLoading] = useState(false)

  return (
    <DragAndDrop
      imageFilePrefix={imageFilePrefix}
      updateExerciseImageUrl={updateExercise}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <UploaderWrapper>
            <FileUploader
              color={colors.grayText}
              imageFilePrefix={imageFilePrefix}
              setLoading={setLoading}
              updateExerciseImageUrl={updateExercise}
            />
          </UploaderWrapper>
          <FileDownloader color={colors.grayText} filename={imageUrl} />
          <LessonItemWrapper>
            <LessonItem image={imageUrl} color={colors.grayText} />
          </LessonItemWrapper>
        </>
      )}
    </DragAndDrop>
  )
}

ExerciseImage.propTypes = {
  imageFilePrefix: PropTypes.string,
  updateExercise: PropTypes.func,
  imageUrl: PropTypes.string,
}
