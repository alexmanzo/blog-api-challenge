const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const { PORT, DATABASE_URL } = require('./config')

const app = express()

const BlogPostsRouter = require('./blog-posts-router')

app.use(morgan('common'))

app.use('/posts', BlogPostsRouter)

let server;

function runServer(databaseUrl, port = PORT) {
  mongoose.connect(databaseUrl, err => {
    if (err) {
      return reject(err)
    }
  })
  server = app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`)
    resolve()
  })
  .on('error', err => {
    if (err) {
      mongoose.disconnect()
      reject(err)
    }
  })
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server')
      server.close(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

