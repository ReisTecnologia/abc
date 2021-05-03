import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'
import { Items } from './Items'
import { Card } from '../Card'
import { useCompleteState } from '../useCompleteState'
import { colors } from '../colors'
import { CenterWrapper } from './CenterWrapper'

const AudioButton = loadable(async () => {
  const { AudioButton } = await import('../AudioButton')
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
  console.log('items', items)
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

  return (
    <Card first complete={complete}>
      <CenterWrapper>
        {initialAudio.url && (
          <AudioButton
            color={actual && !instructionsCompleted ? colors.actual : null}
            onComplete={setInstructionsCompleted}
            audioUrls={initialAudio && [initialAudio.url]}
          />
        )}
        <Items
          items={items}
          actualItem={actualItem}
          onStepComplete={setAlreadyAnswered}
        />
        {conclusionAudio.url && (
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
