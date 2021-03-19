import React, { useContext } from 'react'
import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LessonsPage } from './LessonsPage/LessonsPage'
import { MenusPage } from './MenusPage/MenusPage'
import { ViewLessonPage } from './ViewLessonPage/ViewLessonPage'
import { EditLessonPage } from './EditLessonPage/EditLessonPage'
import { MenuPage } from './MenuPage/MenuPage'
import { EditMenuPage } from './EditMenuPage/EditMenuPage'
import { SignInPage } from './SignInPage/SignInPage'
import { ViewMenuPage } from './MenuPage/ViewMenuPage'
import { getTokens } from 'shared/AuthTokens/getTokens'
import {
  CurrentUserContextProvider,
  CurrentUserContext,
} from './CurrentUserContextProvider'

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
  const { userData, userDataLoading } = useContext(CurrentUserContext)
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
            <LessonsPage
              userData={userData}
              userDataLoading={userDataLoading}
            />
          </Route>
          <Route path="/menus">
            <MenusPage />
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
          <Route path="/">
            <MenuPage id="main" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default () => ApolloApp(Wrapped)
