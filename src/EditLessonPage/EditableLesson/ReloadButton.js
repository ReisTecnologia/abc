import React from 'react'
import { Button } from './Button'
import { Spinner } from 'shared/Spinner'

import PropTypes from 'prop-types'

export const ReloadButton = ({ reload, loading }) => {
  const confirmAndReload = () => {
    reload()
  }

  return loading ? (
    <Spinner />
  ) : (
    <Button onClick={confirmAndReload}>Recarregar</Button>
  )
}

ReloadButton.propTypes = {
  reload: PropTypes.func,
  loading: PropTypes.bool,
}
