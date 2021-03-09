const { gql } = require('apollo-server-lambda')

export default gql`
  type Word {
    startsWithTheLetter: Boolean!
    word: String!
    urlRightAnswerExplanation: String
    rightAnswerExplanation: String
    urlWrongAnswerExplanation: String
    wrongAnswerExplanation: String
    urlWord: String
  }

  type Audio {
    name: String!
    url: String!
  }

  type Video {
    name: String!
    url: String!
  }

  type ConclusionAudio {
    name: String
    url: String
  }

  type Element {
    type: String!
    letter: String
    correctLetters: [String]
    audioUrls: [String]
    audios: [Audio]
    urlVideo: [String]
    videos: [Video]
    description: String
    text: String
    words: [Word]
    conclusionAudio: ConclusionAudio
  }

  type Lesson {
    id: ID!
    name: String!
    elements: [Element]
  }

  type MenuElement {
    lessonId: String!
    initials: String!
  }

  type Menu {
    id: ID!
    name: String!
    elements: [MenuElement]
  }

  type User {
    id: ID!
    name: String!
    login: String!
    password: String!
    type: String!
  }

  type AddLessonResponse {
    success: Boolean!
    lessons: [Lesson]
  }

  type AddMenuResponse {
    success: Boolean!
    lessons: [Lesson]
  }

  type DeleteLessonResponse {
    dbSuccess: Boolean!
    s3Success: Boolean!
    lessons: [Lesson]
  }

  type DeleteMenuResponse {
    success: Boolean!
  }

  type EditLessonResponse {
    success: Boolean!
    lesson: Lesson
  }

  type EditMenuResponse {
    success: Boolean!
    menu: Menu
  }

  type EditUserResponse {
    success: Boolean!
    user: User
  }

  type AddUserResponse {
    success: Boolean!
    users: [User]
  }

  type CleanupLessonFilesResponse {
    success: Boolean!
  }

  input WordLessonInput {
    startsWithTheLetter: Boolean!
    word: String!
    urlRightAnswerExplanation: String
    rightAnswerExplanation: String
    urlWrongAnswerExplanation: String
    wrongAnswerExplanation: String
    urlWord: String
  }

  input AudioInput {
    name: String
    url: String
  }

  input VideoInput {
    name: String
    url: String
  }

  input ConclusionAudioInput {
    name: String
    url: String
  }

  input ElementLessonInput {
    type: String
    letter: String
    correctLetters: [String]
    audioUrls: [String]
    audios: [AudioInput]
    urlVideo: [String]
    videos: [VideoInput]
    description: String
    text: String
    words: [WordLessonInput]
    conclusionAudio: ConclusionAudioInput
  }

  input AddUserInput {
    name: String
    login: String
    password: String
    type: String
  }

  input ElementMenuInput {
    initials: String
    lessonId: String
  }

  input EditLessonInput {
    name: String
    elements: [ElementLessonInput]
  }

  input EditMenuInput {
    name: String
    elements: [ElementMenuInput]
  }

  input EditUserInput {
    name: String
    password: String
    login: String
    type: String
  }

  type Query {
    lessons: [Lesson]
    lesson(id: String!): Lesson
    menu(id: String!): Menu
    menus: [Menu]
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    addLesson: AddLessonResponse
    addMenu: AddMenuResponse
    addUser(input: AddUserInput!): AddUserResponse
    deleteLesson(id: ID!): DeleteLessonResponse
    deleteMenu(id: ID!): DeleteMenuResponse
    editMenu(id: ID!, input: EditMenuInput!): EditMenuResponse
    cleanupLessonFiles(id: ID!): CleanupLessonFilesResponse
    editLesson(id: ID!, input: EditLessonInput!): EditLessonResponse
    editUser(id: ID!, input: EditUserInput!): EditUserResponse
  }
`
