var mongoose = require('../mongoose')
var Schema = mongoose.Schema 
var ObjectId = Schema.Types.ObjectId
var Promise = require('bluebird')


var CartSchema = new Schema({
    kid : String,
    uid: String,
    creat_date: String,
    timestamp: Number
})

var Cart = mongoose.model('Cart', CartSchema)
Promise.promisifyAll(Cart)
Promise.promisifyAll(Cart.prototype)

module.exports = Cart

