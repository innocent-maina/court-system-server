const mongoose = require('mongoose')
const Schema = mongoose.Schema

let judgeSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  {
    collection: 'judges',
  },
)

module.exports = mongoose.model('Users', judgeSchema)
