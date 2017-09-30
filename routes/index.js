const express = require('express');
const router = express.Router();
const isAdmin = require('./is-admin');

const goods = require('../api/goods')
const users = require('../api/users')

router.get('/', (req, res) => {
    res.render('index.html', { title: '添加管理员', message: '' })
})

router.get('/backend', (req, res) => {
    res.render('index.html', { title: '添加管理员', message: '' })
})


//backend api

router.post('/api/users/admininsert', users.admininsert);
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



router.post('/api/users/insertFrontUsers', users.insertFrontUsers);
router.post('/api/users/frontUsersLogin', users.frontUsersLogin);



router.post('/api/users/captchas', users.captchas);


// router.get('*', (req, res) => {
//     res.json({
//         code: -200,
//         message: '没有找到该页面'
//     })
// })

module.exports = router;
