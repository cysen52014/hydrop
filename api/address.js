const mongoose = require('../db/mongoose')
const Address = require('../db/models/address')
const moment = require('moment');

exports.addressInsert = (req, res, next) => {
    var name = req.body.name,
        phone = req.body.phone,
        address = req.body.address,
        _user = req.body._user.split(":")[1].replace(/\"/ig, '')

    if (name == '') {
        res.json({
            code: -200,
            message: '用户名不能为空'
        })
        return false;
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
        res.json({
            code: -200,
            message: '请输入正确的手机号码'
        })
        return false;
    }
    if (address == '') {
        res.json({
            code: -200,
            message: '请选择你的详细地址'
        })
        return false;
    }

    Address.find({ name: name, phone: phone, address: address }).populate('user', ['_id', 'username']).then(result => {
        if (result && result._id == _user) {
            res.json({
                code: -200,
                message: '你已经填写过相同的详细过地址'
            })
        } else {
            Address.createAsync({
                name: name,
                phone: phone,
                address: address,
                user: _user,
                select: false,
                creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
                is_delete: 0,
                timestamp: moment().format('X')
            }).then(() => {
                res.json({
                    code: 200,
                    message: '新地址添加成功'
                })
            })
        }
    })
}


exports.getUserAddress = (req, res, next) => {
    let id = req.body.id.split(":")[1].replace(/\"/ig, '');

    Address.find({}).populate('user', ['_id', 'username']).then(result => {

        let arr = [];
        if (result) {
            let aa = result.map(function(item, i) {
                if (item.user) {
                    if (item.user._id.toString() == id) {
                        arr.push(item);
                    }
                }

            })
            Promise.all(arr).then(r => {
                res.json({
                    code: 200,
                    data: r,
                    message: '请选择地址'
                });
            })
        } else {
            resolve({
                code: -200,
                message: '未添加收件人地址'
            })
        }

    })
}


exports.addressSelect = (req, res, next) => {
    var aid = req.body.aid;
    var select = req.body.select;
 
    Address.updateAsync({ _id: aid }, {
        '$set': {
            select: select,
            creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
            timestamp: moment().format('X')
        }
    }).then((result) => {
        res.json({
            code: 200,
            message: '收件地址已保存',
            data: result
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: "收件地址保存失败"
        })
    })
}