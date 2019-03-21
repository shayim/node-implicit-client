const mongoose = require('mongoose')
const BankAccount = require('./shared/bankAccount')
const Address = require('./shared/address')

const clientSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ['person', 'company'],
    default: 'person',
    index: true
  },
  clientId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  names: {
    type: [String],
    index: true
  },
  roles: {
    type: [String],
    index: true
  },
  mobiles: [String],
  emails: [String],
  phones: [String],
  addresses: [Address],
  bankAccounts: [BankAccount]
})

module.exports = mongoose.model('Client', clientSchema)
