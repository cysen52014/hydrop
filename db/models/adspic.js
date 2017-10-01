var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')


var AdsPicSchema = new Schema({
    link: String,
    pictureUrl: String,
    show: Boolean,
    sort: Number,
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

var AdsPic = mongoose.model('AdsPic', AdsPicSchema)
Promise.promisifyAll(AdsPic)
Promise.promisifyAll(AdsPic.prototype)

module.exports = AdsPic