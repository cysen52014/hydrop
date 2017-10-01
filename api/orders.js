const mongoose = require('../db/mongoose')
const Orders = require('../db/models/orders')
const moment = require('moment')
const Address = require('../db/models/address')

exports.OrdersInsert = (req, res, next) => {
    var uid = req.body.uid.split(":")[1].replace(/\"/ig, ''),
        aid = req.body.aid,
        totalPrice = req.body.totalPrice,
        orders = req.body.orders;

    //console.log('aaa', req.body.orders)

    if (orders.length > 0) {
        Orders.findOneAsync({ user: uid, address: aid }).then(result => {
            var ok = false;

            if (!result) {

                Orders.createAsync({
                    user: uid,
                    address: aid,
                    orders: orders,
                    totalPrice: totalPrice,
                    creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
                    timestamp: moment().format('X')
                }).then(() => {
                    res.json({
                        code: 200,
                        message: "您的订单已经提交，请您等待客服人员查收"
                    })
                })
            } else {
                let arr = [];
                let r = [];
                result.orders.forEach(function(item, index) {
                    orders.forEach(function(item2, i) {
                        if (item._id == item2._id) {
                            item2.num = item.num + item2.num;
                            arr.push(item2);
                            result.orders.splice(index, 1);
                            orders.splice(i, 1);

                        }
                    });
                    r = [result.orders, arr, orders]
                });

                Promise.all(r).then(es => {

                    let orders = es[0].concat(es[1], es[2]);

                    Orders.updateAsync({ user: uid, address: aid }, {
                            '$set': {
                                orders: orders,
                                totalPrice: totalPrice,
                                creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
                                timestamp: moment().format('X')
                            }
                        })
                        .then(() => {
                            res.json({
                                code: 200,
                                message: "您的订单已经提交，请您等待客服人员查收"
                            })
                        })
                })

                // let b = await getOrders();
                // console.log(b)

                // var ra = result.orders.concat(arr);
                // orders = orders.concat(ra);



            }


        }).catch(err => {
            res.json({
                code: -200,
                message: '订单提交失败，请检测您的网络问题'
            })
        })
    } else {
        res.json({
            code: -200,
            message: "请您输入商品数量"
        })
    }
}



exports.getAllOrders = (req, res, next) => {
    Promise.all([
        Orders.find().sort('-_id').populate('address user'),
        Orders.countAsync()
    ]).then(result => {
        if (result) {
            res.json({
                code: 200,
                data: result,
                message: "订单信息获取成功"
            })
        } else {
            res.json({
                code: -200,
                message: "没有订单信息"
            })
        }
    })
}


exports.deletOrders = (req, res, next) => {
    let id = req.body.id;
    Promise.all([
        Orders.remove({ _id: id }),
        Orders.countAsync()
    ]).then(result => {
        res.json({
            code: 200,
            message: "删除订单成功"
        })
    })
}