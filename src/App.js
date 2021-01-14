import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LessonsPage } from './LessonsPage/LessonsPage'
import { ViewLessonPage } from './ViewLessonPage/ViewLessonPage'
import { EditLessonPage } from './EditLessonPage/EditLessonPage'

const client = new ApolloClient({
  uri: '/.netlify/functions/graphql',
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
          <Route path="/editLesson">
            <EditLessonPage />
          </Route>
          <Route path="/">
            <LessonsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default () => ApolloApp(Wrapped)
