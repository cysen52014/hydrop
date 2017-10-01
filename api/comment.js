const mongoose = require('../db/mongoose')
const Comment = require('../db/models/comment')
const moment = require('moment');

exports.CommentInsert = (req, res, next) => {
  let uid = req.body.uid.from.split(":")[1].replace(/\"/ig, ''),
    u;

  let gid = req.body.gid;
  let c = req.body.content;

  if (c == '') {
    res.json({
      code: -200,
      message: '请输入评论内容'
    })
    return false;
  }

  if (req.body.uid.replay) {
    let rid = req.body.uid.replay.id;
    let user = req.body.uid.replay.user;
    u = {
      from: uid,
      replay: {
        user: rid
      }
    }
  } else {
    u = {
      from: uid,
      replay: {
        user: {}
      }
    }
  }

  Comment.createAsync({
    user: u,
    goods: gid,
    content: c,
    creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
    timestamp: moment().format('X')
  }).then((r) => {
    res.json({
      code: 200,
      data: r,
      message: '评论成功'
    })
  })
}

exports.CommentsPull = (req, res, next) => {
  let gid = req.body.gid;
  let page = req.body.page;
  let limit = req.body.limit;

  page = parseInt(page, 10)
  limit = parseInt(limit, 10)
  if (!page) page = 1
  if (!limit) limit = 10
  var skip = (page - 1) * limit

  Promise.all([
    Comment.find({
      goods: gid
    }).populate('goods user.from user.replay.user').sort('-_id').skip(skip).limit(limit).exec(),
    Comment.countAsync()
  ]).then(result => {
    if (result) {
      let total = result[1];
      let totalPage = Math.ceil(total / limit)
      res.json({
        code: 200,
        data: {
          list: result[0],
          total,
          hasNext: totalPage > page ? 1 : 0,
          hasPrev: page > 1 ? 1 : 0
        },
        message: '获取评论成功'
      })
    }
  })
}
