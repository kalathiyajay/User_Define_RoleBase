const express = require('express');
const { addNewProduct, getProducts, getSingleProducts, updateProductData, removeProductData } = require('../controller/product.controller');
const { veryfyToken } = require('../helper/tokenGenreter');

const productRoutes = express.Router();

const isAdmin = async (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    }
    else {
        res.json("Only is admin users allowed")
        console.log('You are not allowed');
    }
};

productRoutes.post("/add-products",veryfyToken,isAdmin,addNewProduct);
productRoutes.get("/all-products",veryfyToken,isAdmin,getProducts);
productRoutes.get("/:id",veryfyToken,isAdmin,getSingleProducts);
productRoutes.put('/update-product/:id',veryfyToken,isAdmin,updateProductData);
productRoutes.delete('/remove-product/:id',veryfyToken,isAdmin,removeProductData);

module.exports =productRoutes
