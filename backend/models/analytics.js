const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

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
analytic.plugin(timestamps);
module.exports = mongoose.model('analytic', analytic)