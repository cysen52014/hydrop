var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new Schema({
    user: {
        from : {
            type: ObjectId,
            ref: 'FUsers'
        },
        replay : {
            user: {
                type: ObjectId,
                ref: 'FUsers'
            }
        }
    },
    goods: {
        type: ObjectId,
        ref: 'Goods'
    },
    content: String,
    creat_date: String,
    timestamp: Number
})

var Comment = mongoose.model('Comment', CommentSchema)
Promise.promisifyAll(Comment)
Promise.promisifyAll(Comment.prototype)

module.exports = Comment
