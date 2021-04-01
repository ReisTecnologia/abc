import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { CurrentUserContext } from 'shared/CurrentUserContextProvider'

export const AccessGateway = ({ children, role }) => {
  const { user, userDataLoading } = useContext(CurrentUserContext)
  if (userDataLoading) return 'loading ...'
  if (user && user.signedInUser.type === role) {
    return children
  } else {
    // let history = useHistory()
    // const navigateToMenu = () => {
    //   history.push('/menu')
    // }

    // alert('Você não tem permissões para acessar essa página!')
    // useEffect(
    //   () => {
    //     alert('Você não tem permissões para acessar essa página!');
    //     navigateToMenu()
    //   },[]
    // )
    // navigateToMenu()
    // return null
    return <span>Você não tem permissões para acessar essa página!</span>
  }
}

AccessGateway.propTypes = {
  children: PropTypes.any,
}
