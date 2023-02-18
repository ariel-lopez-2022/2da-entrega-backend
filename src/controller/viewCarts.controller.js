const BdCartManager = require("../dao/mongoManager/BdCartManager");


const viewsBd = async (req, res) => {
    const {cid} = req.params 
    const Carts= await BdCartManager.getCartsId(cid);
    res.render("viewCarts", {Carts})

}

module.exports ={
    viewsBd
}