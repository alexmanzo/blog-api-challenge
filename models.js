const mongoose = require('mongoose')

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const blogPostSchema = mongoose.Schema({
  id: {type: String},
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  created: Number
})

blogPostSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()
})



blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorString,
    created: this.created
  }
}


const BlogPost = mongoose.model('BlogPost', blogPostSchema)

module.exports = {BlogPost}