const BdProductManager = require("../dao/mongoManager/BdProductManager");
const BdCartManager = require("../dao/mongoManager/BdCartManager");




const bdgetCartId = async (req, res) => {
     const id = req.params.cid
     const cart = await BdCartManager.getCartsId(id);
     if (!cart){
      return res.status(400).json({
        msg:"Carrito Inexistente",
        ok:false,
       })  
          
   }else{
        res.json(cart)   
          
  }

}

const addProductToCart = async (req, res)=>{
  const { cid, pid } = req.params;
  const product = await BdProductManager.getProductId(pid);
 
  if (!product){
    return res.status(400).json({
      msg:"Producto no encontrado",
      ok:false,
     })  
    }
    const Cart = await BdCartManager.getCartsId (cid);
    
     if (!Cart){
      const newCart = {
         priceTotal: product.price,
         quantityTotal: 1,
         products:[{id:product.id, title:product.title, description:product.description, price:product.price, quantity:1}] 
       }
      const CreateCart = await BdCartManager.addProductToCarts (newCart);
       return res.status(200).json({
         msg:"Carrito Creado",
         cart:CreateCart,
        })  

      }
    
      const findProductTocart = Cart.products.find((prod)=> prod.id === pid) 
     
      if(!findProductTocart){
        Cart.products.push({id:product.id, title:product.title, description:product.description, price:product.price, quantity:1})
        Cart.quantityTotal = Cart.quantityTotal + 1
        const total = Cart.products.reduce((acumulador,total)=> acumulador +(total.price*total.quantity),0)
        Cart.priceTotal = total
        const cartToUpdate = await BdCartManager.updateToCart(Cart)
        return res.status(200).json({
          msg:"Producto Agregado ",
          cart:cartToUpdate,
         })  
         
      }else{
        findProductTocart.quantity++
        Cart.quantityTotal = Cart.quantityTotal + 1
        const total = Cart.products.reduce((acumulador,total)=> acumulador + (total.price*total.quantity),0)
        Cart.priceTotal = total
        const cartToUpdate = await BdCartManager.updateToCart(Cart)
        return res.status(200).json({
          msg:"Producto Agregado ",
          cart:cartToUpdate,
         })  
      }
}


  const deleteProductToCart = async (req, res)=>{
    const { cid, pid } = req.params;        
    const Cart = await BdCartManager.getCartsId(cid);
  
    if (!Cart){
        return res.status(400).json({
        msg:"Carrito Inexistente",
      })  
    }
   
      const findProductTocart = Cart.products.find((prod)=> prod.id === pid) 
       
      if(!findProductTocart){
          return res.status(400).json({
          msg:"Producto no existe en el carrito",
        })  
      }else{
        if (findProductTocart.quantity === 1){
          Cart.products = Cart.products.filter((prod)=> prod.id !== pid)
          
        }else {
            findProductTocart.quantity -- 
           
        }

      }
      Cart.quantityTotal = Cart.quantityTotal - 1
      const total = Cart.products.reduce((acumulador,total)=> acumulador + (total.price*total.quantity),0)
      Cart.priceTotal = total
     
      const cartToUpdate = await BdCartManager.updateToCart(Cart)
      return res.status(201).json({
        msg:"Producto Eliminado",
        Cart: cartToUpdate
      })  
      
}  

const  emptyToCart = async(req, res)=>{
  const {cid} = req.params;        
  const Cart = await BdCartManager.getCartsId(cid);

  if (!Cart){
      return res.status(400).json({
      msg:"Carrito Inexistente",
    })  
  }

      Cart.products = [];
      Cart.quantityTotal = 0
      Cart.priceTotal = 0
      const cartToUpdate = await BdCartManager.updateToCart(Cart)
      return res.status(201).json({
        msg:"Carrito Vaciado",
        Cart: cartToUpdate
      })  
      

   
}

const UpdateToQuantityProduct = async(req,res)=> {
  const { cid, pid,} = req.params;
  const {quantyti: quantity} = req.body;

   const Cart = await BdCartManager.getCartsId (cid);
    if (!Cart){
     return res.status(400).json({
       msg:"Carrito no encontrado",
       ok:false,
      })  
  }

  const findProductTocart = Cart.products.find((prod)=> prod.id === pid)

  if (!findProductTocart){
    return res.status(400).json({
      msg:"Producto no encontrado",
      ok:false,
     })  
    }
 





      if (quantity == undefined){
      return res.status(400).json({
        msg:"Debe Agregar Cantidad a Actualizar",
        ok:false,
       })  
    } else {
       if (quantity < 0){
        return res.status(400).json({
          msg:"La cantidad debe Ser Mayor o Igual a  0",
          ok:false,
         })  
         
       } else{
        findProductTocart.quantity = quantity
       }
    }
    
    Cart.quantityTotal = Cart.products.reduce((acumulador,total)=> acumulador + quantity,0)
    Cart.priceTotal = Cart.products.reduce((acumulador,total)=> acumulador + (total.price*total.quantity),0)
    const cartToUpdate = await BdCartManager.updateToCart(Cart)
    return res.status(201).json({
     msg:"Cantidad de Producto Actualizada",
       Cart: cartToUpdate
    })  




}
module.exports = {
    bdgetCartId,
    addProductToCart,
    deleteProductToCart,
    emptyToCart, 
    UpdateToQuantityProduct
}
