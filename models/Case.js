const mongoose = require('mongoose')
const Schema = mongoose.Schema

let caseSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    judge: {
      type: String,
    },
  },
  {
    collection: 'cases',
  },
)

module.exports = mongoose.model('Case', caseSchema)
