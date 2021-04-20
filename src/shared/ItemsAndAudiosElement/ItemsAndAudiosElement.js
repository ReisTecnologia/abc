import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Items } from './Items'
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

export const ItemsAndAudiosElement = ({
  items,
  audios,
  actual,
  onComplete,
  initialAudio,
  conclusionAudio,
}) => {
  const { complete, doComplete } = useCompleteState({ actual, onComplete })
  const [state, setState] = useState({
    instructionsCompleted: false,
    end: false,
    actualItemIndex: 0,
  })

  const { actualItemIndex, instructionsCompleted, end } = state

  const setInstructionsCompleted = useCallback(
    () => setState((s) => ({ ...s, instructionsCompleted: true })),
    [setState]
  )

  const setListened = () => {
    const thisIsTheEnd = actualItemIndex === items.length - 1
    if (thisIsTheEnd) {
      setState({
        ...state,
        end: true,
      })
    } else {
      setState(({ actualItemIndex }) => ({
        ...state,
        actualItemIndex: actualItemIndex + 1,
      }))
    }
  }

  return (
    <Card first complete={complete}>
      <CenterWrapper>
        <InnerWrapper>
          <AudioButton
            color={actual && !instructionsCompleted ? colors.actual : null}
            onComplete={setInstructionsCompleted}
            audioUrls={initialAudio && initialAudio.url}
          />
        </InnerWrapper>
      </CenterWrapper>
      <Items>{items[actualItemIndex]}</Items>
      <AudioButton
        beforeTrailCount={actualItemIndex}
        afterTrailCount={items.length - actualItemIndex - 1}
        color={actual && instructionsCompleted ? colors.actual : null}
        disabled={end}
        icon="Play"
        audioUrls={audios.map(({ url }) => url)}
        width={20}
        onComplete={setListened}
      />
      <AudioButton
        color={actual && end ? colors.actual : null}
        onComplete={doComplete}
        audioUrls={conclusionAudio && conclusionAudio.url}
      />
    </Card>
  )
}

ItemsAndAudiosElement.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  audios: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  conclusionAudio: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  initialAudio: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  actual: PropTypes.bool,
  onComplete: PropTypes.func,
}
