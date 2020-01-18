import express from 'express'
import path from 'path'

const app = express()

const port = process.env.PORT || 3000

const __dirname = path.resolve(path.dirname(''))
const DIST_DIR = path.join(__dirname, 'build')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

// handle all static file requests
app.use(express.static(DIST_DIR))

app.get('*', (req, res) => {
  console.log('req', req)
  res.sendFile(HTML_FILE)
})

app.listen(port, () => {
  console.log('App listening on port: ' + port);
})