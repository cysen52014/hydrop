var mongoose = require('../mongoose')
var Schema = mongoose.Schema 
var Promise = require('bluebird')


var UsersSchema = new Schema({
    username : String,
    password : String, 
    email : String, 
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

var Users = mongoose.model('Users', UsersSchema)
Promise.promisifyAll(Users)
Promise.promisifyAll(Users.prototype)

module.exports = Users

