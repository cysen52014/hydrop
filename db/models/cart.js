var mongoose = require('../mongoose')
var Schema = mongoose.Schema 
var Promise = require('bluebird')


var CartSchema = new Schema({
    kid : String
})

var Cart = mongoose.model('Cart', CartSchema)
Promise.promisifyAll(Cart)
Promise.promisifyAll(Cart.prototype)

module.exports = Cart

