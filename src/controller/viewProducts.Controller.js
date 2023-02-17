const BdProductManager = require("../dao/mongoManager/BdProductManager");

const views = async (req, res) => {
   
    const {limit, page, ...query} = req.query;
    
    const products= await BdProductManager.getProduct(page, limit, query);
    const product = products.docs.map((product) => ({
        title:product.title,
        description:product.description,
        code:product.code,
        price:product.price,
        stock:product.stock
    
    })) 
   

    res.render("viewProduct", {
       products: product,
       totalPage: products.totalPages,
       page:products.page,
       prev: product.hasPrevPage,
       next: products.hasNextPage
    }
             
)}


module.exports ={
    views,
}