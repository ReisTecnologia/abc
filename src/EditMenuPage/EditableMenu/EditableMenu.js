import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout } from 'shared/Layout'
import { Spinner } from 'shared/Spinner'
import { InputField } from 'shared/InputField'
import { HeaderWrapper } from 'shared/HeaderWrapper'
import { SAVE_MENU_MUTATION } from './SAVE_MENU_MUTATION'

export const TitleWrapper = styled.div`
  flex: 1;
`

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableMenu = ({
  menu: {
    id,
    name,
    //  elements
  },
}) => {
  const isFirstRun = useRef(true)
  //   const [innerElements, setInnerElements] = useState(elements)
  const [menuName, setMenuName] = useState(name)
  const [mutate, { loading: isSaving }] = useMutation(SAVE_MENU_MUTATION)
  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        const payload = {
          variables: {
            id: id,
            input: {
              name: menuName,
              //  elements: innerElements
            },
          },
        }
        mutate(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [
    mutate,
    id,
    menuName,
    // innerElements
  ])
  return (
    <Layout>
      <HeaderWrapper>
        <TitleWrapper>
          <InputField value={menuName} setValue={setMenuName} />
        </TitleWrapper>
        {isSaving && <Spinner />}
      </HeaderWrapper>
    </Layout>
  )
}

EditableMenu.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    elements: PropTypes.arrayOf(PropTypes.any),
  }),
  loadingMenu: PropTypes.bool,
  reloadMenu: PropTypes.func,
}
