const {Router} = require('express');
const cartsControllerBd = require('../controller/carts.controller.bd')


const router =  Router();

router.get('/:cid', cartsControllerBd.bdgetCartId)
router.post('/:cid/product/:pid', cartsControllerBd.addProductToCart);
router.delete('/:cid/product/:pid', cartsControllerBd.deleteProductToCart);
router.delete('/:cid', cartsControllerBd.emptyToCart);

module.exports = router;