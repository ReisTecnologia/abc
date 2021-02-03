import React, { useState, useCallback } from 'react'
import { Card } from '../Card'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { ContentWrapper } from './ContentWrapper'
import { ItemWrapper } from './ItemWrapper'
import { useCompleteState } from '../useCompleteState'
import { colors } from '../colors'
import { TextLetter } from '../TextLetter'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('../AudioButton')
  const LoadableAudioButton = (props) => <AudioButton {...props} />
  return LoadableAudioButton
})

export const ClickLetterInTheTextTaskElement = ({
  audios,
  text,
  correctLetters,
  actual,
  onComplete,
}) => {
  console.log('audios', audios)
  const { complete, doComplete } = useCompleteState({ actual, onComplete })
  const [audioIsListened, setAudioIsListened] = useState(false)

  const setListened = useCallback(() => setAudioIsListened(true), [
    setAudioIsListened,
  ])
  return (
    <Card first complete={complete}>
      <ContentWrapper>
        <ItemWrapper>
          <AudioButton
            color={!audioIsListened && actual ? colors.actual : null}
            onComplete={setListened}
            audioUrls={audios.map(({ url }) => url)}
          />
        </ItemWrapper>
        <ItemWrapper>
          <TextLetter
            color={audioIsListened && actual ? colors.actual : colors.ready}
            text={text}
            onComplete={doComplete}
            correctLetters={correctLetters}
          />
        </ItemWrapper>
      </ContentWrapper>
    </Card>
  )
}

ClickLetterInTheTextTaskElement.propTypes = {
  audios: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  text: PropTypes.string,
  correctLetters: PropTypes.arrayOf(PropTypes.string),
  actual: PropTypes.bool,
  onComplete: PropTypes.func,
}
