const mongoose = require('../db/mongoose') 
const Goods = require('../db/models/goods')
const GoodsType = require('../db/models/goods-type')
const Cart = require('../db/models/cart')

const general = require('./general')
const formidable = require("formidable");  
const uuid = require('uuid');
const fs = require('fs');
const moment = require('moment');

const getListByType = general.getListByType
const getById = general.getById
const clipImages = general.clipImages;
const deletes = general.deletes;
const toatalList = general.toatalList
const GoodsValidte = general.GoodsValidte
//front api 

// exports.getList = function (req, res) {
// 	 getList(req, res, Goods)
// }

// exports.getById = function (req, res) {
//     getById(req, res, Goods)
// }

exports.insert = (req, res, next) => {
   
    GoodsValidte(req, res, function (result1) {
        // body...
        Goods.findOneAsync({ type:result1.type,name:result1.name }).then(result => {
            if (result) {
                res.json({
                    code : -200,
                    message : "商品已存在"
                })
                return;
            }
            Goods.createAsync({
                type : result1.type,
                name : result1.name,
                describe : result1.describe,
                price : result1.price,
                preview : result1.preview,
                creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
                is_delete: 0,
                timestamp: moment().format('X')
            }).then(() => {
                res.json({
                    code : 200,
                    message : "商品创建成功"
                })
            })
        }).catch(err => {
                res.json({
                    code : -200,
                    message : "商品创建失败"
                })
        })
    });

    
}


exports.updata = (req, res, next) => {
    GoodsValidte(req, res, function (result1) {
        Goods.updateAsync({ _id:result1.sid }, { '$set': {
                type : result1.type,
                name : result1.name,
                describe : result1.describe,
                price : result1.price,
                preview : result1.preview,
                creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
                is_delete: 0,
                timestamp: moment().format('X')
            } 
        }).then(() => {
            res.json({
                code: 200,
                message: '商品修改成功',
                data: 'success'
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: "商品修改失败"
            })
        })
    })
}

exports.uploadPicture = function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://cys520.cn:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var form = new formidable.IncomingForm();  
    form.uploadDir='tmp';
    
    form.parse(req, function(err, fields, files) {  

        
        if(err || !files.files){
            res.json({
              succeed : false,
              code : -200,
              message : "上传失败"
            })
            return; 
        }

        if (files.files.size > 16*1024*1024){
           res.json({
              succeed : false,
              code : -200,
              message : "文件不要超过16Mb"
           })
           return 
        }
 
        var old_path = files.files.path; 
        var name = uuid.v1();
        var type =  files.files.type.replace(/image\//ig,'');

        switch(type){
            case 'jpeg':
              name = name+'.jpeg';
              break;
            case 'jpg':
              name = name+'.jpg';
              break;
            case 'png':
              name = name+'.png';
              break;
            case 'gif':
              name = name+'.gif';
              break;
        }

        var new_path = old_path;

        clipImages(req,res,new_path,name,fields)

        // mkdirs(new_path,0777,req,res,fields,function () {
        //     fs.rename(old_path,new_path+name, function(err) {  

        //          if (err) {
        //             res.json({
        //                  code: -200,
        //                  message: err
        //             })
        //             return;
        //          }

                 
                 
        //     })
        // }) 
    }); 
}


exports.getGoodByIdAsync = (req, res , next) => {
    getById(req, res, Goods)
}


exports.insertGoodTypeAsync = function (req, res) { 
    var typeValue = req.body.goodsTypeName; 
    if (!typeValue) {
        res.json({
            code : -200,
            message : "输入产品类型名称"
        })
        return;
    }
    GoodsType.findOneAsync({ type:typeValue}).then(result => { 
        if (result) {
            res.json({
                code : -200,
                message : "商品类型已存在"
            })
            return;
        }
        GoodsType.createAsync({
            type : typeValue,
            creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
            is_delete: 0,
            timestamp: moment().format('X')
        }).then(() => {
            res.json({
                code : 200,
                message : "商品类型创建成功"
            })
        }).catch(err => {
                res.json({
                    code : -200,
                    message : "商品类型创建失败"
                })
        })
    })
}

exports.addToCart = (req, res, next) => {
    var id = req.body.id,
        userid = req.body.userid
    if (!id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Cart.findOneAsync({ kid: id ,uid : userid }).then(result => {
        if (result) {
            res.json({
                code : -200,
                message : "商品已在购物车"
            })
            return;
        }

        Cart.createAsync({
            kid : id,
            uid : userid
        }).then(() => {
            res.json({
                code : 200,
                message : "商品加入购物车成功"
            })
        })

    }).catch(err => {
        res.json({
            code: -200,
            message: '失败'
        })
    })
}


exports.getCartId = (req, res, next) => {

}

exports.getByIdGroup = (req, res, next) => {
    var idGroup = req.body.BuyGoodsList
    if (!idGroup) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }

    Promise.all([
        Goods.find({_id:idGroup}).sort('-_id').exec()
    ]).then(result => { console.log('ecv',result)
        if(result){
            res.json({
                code: 200,
                data: result
            })
        }
    }).catch(err => {
        res.json({
            code: -200,
            message: '失败'
        })
    })
}


exports.deleteGoodseAsync = (req, res , next) => {
    deletes(req, res, Goods)
}

exports.showGoodsListAsync = (req, res , next) => {
    toatalList(req, res, Goods);
}

exports.getGoodType = (req, res , next) => { 
    toatalList(req, res, GoodsType);
}

exports.getGoodByTypeIdAsync = (req, res , next) => {
    var _type = req.body.type

    if (!_type) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    getListByType(req, res ,Goods);
    // Goods.findOneAsync({ type: _type }) .then(result => {
    //     console.log('eccc',result)
    //     res.json({
    //         code: 200,
    //         data: result
    //     })
    // }).catch(err => {
    //     res.json({
    //         code: -200,
    //         message: '失败'
    //     })
    // })
}