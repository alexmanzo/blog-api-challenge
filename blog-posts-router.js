const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const {BlogPosts} = require('./models')

router.get('/', (req, res) => {
  BlogPost
    .find()
    .limit(10)
    .then(blogposts => {
      res.json({
        posts: blogposts.map(
          (blogpost => blogpost.serialize()))
      })
    .catch(err => {
      console.error(err)
      res.status(500).josn({message: 'Internal server error'})
    })
    } )
})

router.get('/:id', (req, res) => {
  BlogPost
  .findbyId(req.params.id)
  .then(blogpost => res.json(blogpost.serialize()))
  .catch(err => {
    console.error(err)
    res.status(500).json({message: 'internal server error'})
  })
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
  BlogPost
  .create({
    title: req.body.title,
    content: req.body.content,
    author: {
      firstName: req.body.author.firstName,
      lastName: req.body.author.lastName
    }
  })
  .then(blogpost => res.status(201).json(restaurant.serialize()))
  .catch(err => {
    console.error(err)
    res.status(500).json({message: 'Internal server error'})
  })
})

router.put('/:id', (req, res) => {
  if (req.paramsid !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`)
      console.error(message)
      return res.status(400).send(message)
  }
  console.log(`Updating blog post\`${req.params.id}\``)
  const toUpdate = {}
  const updatableFields = ['title', 'content', 'author']

  updatableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field]
    }
  })
  BlogPost
    .findByIdAndUpdate(req.params.id, { $set : toUpdate } )
    .then(blogpost => res.status(201).json(blogpost.serialize()))
    .catch(err => res.status(500).json({ message: 'Internal server error' }))
})


router.delete('/:id', (req, res) => {
  BlogPost
    .findByIdAndRemove(req.params.id)
    .then(blogpost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }))
})



module.exports = router