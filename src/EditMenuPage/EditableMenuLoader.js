import React from 'react'
import { useQuery } from '@apollo/client'
import { MENU_QUERY } from './MENU_QUERY'
import { EditableMenu } from './EditableMenu/EditableMenu'
import { useParams } from 'react-router-dom'
import { Spinner } from 'shared/Spinner'

export const EditableMenuLoader = () => {
  let { menu } = useParams()
  const {
    data,
    // refetch: reloadMenu,
    loading: loadingMenu,
    error,
  } = useQuery(MENU_QUERY, {
    variables: { id: menu },
    notifyOnNetworkStatusChange: true,
  })

  if (error) {
    console.error(error)
  }

  return loadingMenu ? (
    <Spinner />
  ) : data && data.menu ? (
    <EditableMenu
      //     reloadLesson={reloadMenu}
      menu={data.menu}
    />
  ) : null
}
