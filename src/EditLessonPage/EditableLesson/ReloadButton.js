import React from 'react'
import { Button } from './Button'
import { Spinner } from 'shared/Spinner'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  @media (min-width: 720px) {
    padding-left: 5px;
    position: fixed;
    right: 320px;
  }
  @media (max-width: 719px) {
  }
`

export const ReloadButton = ({ reload, loading }) => {
  const confirmAndReload = () => {
    reload()
  }

  return loading ? (
    <Spinner />
  ) : (
    <Wrapper>
      <Button onClick={confirmAndReload}>Recarregar</Button>
    </Wrapper>
  )
}

ReloadButton.propTypes = {
  reload: PropTypes.func,
  loading: PropTypes.bool,
}
