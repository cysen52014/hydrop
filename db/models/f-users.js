var mongoose = require('../mongoose')
var Schema = mongoose.Schema 
var Promise = require('bluebird')


var FUsersSchema = new Schema({
    username : String,
    password : String, 
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

var FUsers = mongoose.model('FUsers', FUsersSchema,'Fusers')
Promise.promisifyAll(FUsers)
Promise.promisifyAll(FUsers.prototype)

module.exports = FUsers

