const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  // author: {
  //   type: String,
  //   minlength: 3
  // },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

// schema.options.toJSON = {
//   transform: function(doc, ret) {
//     ret.id = ret._id;
//     console.log('ret.id', ret.id)
//     delete ret._id;
//     // delete ret.__v;
//   }
// };

module.exports = mongoose.model('Book', schema)
