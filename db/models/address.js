var mongoose = require('../mongoose')
var Schema = mongoose.Schema 
var ObjectId = Schema.Types.ObjectId
var Promise = require('bluebird')

var AddressSchema = new Schema({
	name : String,
    phone : String,
    address : String,
    user: {
        type: ObjectId,
        ref: 'FUsers'
    },
    select : Boolean,
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

var Address = mongoose.model('Address', AddressSchema)
Promise.promisifyAll(Address)
Promise.promisifyAll(Address.prototype)

module.exports = Address

