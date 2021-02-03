import React from 'react'
import { Spinner } from '../shared/Spinner'

import PropTypes from 'prop-types'

export const ReloadButton = ({ reload, loading }) => {
  const confirmAndReload = () => {
    // window.confirm('reload?') && reload()
    reload()
  }

  return loading ? (
    <Spinner />
  ) : (
    <button onClick={confirmAndReload}>Reload</button>
  )
}

ReloadButton.propTypes = {
  reload: PropTypes.func,
  loading: PropTypes.bool,
}
