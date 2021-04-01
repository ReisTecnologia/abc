import React from 'react'
import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LessonsPageLoader } from './LessonsPage/LessonsPageLoader'
import { MenusPageLoader } from './MenusPage/MenusPageLoader'
import { UsersPageLoader } from './UsersPage/UsersPageLoader'
import { EditLessonPage } from './EditLessonPage/EditLessonPage'
import { EditMenuPage } from './EditMenuPage/EditMenuPage'
import { SignInPage } from './SignInPage/SignInPage'
import { ViewMenuPage } from './MenuPage/ViewMenuPage'
import { ViewMenuLoader } from './MenuPage/ViewMenuLoader'
import { ViewUserPage } from './ViewUserPage/ViewUserPage'
import { getTokens } from 'shared/AuthTokens/getTokens'
import { CurrentUserContextProvider } from 'shared/CurrentUserContextProvider'
import { EditUserPage } from 'EditUserPage/EditUserPage'
import { ViewLessonPage } from 'ViewLessonPage/ViewLessonPage'

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === '__typename' ? undefined : value
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    )
  }
  return forward(operation).map((data) => {
    return data
  })
})
const addAuthTokensInHeader = new ApolloLink((operation, forward) => {
  const tokens = getTokens()
  if (tokens && tokens.accessToken) {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        'x-access-token': tokens.accessToken,
        'x-refresh-token': tokens.refreshToken,
      },
    }))
  }
  return forward(operation)
})

const httpLink = new HttpLink({ uri: '/.netlify/functions/graphql' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([addAuthTokensInHeader, cleanTypeName, httpLink]),
})

const ApolloApp = (Wrapped) => (
  <ApolloProvider client={client}>
    <CurrentUserContextProvider>
      <Wrapped />
    </CurrentUserContextProvider>
  </ApolloProvider>
)

const Wrapped = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Lessons</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route path="/viewLesson">
            <ViewLessonPage />
          </Route>
          <Route path="/lessons">
            <LessonsPageLoader />
          </Route>
          <Route path="/menus">
            <MenusPageLoader />
          </Route>
          <Route path="/users">
            <UsersPageLoader />
          </Route>
          <Route path="/editUser">
            <EditUserPage />
          </Route>
          <Route path="/editLesson">
            <EditLessonPage />
          </Route>
          <Route path="/editMenu">
            <EditMenuPage />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <Route path="/viewMenu">
            <ViewMenuPage />
          </Route>
          <Route path="/viewUser">
            <ViewUserPage />
          </Route>
          <Route path="/">
            <ViewMenuLoader />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default () => ApolloApp(Wrapped)
