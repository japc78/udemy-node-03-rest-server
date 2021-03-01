const { response, request } = require("express");
const { Product } = require('../models');

const getProducts = (req = request, res = response) => {

}


const getProductById = (req = request, res = response) => {

}


const addProduct = async (req = request, res = response) => {
    try {
        const { name, category, precio, description, available } = req.body;
        // const name = req.body.name.toUpperCase();

        const product = new Product( {name, category, precio, description, available} );

        // console.log(product);
        product.user = req.user._id;

        await product.save();

        res.status(201).json({
            product
        });

    } catch (error) {
        showError(error, res);
    }
}


const updateProduct = (req = request, res = response) => {

}


const deleteProduct = (req = request, res = response) => {

}


const showError = (error, response) => {
    console.error(error);
    response.status(500).json({
        msg: "Error: Service is not available, contact with administrator"
    });
}

module.exports = {
    addProduct,
    deleteProduct,
    getProducts,
    getProductById,
    updateProduct,
}