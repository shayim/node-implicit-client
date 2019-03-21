const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  bank: {
    type: String,
    required: true
  },
  accountNum: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
})
