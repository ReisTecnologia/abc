const { gql } = require('apollo-server-lambda')

export default gql`
  type Word {
    startsWithTheLetter: Boolean!
    word: String!
    urlRightAnswerExplanation: String
    urlWrongAnswerExplanation: String
    urlWord: String
  }

  type Audio {
    name: String!
    url: String!
  }

  type Element {
    type: String!
    letter: String
    correctLetters: [String]
    audioUrls: [String]
    audios: [Audio]
    urlVideo: String
    description: String
    text: String
    words: [Word]
  }

  type Lesson {
    id: ID!
    name: String!
    elements: [Element]
  }

  type AddLessonResponse {
    success: Boolean!
    lessons: [Lesson]
  }

  type DeleteLessonResponse {
    success: Boolean!
    lessons: [Lesson]
  }

  type EditLessonResponse {
    success: Boolean!
    lesson: Lesson
  }

  type CleanupLessonFilesResponse {
    success: Boolean!
  }

  input WordLessonInput {
    startsWithTheLetter: Boolean!
    word: String!
    urlRightAnswerExplanation: String
    urlWrongAnswerExplanation: String
    urlWord: String
  }

  input AudioInput {
    name: String
    url: String
  }

  input ElementLessonInput {
    type: String
    letter: String
    correctLetters: [String]
    audioUrls: [String]
    audios: [AudioInput]
    urlVideo: String
    description: String
    text: String
    words: [WordLessonInput]
  }

  input EditLessonInput {
    name: String
    elements: [ElementLessonInput]
  }

  type Query {
    lessons: [Lesson]
    lesson(id: String!): Lesson
  }

  type Mutation {
    addLesson: AddLessonResponse
    deleteLesson(id: ID!): DeleteLessonResponse
    cleanupLessonFiles(id: ID!): CleanupLessonFilesResponse
    editLesson(id: ID!, input: EditLessonInput!): EditLessonResponse
  }
`
