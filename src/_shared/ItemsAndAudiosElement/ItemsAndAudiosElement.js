import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Items } from './Items'
import { Card } from '../Card'
import { useCompleteState } from '../useCompleteState'
import { colors } from '../colors'
import { PlayButtonWrapper } from './PlayButtonWrapper'
import { CenterWrapper } from './CenterWrapper'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('../AudioButton')
  const LoadableAudioButton = (props) => <AudioButton {...props} />
  return LoadableAudioButton
})

export const ItemsAndAudiosElement = ({
  items,
  actual,
  onComplete,
  initialAudio,
  conclusionAudio,
  setActualElement,
  index,
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
  const restartInstructions = useCallback(
    () =>
      setState(() => ({
        end: false,
        instructionsCompleted: false,
        actualItemIndex: 0,
      })),
    [setState]
  )
  const skipToTheEnd = useCallback(
    () =>
      setState({
        ...state,
        instructionsCompleted: true,
        end: true,
      }),
    [state]
  )

  const exerciseCompleted = !instructionsCompleted || end

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
      setActualItem(items[actualItemIndex + 1])
    }
  }
  useEffect(() => {
    setActualItem(items[actualItemIndex])
  }, [items, actualItemIndex])

  return (
    <Card first complete={complete}>
      <CenterWrapper>
        {initialAudio.url && (
          <AudioButton
            color={actual && !instructionsCompleted ? colors.actual : null}
            onStepStart={restartInstructions}
            onComplete={setInstructionsCompleted}
            audioUrls={initialAudio && [initialAudio.url]}
            setActualElement={setActualElement}
            index={index}
          />
        )}
        <Items>{actualItem}</Items>
        <PlayButtonWrapper>
          <AudioButton
            beforeTrailCount={actualItemIndex}
            afterTrailCount={items.length - actualItemIndex - 1}
            color={actual && !exerciseCompleted ? colors.actual : null}
            disabled={end}
            icon="Play"
            audioUrls={items.map(({ audioUrl }) => audioUrl)}
            width={20}
            onStepStart={setInstructionsCompleted}
            onStepComplete={setListened}
            showDots={true}
            setActualElement={setActualElement}
            index={index}
          />
        </PlayButtonWrapper>
        {conclusionAudio.url && (
          <AudioButton
            color={actual && end ? colors.actual : null}
            onStepStart={skipToTheEnd}
            onComplete={doComplete}
            audioUrls={[conclusionAudio.url]}
            setActualElement={setActualElement}
            index={index}
          />
        )}
      </CenterWrapper>
    </Card>
  )
}

ItemsAndAudiosElement.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
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
  setActualElement: PropTypes.func,
  index: PropTypes.number,
}
