// const express = require('express')
import express from 'express'
import http from 'http'
import io from 'socket.io'
import path from 'path'
import logger from 'morgan'
// const wssController = require('./controllers/ws')
import { wssController } from './controllers/wssController'

// define port for the express app
const port = process.env.PORT || 3000

// create express app
const app = express()

// create the httpsever with the express app
const server = http.createServer(app)

const wss = io(server)

app.use(logger('common'))

const __dirname = path.resolve(path.dirname(''))
const DIST_DIR = path.join(__dirname, 'build')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

// handle all static file requests
app.use(express.static(DIST_DIR))

app.get('*', (req: express.Request, res: express.Response) => {
  // console.log('req', req)
  res.sendFile(HTML_FILE)
})

wssController(wss)

server.listen(port, () => {
  console.log('App listening on port: ' + port);
})