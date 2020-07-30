const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let analytic = new Schema({
   url: {
      type: String
   },
   counter: {
      type: Number,
      default: 0,
      required: true
   }
})

module.exports = mongoose.model('analytic', analytic)