import React from 'react'
import { Button } from './Button'
import { Spinner } from 'shared/Spinner'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  @media (min-width: 540px) {
    padding-left: 5px;
    position: fixed;
    right: 280px;
  }
  @media (max-width: 539px) {
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
