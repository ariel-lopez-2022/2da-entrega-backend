const cartsModel = require('../models/carts.model')


class BdCartsManager {
	  getCartsId = async (id) => {
      return await cartsModel.findById(id).populate('products.product');
    }

    Create = async (carts)=>{
            return await cartsModel.create(carts);
    } 	

    addProductToCarts = async (newCart) => {
     return await cartsModel.create(newCart);
    }

    updateToCart = async(cid,cart)=>{
     
      return await cartsModel.updateOne({_id:cid},cart)
    }
}
module.exports = new BdCartsManager ;
