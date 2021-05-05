import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Items } from './Items'
import { Card } from '_shared/Card'
import { useCompleteState } from '_shared/useCompleteState'
import { colors } from '_shared/colors'
import { CenterWrapper } from './CenterWrapper'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('_shared/AudioButton')
  const LoadableAudioButton = (props) => <AudioButton {...props} />
  return LoadableAudioButton
})

export const ItemsAndWordsElement = ({
  items,
  actual,
  onComplete,
  initialAudio,
  conclusionAudio,
}) => {
  const { complete, doComplete } = useCompleteState({ actual, onComplete })
  const [actualItem, setActualItem] = useState(items[0])
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

  const setAlreadyAnswered = () => {
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
      setActualItem(items[actualItemIndex + 1])
    }
  }
  useEffect(() => {
    setActualItem(items[actualItemIndex])
  }, [items, actualItemIndex])

  const showInitialAudio = initialAudio.url && !instructionsCompleted
  const showItems = !end && instructionsCompleted
  const showConclusionAudio = conclusionAudio.url && end

  return (
    <Card first complete={complete}>
      <CenterWrapper>
        {showInitialAudio && (
          <AudioButton
            color={actual && !instructionsCompleted ? colors.actual : null}
            onComplete={setInstructionsCompleted}
            audioUrls={initialAudio && [initialAudio.url]}
          />
        )}
        {showItems && (
          <Items
            items={items}
            actualItem={actualItem}
            onStepComplete={setAlreadyAnswered}
          />
        )}
        {showConclusionAudio && (
          <AudioButton
            color={actual && end ? colors.actual : null}
            onComplete={doComplete}
            audioUrls={[conclusionAudio.url]}
          />
        )}
      </CenterWrapper>
    </Card>
  )
}

ItemsAndWordsElement.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
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
