let url = require('url');  
let dealFn = require('./dealfn.js');

function sendDataFn(req, res, filename, needcity) {
    let name = '',
        city = '',
        readFileName = req.body.rN,
        sendData = {
            errno: 200,
            city: city,
            msg: 'ok',
            data: {}
        };
       
    if (needcity) {
        readFileName = city + filename;
    } else {
        readFileName = filename;
    }
    dealFn.readFileData(name + readFileName).then((data) => {
        sendData.data = data;
        res.send(JSON.stringify(sendData));
    }, (msg) => {
        sendData.errno = -200;
        sendData.msg = '暂时没有数据';
        res.send(JSON.stringify(sendData));
    })
}

exports.index = (req, res) => {
    res.render('index');
}

exports.coming = (req, res, next) => {
    let limit =  req.body.limit,
        offset =  req.body.offset;
    if (limit && offset) {
        next();
    } else {
        sendDataFn(req, res, 'coming.json', false);
    }
}

exports.comingLimit = (req, res) => {
   
    let limit = + req.body.limit,
        offset = + req.body.offset,
        sendData = {
            errno: 0,
            total: 0,
            limit: limit,
            offset: offset,
            msg: 'ok',
            data: {}
        };
    dealFn.readFileData('coming.json').then((data) => {
        let list = data.data.returnValue
        let sendList = list.slice(offset, offset + limit)
        data.data.returnValue = sendList
        sendData.data = data;
        sendData.total = list.length
        res.send(JSON.stringify(sendData));
    }, (msg) => {
        sendData.errno = -1;
        sendData.msg = '暂时没有数据';
        res.send(JSON.stringify(sendData));
    })
}


exports.getCityListSync = (req, res) => {
    sendDataFn(req, res, 'city.json', false);
}
