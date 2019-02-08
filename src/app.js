import http from 'http'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import { env, mongo, port, ip, apiRoot } from './config'



const app = express('', api)
const server = http.createServer(app)

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, () => {
    console.log(`Express server listening to the port ${port}`);
  })
})

export default app