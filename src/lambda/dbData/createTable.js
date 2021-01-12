const AWS = require('aws-sdk')
const config = require('./dbConfig.js')

AWS.config.update(config.devConfigs.aws_config)

var dynamodb = new AWS.DynamoDB()
const createString = (name) => ({
  AttributeName: name,
  AttributeType: 'S',
})
const createSchema = (attributeName, KeyType) => ({
  AttributeName: attributeName,
  KeyType: KeyType,
})
const createTableParams = {
  AttributeDefinitions: [createString('id'), createString('name')],
  KeySchema: [createSchema('id', 'HASH'), createSchema('name', 'RANGE')],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  TableName: 'lessons',
}

dynamodb.createTable(createTableParams, function (err, data) {
  if (err && err.code === 'ResourceInUseException')
    console.log(
      'Table' + ' ' + createTableParams.TableName + ' ' + 'already exists'
    )
  else if (err) console.log(err, err.stack)
  else console.log(data)
})

var createItemsParam = {
  Item: {
    id: {
      S: 'a',
    },
    name: {
      S: 'Letra A',
    },
    elements: {
      L: [
        {
          M: {
            audioUrls: { L: [{ S: '1.m4a' }] },
            correctLetters: { NULL: true },
            description: {
              S:
                'Cada letra tem forma e tem som. A forma é a escrita da letra, o som é como falamos ela.',
            },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Audio' },
            words: { NULL: true },
          },
        },
        {
          M: {
            audioUrls: { L: [{ S: '2.m4a' }] },
            correctLetters: { NULL: true },
            description: { S: 'Essa aqui é a forma da letra A' },
            letter: { S: 'A' },
            text: { NULL: true },
            type: { S: 'LetterAndAudio' },
            words: { NULL: true },
          },
        },
        {
          M: {
            audioUrls: { L: [{ S: '3.m4a' }] },
            correctLetters: { NULL: true },
            description: {
              S: 'Existem dois sons para a letra A. O som á e o som ã.',
            },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Audio' },
            words: { NULL: true },
          },
        },
        {
          M: {
            audioUrls: { L: [{ S: '4.m4a' }] },
            correctLetters: { NULL: true },
            description: {
              S:
                'Veja bem o movimento da minha boca quando eu falo os sons da letra A e repita comigo.',
            },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Audio' },
            words: { NULL: true },
          },
        },
        {
          M: {
            correctLetters: { NULL: true },
            description: { S: 'Boca falando o som "á"' },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Video' },
            urlVideo: { S: '5.mp4' },
            words: { NULL: true },
          },
        },
        {
          M: {
            correctLetters: { NULL: true },
            description: { S: 'Boca falando o som "ã"' },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Video' },
            urlVideo: { S: '6.mp4' },
            words: { NULL: true },
          },
        },
        {
          M: {
            audioUrls: { L: [{ S: '7.m4a' }] },
            correctLetters: { NULL: true },
            description: {
              S:
                'A palavra Anjo começa com a letra A, e o som da letra é "ã". Fale em voz alta algumas palavras que você conhece com o som Ã.',
            },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Audio' },
            words: { NULL: true },
          },
        },
        {
          M: {
            audioUrls: { L: [{ S: '8.m4a' }] },
            correctLetters: { NULL: true },
            description: {
              S:
                'A palavra Água começa com a letra A e o som é "Á". Você conhece palavras que começam com o som Á?',
            },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Audio' },
            words: { NULL: true },
          },
        },
        {
          M: {
            audioUrls: {
              L: [{ S: '9.m4a' }, { S: '10.m4a' }, { S: '11.m4a' }],
            },
            correctLetters: { NULL: true },
            description: {
              S:
                'Agora vou falar algumas palavras. Repita cada palavra que você ouvir em voz alta e aperte nessa imagem (imagem aparece) se a palavra iniciar com a letra A. (aparece a primeira imagem, começa o segundo áudio) E aperte nessa imagem se a palavra não iniciar com a letra A. (aparece a segunda imagem, começa o terceiro áudio) Caso a resposta esteja certa, a imagem vai ficar verde. Se for a resposta errada, a imagem vai ficar vermelha.',
            },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'CheckFirstLetter' },
            words: {
              L: [
                {
                  M: {
                    startsWithTheLetter: { BOOL: false },
                    urlRightAnswerExplanation: { S: 'sininho.m4a' },
                    urlWord: { S: '12.m4a' },
                    urlWrongAnswerExplanation: { S: '13.m4a' },
                    word: { S: 'beleza' },
                  },
                },
                {
                  M: {
                    startsWithTheLetter: { BOOL: true },
                    urlRightAnswerExplanation: { S: 'sininho.m4a' },
                    urlWord: { S: '14.m4a' },
                    urlWrongAnswerExplanation: { S: '15.m4a' },
                    word: { S: 'alimento' },
                  },
                },
                {
                  M: {
                    startsWithTheLetter: { BOOL: true },
                    urlRightAnswerExplanation: { S: 'sininho.m4a' },
                    urlWord: { S: '16.m4a' },
                    urlWrongAnswerExplanation: { S: '17.m4a' },
                    word: { S: 'ancião' },
                  },
                },
                {
                  M: {
                    startsWithTheLetter: { BOOL: false },
                    urlRightAnswerExplanation: { S: 'sininho.m4a' },
                    urlWord: { S: '18.m4a' },
                    urlWrongAnswerExplanation: { S: '19.m4a' },
                    word: { S: 'feliz' },
                  },
                },
                {
                  M: {
                    startsWithTheLetter: { BOOL: true },
                    urlRightAnswerExplanation: { S: 'sininho.m4a' },
                    urlWord: { S: '20.m4a' },
                    urlWrongAnswerExplanation: { S: '21.m4a' },
                    word: { S: 'antônio' },
                  },
                },
                {
                  M: {
                    startsWithTheLetter: { BOOL: false },
                    urlRightAnswerExplanation: { S: 'sininho.m4a' },
                    urlWord: { S: '22.m4a' },
                    urlWrongAnswerExplanation: { S: '23.m4a' },
                    word: { S: 'camisa' },
                  },
                },
                {
                  M: {
                    startsWithTheLetter: { BOOL: true },
                    urlRightAnswerExplanation: { S: 'sininho.m4a' },
                    urlWord: { S: '24.m4a' },
                    urlWrongAnswerExplanation: { S: '25.m4a' },
                    word: { S: 'amigo' },
                  },
                },
                {
                  M: {
                    startsWithTheLetter: { BOOL: false },
                    urlRightAnswerExplanation: { S: 'sininho.m4a' },
                    urlWord: { S: '26.m4a' },
                    urlWrongAnswerExplanation: { S: '27.m4a' },
                    word: { S: 'casa' },
                  },
                },
              ],
            },
          },
        },
        {
          M: {
            audioUrls: { L: [{ S: '28.m4a' }] },
            correctLetters: { NULL: true },
            description: { S: 'Veja como se escreve a letra A' },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Audio' },
            words: { NULL: true },
          },
        },
        {
          M: {
            correctLetters: { NULL: true },
            description: { S: 'Vídeo com a escrita da letra A' },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Video' },
            urlVideo: { S: '29.mp4' },
            words: { NULL: true },
          },
        },
        {
          M: {
            audioUrls: { L: [{ S: '30.m4a' }] },
            correctLetters: { NULL: true },
            description: {
              S:
                'Para você aprender é importante exercitar. Escreva no seu cadernoa a letra A pelo menos 7 vezes.',
            },
            letter: { NULL: true },
            text: { NULL: true },
            type: { S: 'Audio' },
            words: { NULL: true },
          },
        },
        {
          M: {
            audioUrls: { L: [{ S: '31.m4a' }] },
            correctLetters: { L: [{ S: 'a' }] },
            description: {
              S:
                'Será que você já está sabendo identificar a letra A nas palavras? No texto abaixo clique em todas as palavras que começam com A (Se você acertar, ela vai ficar verde, senão, ela vai ficar vermelha)',
            },
            letter: { NULL: true },
            text: {
              S:
                'Arabela abria\n a janela.\nCarolina erguia\na cortina.\nE Maria olhava\ne sorria:\n"Bom dia!"',
            },
            type: { S: 'ClickLetterInTheTextTask' },
            words: { NULL: true },
          },
        },
      ],
    },
  },
  TableName: 'lessons',
}

const createItems = () => {
  dynamodb.putItem(createItemsParam, function (err, data) {
    if (err) console.log(err, err.stack)
    else console.log('Item created successfully', data)
  })
}

var tableExistsParams = {
  TableName: 'lessons',
}

dynamodb.waitFor('tableExists', tableExistsParams, createItems)
