const mongoose = require('mongoose')

const filmSchema = mongoose.Schema({
  description: Object,
  showings: Object
})

module.exports = mongoose.model('film', filmSchema)
