import React from 'react'
import { EditableElementWrapper } from './EditableElementWrapper'
import { EditableElementRow } from './EditableElementRow'
import PropTypes from 'prop-types'
import { UpDownWrapper } from './UpDownWrapper'
import { ElementControlWrapper } from './ElementControlWrapper'
import { ElementWrapper } from './ElementWrapper'
import { Button } from './Button'
import { ElementParams } from './ElementParams'
import { DeleteElementRow } from './DeleteElementRow'
import { DeleteElementButton } from './DeleteElementButton'
import { colors } from '../../shared/colors'
import { Icon } from '@iconify/react'
import arrowUpSquareFill from '@iconify-icons/bi/arrow-up-square-fill'
import arrowDownSquareFill from '@iconify-icons/bi/arrow-down-square-fill'

export const EditableElement = ({
  lessonId,
  children,
  onUp,
  onDown,
  canMoveUp,
  canMoveDown,
  elementParams,
  updateElementParams,
  deleteElement,
}) => {
  return (
    <EditableElementWrapper>
      <EditableElementRow>
        <ElementControlWrapper>
          <UpDownWrapper>
            <Button disabled={!canMoveUp} onClick={onUp}>
              <Icon
                icon={arrowUpSquareFill}
                color={() => (!canMoveUp ? '#eee' : colors.primary)}
                height="30"
                cursor={() => (!canMoveUp ? null : 'pointer')}
              />
            </Button>
            <Button disabled={!canMoveDown} onClick={onDown}>
              <Icon
                icon={arrowDownSquareFill}
                color={() => (!canMoveDown ? '#eee' : colors.primary)}
                height="30"
                cursor={() => (!canMoveDown ? null : 'pointer')}
              />
            </Button>
          </UpDownWrapper>
          <ElementParams
            lessonId={lessonId}
            updateElementParams={updateElementParams}
            elementParams={elementParams}
          />
        </ElementControlWrapper>
        <ElementWrapper>{children}</ElementWrapper>
      </EditableElementRow>
      <DeleteElementRow>
        <DeleteElementButton deleteElement={deleteElement} />
      </DeleteElementRow>
    </EditableElementWrapper>
  )
}

EditableElement.propTypes = {
  deleteElement: PropTypes.func,
  children: PropTypes.object,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  canMoveDown: PropTypes.bool,
  canMoveUp: PropTypes.bool,
  elementParams: PropTypes.shape({
    type: PropTypes.string,
    letter: PropTypes.string,
    correctLetters: PropTypes.arrayOf(PropTypes.string),
    audios: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    audioUrls: PropTypes.arrayOf(PropTypes.string),
    urlVideo: PropTypes.arrayOf(PropTypes.string),
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    description: PropTypes.string,
    text: PropTypes.string,
    words: PropTypes.array,
  }),
  updateElementParams: PropTypes.func,
  lessonId: PropTypes.string,
}
