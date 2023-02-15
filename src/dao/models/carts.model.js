const mongoose = require('mongoose')

const cartsSchema = new mongoose.Schema(
   {
     priceTotal:{
       type:Number,
       default:0,
     }, 
     quantityTotal:{
       type:Number,
       default:0,
     },
     products: {
           type:[
              {
                product:{
                  type:mongoose.Schema.Types.ObjectId,
                   ref:"products"
                },
                id:{
                  type:String,
                },
                quantyti:{
                  type:Number,
                  default:1,
                }
               }
              
            ],
            default:[],
     }
 

    })   

const cartsModel = mongoose.model('carts', cartsSchema);

module.exports = cartsModel;

