var mongoose = require('../mongoose')
var Schema = mongoose.Schema 
var ObjectId = Schema.Types.ObjectId
var Promise = require('bluebird')


var DetailSchema = new Schema({
    goods : {
        type: ObjectId,
        ref: 'FUsers'
    },
    content : String,
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

var Detail = mongoose.model('Detail', DetailSchema)
Promise.promisifyAll(Detail)
Promise.promisifyAll(Detail.prototype)

module.exports = Detail