function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

exports.VerifyTheuser = (config, cb) => {
    var patten = /^[a-zA-Z]\w{3,15}$/ig; //用户名
    var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //邮箱
    var pwd = /^[A-Za-z0-9!@#$%^&*-]{6,20}/

    //res ? (res = res) : res = {},res.send = function (obj) {return obj; };

    //console.log('ss',config.username == '' || !patten.test(config.username))

    if (getByteLen(config.username) < 1) {
        cb({
            code: -200,
            message: "用户名由长度为1～18个字符"
        })
        return;
    }


    if (config.password == "" || !pwd.test(config.password)) {
        cb({
            code: -200,
            message: "密码中必须由6-20位字母、数字、殊符号组合"
        })
        return;
    }

    if (typeof(config.confirm) != 'undefined') {
        if (config.confirm == "" || config.password != config.confirm) {
            cb({
                code: -200,
                message: "两次密码输入不一致"
            })
            return;
        }
    }


    if (config.email) {
        if (config.email == "" || !email.test(config.email)) {
            cb({
                code: -200,
                message: "请输入正确的邮箱地址"
            })
            return;
        }
    }

    if (config.code) {
        if (config.code.c == "") {
            cb({
                code: -200,
                message: "请输入正确的验证码"
            })
            return;
        }
        if (config.code.c != config.code.e) {
            cb({
                code: -200,
                message: "验证码不正确"
            })
            return;
        }
    }

    cb();
}