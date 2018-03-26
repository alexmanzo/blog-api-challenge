const express = require('express')
const morgan = require('morgan')

const app = express()

const BlogPostsRouter = require('./blog-posts-router')

app.use(morgan('common'))

app.use('/blog-posts', BlogPostsRouter)

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

