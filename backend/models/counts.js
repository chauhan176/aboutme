const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let counts = new Schema({
    url:{
       type: String
    },
    name:{
      type: String
    },
    counter: {
       type : Number,
       default: 0
    },
    avgpermin:{
       type : Number,
       default: 0
    }
 })

 module.exports = mongoose.model('counts', counts)