// const express = require('express')
import * as express from 'express'
import * as http from 'http'
import * as io from 'socket.io'
import * as path from 'path'
import * as logger from 'morgan'
// const wssController = require('./controllers/ws')
import { wssController } from './controllers/wssController'

// define port for the express app
const port = process.env.PORT || 3000

// create express app
const app = express()
let used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

// create the httpsever with the express app
const server = http.createServer(app)
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

const wss = io(server)
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

app.use(logger('common'))
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

const __dirname = path.resolve(path.dirname(''))
const DIST_DIR = path.join(__dirname, 'build')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

// handle all static file requests
app.use(express.static(DIST_DIR))

app.get('*', (req: express.Request, res: express.Response) => {
  console.log('req', req)
  res.sendFile(HTML_FILE)
})

wssController(wss)

server.listen(port, () => {
  console.log('App listening on port: ' + port);
})
used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);