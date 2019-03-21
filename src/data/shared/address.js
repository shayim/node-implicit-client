const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: String,
  country: String,
  postCode: String
})
