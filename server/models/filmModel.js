const mongoose = require('mongoose')

const filmSchema = mongoose.Schema({
  description: {
    name: String,
    url: String,
    description_full: String,
    description_short: String,
    trailer: String,
    image_desktop: String,
    image_mobile: String
  },
  showings: Object
})

module.exports = mongoose.model('film', filmSchema)
