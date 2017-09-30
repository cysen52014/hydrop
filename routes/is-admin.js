var jwt = require('jsonwebtoken')
var secret = "735859.3049610322"

module.exports = (req, res, next) => {
    var token = req.cookies.b_user,
        userid = req.cookies.b_userid,
        username = req.cookies.b_username
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (!err && decoded.id === userid && decoded.username === username) {
                req.decoded = decoded
                next()
            } else {
                return res.json({
                    code: -200,
                    message: '登录验证失败'
                })
            }
        })
    } else {
        return res.json({
            code: -200,
            message: '请先登录'
        })
    }
}
