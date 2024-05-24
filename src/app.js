// parse the .env file and inject it in the Node process
import 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'
import usersRouter from './resources/users/router.js'
import { jwtCheck } from './middlewares/auth.js'
import { requiredScopes } from 'express-oauth2-jwt-bearer'
import { errorHandler } from './middlewares/error.js'

const app = express()

// use the bodyParser middleware to parse json strings from request body
app.use(bodyParser.json())

// mounting the users routes, uses the jwtCheck middleware to authenticate the client
app.use('/users', jwtCheck, requiredScopes('all:users'), usersRouter)

// all other urls return 404 since they do not exist
app.get('*', (_, res) => res.status(404))

// middleware to handle various errors
app.use(errorHandler)

export default app
