const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const User = mongoose.model('User', userSchema)

module.exports = User