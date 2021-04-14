const AWS = require('aws-sdk')
const config = require('./dbConfig.js')

// console.log('node_env>>>>>', process.env.NODE_ENV)
// console.log('config.aws_config', config)

AWS.config.update(config.awsConfig.aws_config)

const TABLE_NAME = 'lessons'
const MENU_TABLE_NAME = 'menus'
const USER_TABLE_NAME = 'users'

const getLessons = async function () {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: TABLE_NAME,
  }

  return docClient
    .scan(params)
    .promise()
    .then(({ Items }) => Items)
}

const getMenus = async function () {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: MENU_TABLE_NAME,
  }

  return docClient
    .scan(params)
    .promise()
    .then(({ Items }) => Items)
    .catch((e) => console.log('error', e))
}

const getUsers = async function () {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: USER_TABLE_NAME,
    ExpressionAttributeNames: { '#id': 'id' },
    ExpressionAttributeValues: { ':login': 'login#', ':email': 'email#' },
    FilterExpression: 'NOT contains(#id, :login) AND NOT contains(#id, :email)',
  }
  return docClient
    .scan(params)
    .promise()
    .then(({ Items }) => Items)
    .catch((e) => console.log('error', e))
}

const getMenu = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    ExpressionAttributeValues: {
      ':id': id,
    },
    KeyConditionExpression: 'id = :id',
    TableName: MENU_TABLE_NAME,
  }
  return docClient
    .query(params)
    .promise()
    .then(({ Items }) => Items[0])
}
const getUser = (login, id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    ExpressionAttributeValues: login ? { ':login': login } : { ':id': id },
    FilterExpression: login ? 'login = :login' : 'id = :id',

    TableName: USER_TABLE_NAME,
  }
  return docClient
    .scan(params)
    .promise()
    .then(({ Items }) => Items[0])
}

const getLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    ExpressionAttributeValues: {
      ':id': id,
    },
    KeyConditionExpression: 'id = :id',
    TableName: TABLE_NAME,
  }
  return docClient
    .query(params)
    .promise()
    .then(({ Items }) => Items[0])
}

const deleteLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient
    .delete({
      Key: { id: id },
      ReturnItemCollectionMetrics: 'SIZE',
      TableName: TABLE_NAME,
    })
    .promise()
}

const deleteMenu = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  return docClient
    .delete({
      Key: { id: id },
      ReturnItemCollectionMetrics: 'SIZE',
      TableName: MENU_TABLE_NAME,
    })
    .promise()
}

const addLesson = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    Item: {
      id: id,
      name: '_Nova Aula',
      elements: [],
      image: '',
      initials: '?',
    },
    TableName: TABLE_NAME,
  }

  return docClient.put(params).promise()
}

const addMenu = (id) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    Item: {
      id: id,
      name: '_Novo Menu',
      backgroundImage: '',
      elements: [],
    },
    TableName: MENU_TABLE_NAME,
  }

  return docClient.put(params).promise()
}
const addUser = (id, name, login, password, type, email) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TransactItems: [
      {
        Put: {
          Item: {
            login: login,
            id: id,
            name: name,
            password: password,
            type: type,
            email: email,
          },
          TableName: USER_TABLE_NAME,
          ConditionExpression: 'attribute_not_exists(id)',
        },
      },
      {
        Put: {
          Item: {
            id: `login#${login}`,
          },
          TableName: USER_TABLE_NAME,
          ConditionExpression: 'attribute_not_exists(id)',
        },
        Put: {
          Item: {
            id: `email#${email}`,
          },
          TableName: USER_TABLE_NAME,
          ConditionExpression: 'attribute_not_exists(id)',
        },
      },
    ],
  }
  return docClient.transactWrite(params).promise()
}

const editMenu = (id, name, backgroundImage, elements) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: MENU_TABLE_NAME,
    Key: { id: id },
    ExpressionAttributeNames: { '#name': name ? 'name' : null, '#id': 'id' },
    ExpressionAttributeValues: {
      ':newName': name,
      ':id': id,
      ':elements': elements,
      ':backgroundImage': backgroundImage,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression:
      'set #name = :newName, elements = :elements, backgroundImage = :backgroundImage',
    ConditionExpression: ':id = #id',
  }
  return docClient
    .update(params)
    .promise()
    .then(({ Attributes }) => Attributes)
}

const editLesson = (id, name, elements, image, initials) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: TABLE_NAME,
    Key: { id: id },
    ExpressionAttributeNames: { '#name': name ? 'name' : null, '#id': 'id' },
    ExpressionAttributeValues: {
      ':newName': name,
      ':id': id,
      ':elements': elements,
      ':image': image,
      ':initials': initials,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression:
      'set #name = :newName, elements = :elements, image = :image, initials = :initials',
    ConditionExpression: ':id = #id',
  }

  return docClient
    .update(params)
    .promise()
    .then(({ Attributes }) => Attributes)
}
const editUser = (
  login,
  previousLogin,
  name,
  type,
  email,
  previousEmail,
  id
) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  params = {
    TransactItems: [
      {
        Update: {
          TableName: USER_TABLE_NAME,
          Key: { id: id },
          ExpressionAttributeNames: {
            '#id': 'id',
            '#name': 'name',
            '#type': 'type',
          },
          ExpressionAttributeValues: {
            ':newName': name,
            ':login': login,
            ':newType': type,
            ':id': id,
            ':email': email,
          },
          ReturnValues: 'ALL_NEW',
          UpdateExpression:
            'set #name = :newName, login = :login,  #type = :newType, email = :email',
          ConditionExpression: ':id = #id',
        },
      },
      login !== previousLogin
        ? {
            Delete: {
              Key: { id: `login#${previousLogin}` },
              TableName: USER_TABLE_NAME,
              ReturnItemCollectionMetrics: 'SIZE',
            },
          }
        : null,
      login !== previousLogin
        ? {
            Put: {
              Item: {
                id: `login#${login}`,
              },
              TableName: USER_TABLE_NAME,
              ConditionExpression: 'attribute_not_exists(id)',
            },
          }
        : null,
      email !== previousEmail
        ? {
            Delete: {
              Key: { id: `email#${previousEmail}` },
              TableName: USER_TABLE_NAME,
              ReturnItemCollectionMetrics: 'SIZE',
            },
          }
        : null,
      email !== previousEmail
        ? {
            Put: {
              Item: {
                id: `email#${email}`,
              },
              TableName: USER_TABLE_NAME,
              ConditionExpression: 'attribute_not_exists(id)',
            },
          }
        : null,
    ],
  }
  return docClient.transactWrite(params).promise()
}
const editUserPassword = (id, password) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const params = {
    TableName: USER_TABLE_NAME,
    Key: { id: id },
    ExpressionAttributeNames: { '#id': 'id' },
    ExpressionAttributeValues: {
      ':password': password,
      ':id': id,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set password = :password',

    ConditionExpression: ':id = #id',
  }
  return docClient
    .update(params)
    .promise()
    .then(({ Attributes }) => Attributes)
}

module.exports = {
  getLessons,
  getLesson,
  getUser,
  getUsers,
  editUser,
  editUserPassword,
  addUser,
  addLesson,
  getMenu,
  getMenus,
  addMenu,
  deleteMenu,
  deleteLesson,
  editLesson,
  editMenu,
}
