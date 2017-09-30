var mongoose = require('../mongoose')
var Schema = mongoose.Schema 
var Promise = require('bluebird')


var GoodsSchema = new Schema({
    name : String,
    type : String,
    describe : String,
    preview : String,
    price : String,
    score : Number,   
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

var Goods = mongoose.model('Goods', GoodsSchema)
Promise.promisifyAll(Goods)
Promise.promisifyAll(Goods.prototype)

module.exports = Goods

