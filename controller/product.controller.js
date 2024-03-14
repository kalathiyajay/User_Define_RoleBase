const Product = require('../models/product.models.js');

exports.addNewProduct = async (req, res) => {

    let { title, description } = req.body;
    let check = await Product.findOne({ title: req.body.title, isdelete: false })

    if (check) {
        res.json({ message: "Product Is Alredy Added...." })
    }

    check = await Product.create({
        title,
        description
    });

    res.json({ check, message: "Product Is Created Successfully" });
}

exports.getProducts = async (req, res) => {

    let products = await Product.find()

    if (!products) {
        res.json({ message: "Product Not Found...." })
    }

    res.json({ products, message: "All Products Data" });
}

exports.getSingleProducts = async (req, res) => {
    let ID = req.params.id;
    let products = await Product.findById(ID, { isdelete: false });

    if (!products) {
        res.json({ message: "Product Not Found...." })
    }

    res.json({ products, message: "All Products Data" });
}

exports.updateProductData = async (req, res) => {

    let ID = req.params.id;
    let products = await Product.findById(ID, { isDelete: false })

    if (!products) {
        res.json({ message: "Product Not Found...." })
    }

    products = await Product.findByIdAndUpdate(ID, { ...req.body }, { new: true });
    res.json({ products, message: "Products Data is updated successfully" });
}

exports.removeProductData = async (req, res) => {

    let ID = req.params.id;
    let products = await Product.findById(ID, { isdelete: false })

    if (!products) {
        res.json({ message: "Product Not Found...." })
    }

    products = await Product.findByIdAndUpdate(ID, { isDelete: true }, { new: true });
    res.json({ products, message: "Products Data is removed successfully" });
}