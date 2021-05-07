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

export const AudioElement = ({
  audios,
  actual,
  setActualElement,
  index,
  onComplete,
}) => {
  const { complete, doComplete } = useCompleteState({ onComplete, actual })

  return (
    <Card complete={complete}>
      <Wrapper>
        <InnerWrapper>
          <AudioButton
            color={actual ? colors.actual : null}
            index={index}
            setActualElement={setActualElement}
            onComplete={doComplete}
            audioUrls={audios.map(({ url }) => url)}
            showDots={true}
          />
        </InnerWrapper>
      </Wrapper>
    </Card>
  )
}

AudioElement.propTypes = {
  audios: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  actual: PropTypes.bool,
  onComplete: PropTypes.func,
  setActualElement: PropTypes.func,
  index: PropTypes.number,
}
