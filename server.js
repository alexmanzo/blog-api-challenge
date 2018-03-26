const express = require('express')
const router = express.Router()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const {BlogPosts} = require('./models')

const app = express()

app.use(morgan('common'))

BlogPosts.create('Learning Node', 'Learning node is an excellent adventure', 'Michelle Manzo')

app.get('/blog-posts', (req, res) => {
	res.jsong(BlogPosts.get())
})


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

