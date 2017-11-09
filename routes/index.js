const express = require('express');
const router = express.Router();
const isAdmin = require('./is-admin');

const goods = require('../api/goods')
const users = require('../api/users')
const city = require('../api/city')
const address = require('../api/address')
const Orders = require('../api/orders')
const Comments = require('../api/comment')

router.get('/', (req, res) => {
    res.render('index.html', { title: '添加管理员', message: '' })
})



router.get(/^\/(backend|user|cart|article).*/, (req, res) => {
    res.render('index.html', { title: '后台', message: '' })
})


// router.get(/^(?!\/(backend|api).*)/, (req, res) => { 
//     res.render('index.html', { title: '后台', message: '' })
// })


//backend api

router.post('/api/users/admininsert', isAdmin, users.admininsert);
router.post('/api/users/adminLoginAsync', users.adminLoginAsync);

router.post('/api/goods/insertGoodAsync', isAdmin, goods.insert);
router.post('/api/goods/updateGoodAsync', isAdmin, goods.updata);





router.post('/api/upload/goodsPicture', isAdmin, goods.uploadPicture);

router.post('/api/goods/insertGoodTypeAsync', isAdmin, goods.insertGoodTypeAsync);

router.post('/api/goods/deleteGoodseAsync', isAdmin, goods.deleteGoodseAsync);

router.post('/api/goods/showGoodsListAsync', isAdmin, goods.showGoodsListAsync);


//front api
router.post('/api/goods/getGoodType', goods.getGoodType);
router.post('/api/goods/getGoodByTypeIdAsync', goods.getGoodByTypeIdAsync);
router.post('/api/goods/getGoodByIdAsync', goods.getGoodByIdAsync);
router.post('/api/goods/getByIdGroup', goods.getByIdGroup);
router.post('/api/goods/addToCart', goods.addToCart);
router.post('/api/goods/getCartId', goods.getCartId);
router.post('/api/goods/delCartById', goods.delCartById);



router.post('/api/goods/deletGoodTypeAsync', goods.deletGoodTypeAsync);
router.post('/api/goods/inserAdsPicture', goods.inserAdsPicture);
router.post('/api/goods/getAdsPictureList', goods.getAdsPictureList);
router.post('/api/goods/deletAdsPicture', goods.deletAdsPicture);
router.post('/api/goods/updateAdsPicture', goods.updateAdsPicture);
router.post('/api/goods/insertarticleDetails', goods.insertarticleDetails);
router.post('/api/goods/GetarticleDetails', goods.GetarticleDetails);
router.post('/api/goods/UpdataarticleDetails', goods.UpdataarticleDetails);



router.post('/api/users/insertFrontUsers', users.insertFrontUsers);
router.post('/api/users/frontUsersLogin', users.frontUsersLogin);



router.post('/api/users/captchas', users.captchas);
router.post('/api/users/addressInsert', address.addressInsert);
router.post('/api/users/getUserAddress', address.getUserAddress);
router.post('/api/users/addressSelect', address.addressSelect);


router.post('/api/users/OrdersInsert', Orders.OrdersInsert);
router.post('/api/users/getAllOrders', Orders.getAllOrders);
router.post('/api/users/deletOrders', Orders.deletOrders);
router.post('/api/users/CommentInsert', Comments.CommentInsert);
router.post('/api/users/CommentsPull', Comments.CommentsPull);


router.post('/api/getCityListSync', city.getCityListSync);



router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该页面'
    })
})

module.exports = router;