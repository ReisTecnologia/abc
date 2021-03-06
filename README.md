### ABC Alfabetiza

## Automated start for dev environment (mac)

```
itermocil --here abc
```

To do so, you intall itermocil and use itermocil-sample-abc.yml:

```
mv ./itermocil-sample-abc.yml ~/.itermocil/abc.yml
```

## Docker

run

```
docker-compose up
```

or

```
or docker-compose up -d to run in background
```

at the root of the project

We have a docker-compose file to set up your development environment.
This sets up one docker container: A local version of the Dynamodb that runs on localhost:8000

## Environment setup

If you intend on using the local enviroment you have to include NODE_ENV=development in your run command

```
NODE_ENV=development
```

Otherwise the app is going to try to run with the enviroment variables configured on Netlify instead and without pointing to the localhost.

## VSCode lint

check this:
https://readwriteexercise.com/posts/setting-up-create-react-app-vs-code-eslint-prettier/

## install dynamodb-admin to see local data

```
npm install -g dynamodb-admin
```

check this out: https://medium.com/swlh/a-gui-for-local-dynamodb-dynamodb-admin-b16998323f8e

run it with

```
DYNAMO_ENDPOINT=http://localhost:8000  AWS_ACCESS_KEY_ID=access_key_id AWS_SECRET_ACCESS_KEY=secret_access_key AWS_REGION=localhost dynamodb-admin
```

and see it on `http://localhost:8001/`

## start the local graphql backend dev server

```
NODE_ENV=development npm run start:lambda
```

create lessons table and fixtures

```
node src/lambda/dbData/createTable.js
```

see the graphql backend server on `http://localhost:9000/graphql`
and query it with a simple query:

```graphql
query {
  lessons {
    id
    name
  }
}
```

## start the local frontend dev server

```
npm start
```

and see it on

```
http://localhost:3000/
```

## configure remote db and bucket environment variables on Netlify

This project is setup using Netlify, meaning the enviroment variables used to grant the app access to the Dynamodb and S3 Bucket are configured on the Netlify. On the deploy settings you have to setup the appropriate value for your AWS Access Key ID and AWS Secret Key.

The variables are:

```
MY_AWS_DB_ACCESS_KEY_ID
```

with the value being your AWS Access Key ID for your Dynamodb.

```
 MY_AWS_DB_SECRET_ACCESS_KEY
```

with the value being your AWS Secret Key for your Dynamodb.

```
MY_AWS_BUCKET_ACCESS_KEY_ID
```

with the value being your AWS Access Key ID for your S3 Bucket.

```
MY_AWS_BUCKET_SECRET_ACCESS_KEY
```

with the value being your AWS Secret Key for your S3 Bucket.

```
MY_AWS_BUCKET_NAME
```

with the value being your AWS S3 Bucket name.

```
REACT_APP_MY_AWS_BUCKET_NAME
```

with the value being your AWS S3 Bucket name.

When running the local version of Dynamodb you can create a table with the table name: `lessons` and insert a mock lesson, by running the script `createTable.js` inside the folder `src/lambda/dbData/createTable.js` .

## AWS s3 Bucket configurations

In regards to Bucket permissions configs, its necessary to set your s3 Bucket policy and CORS policy to allow the application to interact with your Bucket using HTTP request methods. The configuration we recommend is the following:

