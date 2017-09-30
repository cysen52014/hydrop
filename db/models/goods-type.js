var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var GoodsTypeSchema = new Schema({
    type : String,
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

var GoodsType = mongoose.model('GoodsType', GoodsTypeSchema)
Promise.promisifyAll(GoodsType)
Promise.promisifyAll(GoodsType.prototype)


module.exports = GoodsType
