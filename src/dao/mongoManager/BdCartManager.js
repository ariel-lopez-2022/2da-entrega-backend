const cartsModel = require('../models/carts.model')
const productModel = require('../models/products.model')

class BdCartsManager {
	constructor() {
		this.carts = []
	}

    CreateCarts = async (cart)=>{
        try{  
            const Createcart = await cartsModel.create(cart);
            return Createcart

         } catch (error) {
           return {msg:"Error al crear Carritos"}
           
         }   
    } 	

	getCartsId = async (id) => {
        
        try{  
             const cart = await cartsModel.findById(id);
             return cart
      
        } catch (error) {
           return undefined
         }   
	}

   
    addProductToCarts = async (newCart) => {
        const Createcart = await cartsModel.create(newCart);
        return Createcart
    }

    updateToCart = async(cart)=>{
        const cartUpdate = await cartsModel.findByIdAndUpdate(cart.id, cart, {
            new:true
        })
        return cartUpdate

    }

    

}


module.exports = new BdCartsManager ;
