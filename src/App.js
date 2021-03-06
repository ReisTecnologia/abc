import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloLink, concat } from 'apollo-link'
import { ApolloProvider } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LessonsPage } from './LessonsPage/LessonsPage'
import { MenusPage } from './MenusPage/MenusPage'
import { ViewLessonPage } from './ViewLessonPage/ViewLessonPage'
import { EditLessonPage } from './EditLessonPage/EditLessonPage'
import { MenuPage } from './MenuPage/MenuPage'
import { EditMenuPage } from './EditMenuPage/EditMenuPage'
import { ViewMenuPage } from 'MenuPage/ViewMenuPage'

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

const httpLink = new HttpLink({ uri: '/.netlify/functions/graphql' })

const client = new ApolloClient({
  link: concat(cleanTypeName, httpLink),
  cache: new InMemoryCache(),
})

const ApolloApp = (Wrapped) => (
  <ApolloProvider client={client}>
    <Wrapped />
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
            <LessonsPage />
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
