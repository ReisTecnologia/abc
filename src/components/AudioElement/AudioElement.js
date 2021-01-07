import React from 'react'
import { Wrapper } from './Wrapper'
import { InnerWrapper } from './InnerWrapper'
import PropTypes from 'prop-types'
import { Card } from '../Card'
import { useCompleteState } from '../useCompleteState'
import loadable from '@loadable/component'
import { colors } from '../colors'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('../AudioButton')
  const LoadableAudioButton = (props) => <AudioButton {...props} />
  return LoadableAudioButton
})

export const AudioElement = ({ urlAudios, actual, onComplete }) => {
  const { complete, doComplete } = useCompleteState({ onComplete, actual })

  return (
    <Card complete={complete}>
      <Wrapper>
        <InnerWrapper>
          <AudioButton
            color={actual ? colors.actual : null}
            onComplete={doComplete}
            urlAudios={urlAudios}
          />
        </InnerWrapper>
      </Wrapper>
    </Card>
  )
}

AudioElement.propTypes = {
  urlAudios: PropTypes.arrayOf(PropTypes.string),
  actual: PropTypes.bool,
  onComplete: PropTypes.func,
}
