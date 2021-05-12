import React from 'react'
import PropTypes from 'prop-types'
import { DeleteWordButton } from './DeleteWordButton'
import { WordFieldsWrapper, WordWrapper } from './Word.styles'
import { WordAndAnswerRow } from './WordAndAnswerRow'
import { RightAnswerRow } from './RightAnswerRow'
import { WrongAnswerRow } from './WrongAnswerRow'
import {
  AudioButtonWrapper,
  AudioButtonMobileWrapper,
} from '../../AudioButtonWrappers'
import { AudioButton } from '_shared/AudioButton'
import { colors } from '_shared/colors'
import styled from 'styled-components'

const Wrap = styled.div`
  align-items: flex-start;
`
export const Word = ({
  audioFilePrefix,
  word,
  rightAnswerExplanation,
  wrongAnswerExplanation,
  updateAudio,
  deleteWord,
  urlWord,
  urlRightAnswerExplanation,
  urlWrongAnswerExplanation,
  changeName,
  startsWithTheLetter,
  changeRightAnswerExplanation,
  changeWrongAnswerExplanation,
}) => {
  const AudioButtonField = (url) => (
    <Wrap>
      <AudioButtonWrapper>
        <AudioButton
          audioUrls={[
            `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${url}`,
          ]}
          size={20}
          color={colors.grayText}
        />
      </AudioButtonWrapper>
      <AudioButtonMobileWrapper>
        <AudioButton
          audioUrls={[
            `https://${process.env.REACT_APP_MY_AWS_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${url}`,
          ]}
          size={17}
          color={colors.grayText}
        />
      </AudioButtonMobileWrapper>
    </Wrap>
  )

  return (
    <WordWrapper>
      <WordFieldsWrapper>
        <WordAndAnswerRow
          audioFilePrefix={audioFilePrefix}
          updateAudio={updateAudio}
          urlWord={urlWord}
          changeName={changeName}
          word={word}
          startsWithTheLetter={startsWithTheLetter}
          audioButtonField={AudioButtonField}
        />
        <RightAnswerRow
          audioFilePrefix={audioFilePrefix}
          updateAudio={updateAudio}
          audioButtonField={AudioButtonField}
          urlRightAnswerExplanation={urlRightAnswerExplanation}
          rightAnswerExplanation={rightAnswerExplanation}
          changeRightAnswerExplanation={changeRightAnswerExplanation}
        />
        <WrongAnswerRow
          audioFilePrefix={audioFilePrefix}
          updateAudio={updateAudio}
          urlWrongAnswerExplanation={urlWrongAnswerExplanation}
          audioButtonField={AudioButtonField}
          wrongAnswerExplanation={wrongAnswerExplanation}
          changeWrongAnswerExplanation={changeWrongAnswerExplanation}
        />
      </WordFieldsWrapper>
      <DeleteWordButton deleteWord={deleteWord} />
    </WordWrapper>
  )
}

Word.propTypes = {
  audioFilePrefix: PropTypes.string,
  word: PropTypes.string,
  urlWord: PropTypes.string,
  urlRightAnswerExplanation: PropTypes.string,
  urlWrongAnswerExplanation: PropTypes.string,
  startsWithTheLetter: PropTypes.bool,
  rightAnswerExplanation: PropTypes.string,
  wrongAnswerExplanation: PropTypes.string,
  updateAudio: PropTypes.func,
  deleteWord: PropTypes.func,
  index: PropTypes.number,
  changeName: PropTypes.func,
  changeRightAnswerExplanation: PropTypes.func,
  changeWrongAnswerExplanation: PropTypes.func,
}
