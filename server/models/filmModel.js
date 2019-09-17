const mongoose = require('mongoose')

const filmSchema = mongoose.Schema({
  general: {
    name: String,
    url: String,
    description_full: String,
    description_short: String,
    trailer: String,
    image_desktop: String,
    image_mobile: String
  },
  showings: Array
})

module.exports = mongoose.model('film', filmSchema)
