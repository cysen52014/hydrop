var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lydb',{useMongoClient : true})
mongoose.Promise = global.Promise
module.exports = mongoose
