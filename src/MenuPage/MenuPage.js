import React from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import PropTypes from 'prop-types'

export const MenuPage = ({ id }) => {
  const { data } = useQuery(MENU_QUERY, { variables: { id } })

  return <div>{JSON.stringify(data)}</div>
}

MenuPage.propTypes = {
  id: PropTypes.string.isRequired,
}
