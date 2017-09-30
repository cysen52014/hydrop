

exports.VerifyTheuser = (config,cb) => { 
    var patten = /^[a-zA-Z]\w{3,15}$/ig;//用户名
    var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//邮箱
    var pwd = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/

    //res ? (res = res) : res = {},res.send = function (obj) {return obj; };
    
    //console.log('ss',config.username == '' || !patten.test(config.username))

    if(config.username == '' || !patten.test(config.username)){
    	cb({
        	code : -200,
        	message : "用户名由字母a～z(不区分大小写)、数字0～9、点、或下划线组成，长度为4～18个字符"
        })
        return;
    }
    

    if(config.password == "" || !pwd.test(config.password)){
    	cb({
        	code : -200,
        	message : "密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符"
        })
        return;
    }

    if(typeof(config.confirm) != 'undefined'){
        if(config.confirm == "" || config.password != config.confirm){
            cb({
                code : -200,
                message : "验证码与密码不一致"
            })
            return;
        }
    }
    
    
    if(config.email){
        if(config.email == "" || !email.test(config.email)){
        	cb({
            	code : -200,
            	message : "请输入正确的邮箱地址"
            })
           return;
        }
    }

    if(config.code){
        if(config.code.c == ""){
            cb({
                code : -200,
                message : "请输入正确的验证码"
            })
            return;
        }
        if( config.code.c != config.code.e){
            cb({
                code : -200,
                message : "验证码不正确"
            })
            return;
        }
    }

    cb();
}