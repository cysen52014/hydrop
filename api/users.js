const mongoose = require('../db/mongoose')
const users = require('../db/models/users')
const FUsers = require('../db/models/f-users')
const general = require('./general')
const moment = require('moment');
const md5 = require('md5')
var jwt = require('jsonwebtoken')
const verifi = require('../verifi')
const md5Pre = "!@#$%(*&^)"
const secret = "735859.3049610322"
const captchapng = require('captchapng2')
let codeMgs = ''

/**
 * 初始化时添加管理员
 * @method insertAdmin
 * @param  {[type]}    req  [description]
 * @param  {[type]}    res  [description]
 * @param  {Function}  next [description]
 * @return {json}         [description]
 */
exports.admininsert = (req, res, next) => {
    var email = req.body.email,
        password = req.body.userPwd,
        username = req.body.userName

    // if (fsExistsSync('./admin.lock')) {
    //     return res.render('admin-creat.html', {message: '请先把 admin.lock 删除'})
    // }
    // if (!username || !password || !email) {
    //     return res.render('admin-creat.html', { message: '请将表单填写完整' })
    // }


    verifi.VerifyTheuser({ username, password, email }, function(result) {
        if (!result) {
            users.findOneAsync({ username: username }).then(result2 => {
                if (result2) {
                    res.json({
                        code: -200,
                        message: '用户已存在'
                    })
                    return;
                }

                users.createAsync({
                    username: username,
                    password: md5(md5Pre + password),
                    email: email,
                    creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
                    is_delete: 0,
                    timestamp: moment().format('X')
                }).then(() => {
                    console.log('scc2')
                        //fs.writeFileSync('./admin.lock', username)
                    res.json({
                        code: 200,
                        message: '添加用户成功'
                    })
                })
            }).catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
        } else {
            res.json(result)
        }
    });


}


/**
 * 管理员登录
 * @method loginAdmin
 * @param  {[type]}   req [description]
 * @param  {[type]}   res [description]
 * @return {[type]}       [description]
 */
exports.adminLoginAsync = (req, res, next) => {
    var json = {},
        username = req.body.userName,
        password = req.body.userPwd

    if (username === '' || password === '') {
        json = {
            code: -200,
            message: '请输入用户名或密码'
        }
        return res.json(json)
    }
    users.findOneAsync({
            username: username,
            password: md5(md5Pre + password),
            is_delete: 0
        })
        .then(result => {
            if (result) {
                var id = result._id
                var remember_me = 3600000
                var token = jwt.sign({
                    id,
                    username
                }, secret, {
                    expiresIn: 60 * 60 * 1
                })
                res.cookie('b_user', token, { maxAge: remember_me })
                res.cookie('b_userid', id, { maxAge: remember_me })
                res.cookie('b_username', username, { maxAge: remember_me })
                return res.json({
                    code: 200,
                    message: '登录成功',
                    data: token
                })
            }
            return res.json({
                code: -200,
                message: '用户名或者密码错误'
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: '登录失败'
            })
        })
}

exports.frontUsersLogin = (req, res, next) => {
    var json = {},
        username = req.body.username,
        password = req.body.password,
        code = req.body.code

    if (username === '' || password === '') {
        json = {
            code: -200,
            message: '请输入用户名或密码'
        }
        return res.json(json)
    }

    if (code === '') {
        json = {
            code: -200,
            message: '请输入验证码'
        }
        return res.json(json)
    }

    if (code != codeMgs) {
        json = {
            code: -200,
            message: "验证码不正确"
        }
        return res.json(json)
    }

    FUsers.findOneAsync({
            username: username,
            password: md5(md5Pre + password),
            is_delete: 0
        })
        .then(result => {
            if (result) {
                var id = result._id
                var remember_me = 3600000;
                var token = jwt.sign({
                    id,
                    username
                }, secret, {
                    expiresIn: 60 * 60 * 1
                })
                res.cookie('f_user', token, { maxAge: remember_me })
                res.cookie('f_userid', id, { maxAge: remember_me })
                res.cookie('f_username', username, { maxAge: remember_me })
                return res.json({
                    code: 200,
                    message: '登录成功',
                    data: token
                })
            }
            return res.json({
                code: -200,
                message: '用户名或者密码错误'
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: '登录失败'
            })
        })
}

exports.insertFrontUsers = (req, res, next) => {
    var password = req.body.password,
        confirm = req.body.confirm,
        username = req.body.username,
        code = {
            c: req.body.code,
            e: codeMgs
        };

    verifi.VerifyTheuser({ username, password, confirm, code }, function(result) {
        if (!result) {
            FUsers.findOneAsync({ username: username }).then(result2 => {
                if (result2) {
                    res.json({
                        code: -200,
                        message: '用户已存在'
                    })
                    return;
                }

                FUsers.createAsync({
                    username: username,
                    password: md5(md5Pre + password),
                    creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
                    is_delete: 0,
                    timestamp: moment().format('X')
                }).then(() => {
                    console.log('scc2')
                        //fs.writeFileSync('./admin.lock', username)
                    res.json({
                        code: 200,
                        message: '用户注册成功'
                    })
                })
            }).catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
        } else {
            res.json(result)
        }
    })
}

exports.captchas = (req, res, next) => {
    codeMgs = parseInt(Math.random() * 9000 + 1000);
    let png = new captchapng(100, 32, codeMgs); // width,height, numeric captcha 
    console.log(codeMgs)

    res.json({
        code: 200,
        message: '图片验证生成成功',
        data: 'data:image/png;base64,' + png.getBase64()
    });
}