For the Bucket policy:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YourBucketName/*"
        }
    ]
}
```

And for the Bucket CORS policy:

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

## Create-React-App-Lambda

This project is a reference demo showing you how to use [Create React App v3](https://github.com/facebookincubator/create-react-app) and [netlify-lambda v1](https://github.com/netlify/netlify-lambda) together in a [Netlify Dev](https://www.netlify.com/docs/cli/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex#netlify-dev-beta) workflow. You can clone this and immediately be productive with a React app with serverless Netlify Functions in the same repo. Alternatively you can deploy straight to Netlify with this one-click Deploy:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/create-react-app-lambda&utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex)

> ⚠️NOTE: You may not need this project at all. [Netlify Dev](https://github.com/netlify/netlify-dev-plugin) works with `create-react-app` out of the box! Only use `netlify-lambda` if you need a build step for your functions, eg if you want to use Babel or TypeScript ([see its README for details](https://github.com/netlify/netlify-lambda/blob/master/README.md#netlify-lambda)).

## Project Setup

**Source**: The main addition to base Create-React-App is a new folder: `src/lambda`. This folder is specified and can be changed in the `package.json` script: `"build:lambda": "netlify-lambda build src/lambda"`.

**Dist**: Each JavaScript file in there will be built for Netlify Function deployment in `/built-lambda`, specified in [`netlify.toml`](https://www.netlify.com/docs/netlify-toml-reference/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex).

As an example, we've included a small `src/lambda/hello.js` function, which will be deployed to `/.netlify/functions/hello`. We've also included an async lambda example using async/await syntax in `async-dadjoke.js`.

## Video

Learn how to set this up yourself (and why everything is the way it is) from scratch in a video: https://www.youtube.com/watch?v=3ldSM98nCHI

## Babel/webpack compilation

All functions (inside `src/lambda`) are compiled with webpack using Babel, so you can use modern JavaScript, import npm modules, etc., without any extra setup.

## Local Development

```bash
## prep steps for first time users
npm i -g netlify-cli # Make sure you have the [Netlify CLI](https://github.com/netlify/cli) installed
git clone https://github.com/netlify/create-react-app-lambda ## clone this repo
cd create-react-app-lambda ## change into this repo
yarn # install all dependencies

## done every time you start up this project
ntl dev ## nice shortcut for `netlify dev`, starts up create-react-app AND a local Node.js server for your Netlify functions
```

This fires up [Netlify Dev](https://www.netlify.com/docs/cli/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex#netlify-dev-beta), which:

- Detects that you are running a `create-react-app` project and runs the npm script that contains `react-scripts start`, which in this project is the `start` script
- Detects that you use `netlify-lambda` as a [function builder](https://github.com/netlify/netlify-dev-plugin/#function-builders-function-builder-detection-and-relationship-with-netlify-lambda), and runs the npm script that contains `netlify-lambda build`, which in this project is the `build:lambda` script.

You can view the project locally via Netlify Dev, via `localhost:8888`.

Each function will be available at the same port as well:

- `http://localhost:8888/.netlify/functions/hello` and
- `http://localhost:8888/.netlify/functions/async-dadjoke`

## Deployment

During deployment, this project is configured, inside `netlify.toml` to run the build `command`: `yarn build`.

`yarn build` corresponds to the npm script `build`, which uses `npm-run-all` (aka `run-p`) to concurrently run `"build:app"` (aka `react-scripts build`) and `build:lambda` (aka `netlify-lambda build src/lambda`).

## Typescript

<details>
  <summary>
    <b id="typescript">Click for instructions</b>
  </summary>

You can use Typescript in both your frontend React code (with `react-scripts` v2.1+) and your serverless functions (with `netlify-lambda` v1.1+). Follow these instructions:

1. `yarn add -D typescript @types/node @types/react @types/react-dom @babel/preset-typescript @types/aws-lambda`
2. convert `src/lambda/hello.js` to `src/lambda/hello.ts`
3. use types in your event handler:

```ts
import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

interface HelloResponse {
  statusCode: number
  body: string
}

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const params = event.queryStringParameters
  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      msg: `Hello world ${Math.floor(Math.random() * 10)}`,
      params,
    }),
  }

  callback(undefined, response)
}

export { handler }
```

rerun and see it work!

You are free to set up your `tsconfig.json` and `tslint` as you see fit.

</details>

**If you want to try working in Typescript on the client and lambda side**: There are a bunch of small setup details to get right. Check https://github.com/sw-yx/create-react-app-lambda-typescript for a working starter.

## Routing and authentication with Netlify Identity

For a full demo of routing and authentication, check this branch: https://github.com/netlify/create-react-app-lambda/pull/18 This example will not be maintained but may be helpful.

## Service Worker

`create-react-app`'s default service worker (in `src/index.js`) does not work with lambda functions out of the box. It prevents calling the function and returns the app itself instead ([Read more](https://github.com/facebook/create-react-app/issues/2237#issuecomment-302693219)). To solve this you have to eject and enhance the service worker configuration in the webpack config. Whitelist the path of your lambda function and you are good to go.
