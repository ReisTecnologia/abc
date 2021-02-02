import React from 'react'

import PropTypes from 'prop-types'

export const ReloadButton = ({ reload }) => {
  const confirmAndReload = () => {
    var response = window.confirm('reload?')
    response && reload()
  }

  return <button onClick={confirmAndReload}>Reload</button>
}

ReloadButton.propTypes = {
  reload: PropTypes.func,
}
