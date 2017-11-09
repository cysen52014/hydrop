/**
 * 通用列表
 * @method list
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @return {[type]}         [description]
 */
const fs = require('fs');
const path = require("path");
const gm = require('gm');

exports.getListByType = (req, res, mongoDB) => {
  var limit = req.body.limit,
    page = req.body.page,
    _type = req.body.type

  page = parseInt(page, 10)
  limit = parseInt(limit, 10)
  if (!page) page = 1
  if (!limit) limit = 10
  var skip = (page - 1) * limit

  Promise.all([
    mongoDB.find({
      type: _type
    }).sort('-_id').skip(skip).limit(limit).exec(),
    mongoDB.countAsync()
  ]).then(result => {
    var total = result[1]
    var totalPage = Math.ceil(total / limit)
    var json = {
      code: 200,
      message: "获取商品成功",
      data: {
        list: result[0],
        total,
        hasNext: totalPage > page ? 1 : 0,
        hasPrev: page > 1 ? 1 : 0
      }
    }
    res.json(json)
  }).catch(err => {
    res.json({
      code: -200,
      message: err
    })
  })
}

/**
 * 通用单个
 * @method item
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} mongoDB [description]
 * @return {[type]}         [description]
 */
exports.getById = (req, res, mongoDB) => {
  var id = req.body.id
  if (!id) {
    res.json({
      code: -200,
      message: '参数错误'
    })
  }
  mongoDB.findOneAsync({
    _id: id
  }).then(result => {
    res.json({
      code: 200,
      data: result
    })
  }).catch(err => {
    res.json({
      code: -200,
      message: err
    })
  })
}




function mkdirs(dirname, mode, req, res, fields, callback) {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback();
    } else {
      console.log(path.dirname(dirname));
      mkdirs(path.dirname(dirname), mode, function () {
        fs.mkdir(dirname, mode, callback);
      });
    }
  });
}

exports.clipImages = (req, res, url, name, clip) => {
  console.log(clip)
  if (JSON.stringify(clip) != "{}") {
    gm(url)
      .crop(clip.toCropImgW, clip.toCropImgH, clip.toCropImgX, clip.toCropImgY)
      .quality(65)
      .strip()
      .autoOrient()
      .write("public/uploads/biger_" + name,
        function (err) {
          if (err) {
            res.json({
              code: -200,
              message: err
            });
          } else {
            gm("public/uploads/biger_" + name)
              .resize(200, null) //设置压缩后的w/h
              .strip()
              .autoOrient()
              .write("public/uploads/small_" + name,
                function (err) {
                  if (err) {
                    res.json({
                      code: -200,
                      message: err
                    });
                  } else {
                    res.json({
                      code: 200,
                      message: '上传成功',
                      data: {
                        smallUrl: "/uploads/small_" + name,
                        bigerUrl: "/uploads/biger_" + name,
                        width: clip.toCropImgW,
                        height: clip.toCropImgH
                      }
                    });
                  }
                })
          }
        })
  } else {
    gm(url)
      .resize(640, null) //设置压缩后的w/h
      .quality(65)
      .strip()
      .autoOrient()
      .write("public/uploads/ac_" + name,
        function (err) { console.log('scd',err)
          if (err) {
            res.json({
              code: -200,
              message: err
            });
          } else {
            res.json({
                code: 200,
                message: '上传成功',
                data: {
                  bigerUrl: "/uploads/ac_" + name
                }
            });
          }
        })
  }

}

exports.mkdirs = mkdirs;


/**
 * 通用删除
 * @method flagDelete
 * @param  {[type]}   req     [description]
 * @param  {[type]}   res     [description]
 * @param  {[type]}   mongoDB [description]
 * @return {[type]}           [description]
 */
exports.deletes = (req, res, mongoDB) => {
  var id = req.body.id;

  mongoDB.remove({
    _id: id
  }).then(result => {
    if (result) {
      res.json({
        code: 200,
        message: "商品删除成功"
      })
    } else {
      res.json({
        code: -200,
        message: "商品删除失败"
      })
    }
  })
}


exports.toatalList = (req, res, mongoDB) => {
  Promise.all([
    mongoDB.find().sort('-_id').exec(),
    mongoDB.countAsync()
  ]).then(result => {
    var total = result[1]
    //var totalPage = Math.ceil(total / limit)
    var json = {
      code: 200,
      data: {
        list: result[0],
        total
      }
    }
    res.json(json)
  }).catch(err => {
    res.json({
      code: -200,
      message: err
    })
  })
}


exports.GoodsValidte = (req, res, cb) => {
  var typeValue = req.body.typeValue,
    goodsName = req.body.goodsName,
    goodsDesc = req.body.goodsDesc,
    goodsPrice = req.body.goodsPrice,
    src = req.body.imageSrc.url,
    sid = req.body.sid;


  if (!typeValue) {
    res.json({
      code: -200,
      message: "选择商品类型"
    })
    return;
  }

  if (!goodsName) {
    res.json({
      code: -200,
      message: "填写商品名称"
    })
    return;
  }

  if (!goodsDesc) {
    res.json({
      code: -200,
      message: "填写商品简介"
    })
    return;
  }

  if (!goodsDesc) {
    res.json({
      code: -200,
      message: "填写商品价格"
    })
    return;
  }
  cb({
    sid: sid,
    type: typeValue,
    name: goodsName,
    describe: goodsDesc,
    price: goodsPrice,
    preview: src
  });
}

//接续cookie中的JSON字符序列
exports.JSONCookies = function (obj) {
  var cookies = Object.keys(obj);    //获取obj对象的property
  var key;
  var val;

  //循环判断并解析
  for (var i = 0; i < cookies.length; i++) {
    key = cookies[i];
    val = exports.JSONCookie(obj[key]);

    //如果是JSON字符序列则保存
    if (val) {
      obj[key] = val;
    }
  }

  return obj;
};

//解析JSON字符序列
exports.JSONCookie = function (str) {
  if (!str || str.substr(0, 2) !== 'j:') return; //判断是否为JSON字符序列，如果不是返回undefined

  try {
    return JSON.parse(str.slice(2));    //解析JSON字符序列
  } catch (err) {
    // no op
  }
};