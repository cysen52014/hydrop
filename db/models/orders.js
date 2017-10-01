var mongoose = require('../mongoose')
var Schema = mongoose.Schema 
var ObjectId = Schema.Types.ObjectId
var Promise = require('bluebird')

var OrdersSchema = new Schema({
	address : {
        type: ObjectId,
        ref: 'Address'
    },
    user: {
        type: ObjectId,
        ref: 'FUsers'
    },
    orders: Array,
    totalPrice: Number,
    creat_date: String,
    timestamp: Number
})

var Orders = mongoose.model('Orders', OrdersSchema)
Promise.promisifyAll(Orders)
Promise.promisifyAll(Orders.prototype)

module.exports = Orders