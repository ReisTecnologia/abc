import React from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { BigLetter } from './BigLetter'
import { CenterWrapper } from './CenterWrapper'
import { InnerWrapper } from './InnerWrapper'
import { Card } from '../Card'
import { useCompleteState } from '../useCompleteState'
import { colors } from '../colors'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('../AudioButton')
  const LoadableAudioButton = (props) => <AudioButton {...props} />
  return LoadableAudioButton
})

export const LetterAndAudioElement = ({ letter, urlAudios, actual, onComplete }) => {
  const { complete, doComplete } = useCompleteState({ actual, onComplete })

  return (
    <Card first complete={complete}>
      <CenterWrapper>
        <InnerWrapper>
          <AudioButton
            color={actual ? colors.actual : null}
            onComplete={doComplete}
            urlAudios={urlAudios}
          />
        </InnerWrapper>
      </CenterWrapper>
      <BigLetter>{letter}</BigLetter>
    </Card>
  )
}

LetterAndAudioElement.propTypes = {
  letter: PropTypes.string,
  urlAudios: PropTypes.arrayOf(PropTypes.string),
  actual: PropTypes.bool,
  onComplete: PropTypes.func,
}
