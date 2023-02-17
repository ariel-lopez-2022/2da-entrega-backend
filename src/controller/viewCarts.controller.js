const BdCartManager = require("../dao/mongoManager/BdCartManager");


const views = async (req, res) => {
    const {cid} = req.params 
    const Carts= await BdCartManager.getCartsId(cid);
console.log(Carts)   
     res.render("viewCarts", {Carts})

}

module.exports ={
    views
}