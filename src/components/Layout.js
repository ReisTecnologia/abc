import React from 'react'
import PropTypes from 'prop-types'
import { GlobalStyle } from './GlobalStyle'
import { MainWrapper } from './MainWrapper'
// import { Footer } from './Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />.
      <MainWrapper>
        <main>{children}</main>
      </MainWrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
