const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const {BlogPosts} = require('./models')

BlogPosts.create('Learning Node', 'Learning node is an excellent adventure', 'Michelle Manzo')
BlogPosts.create('I should go to bed.', 'There is zero chance I should still be up working, but insomnia is what it is! At least I can say I was productive.', 'Michelle Manzo')

router.get('/', (req, res) => {
  res.json(BlogPosts.get())
})


router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author']
	for (let i=0; i<requiredFields.length; i++) {
	    const field = requiredFields[i]
	    if (!(field in req.body)) {
	      const message = `Missing \`${field}\` in request body`
	      console.error(message);
	      return res.status(400).send(message)
    }
  }
  const post = BlogPosts.create(req.body.title, req.body.content, req.body.author)
  res.status(201).json(post)
})


router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id)
	console.log(`Deleted blog post \`${req.params.ID}\``)
  	res.status(204).end()
})

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author']
	for (let i=0; i<requiredFields.length; i++) {
	    const field = requiredFields[i]
	    if (!(field in req.body)) {
	      const message = `Missing \`${field}\` in request body`
	      console.error(message);
	      return res.status(400).send(message)
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`)
    console.error(message)
    return res.status(400).send(message)
  }
  console.log(`Updating blog post \`${req.params.id}\``)
  const updatedPost = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,	
    publishData: req.body.PublishDate
  })
  res.status(200).json(updatedPost)
})


module.exports = router