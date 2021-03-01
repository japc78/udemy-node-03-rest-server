const { response, request } = require("express");
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
    try {
        const { limit = 5 , from = 0, state = true } = req.query;

        const query = { state }

        const [ total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query, 'name category user')
                .skip(Number(from)) // desde donde se muestran los resultados
                .limit(Number(limit)) // Limite 5
                .populate({
                    path: 'user',
                    select: 'name role',
                })
                .populate({
                    path: 'category',
                    select: 'name'
                })
        ]);

        res.status(200).json({
            total,
            products
        })

    } catch (error) {
        showError(error, res);
    }

}


const getProductById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate({
                path: 'user',
                select: 'name role',
            })
            .populate({
                path: 'category',
                select: 'name'
            })

        res.status(201).json({
            product
        })
    } catch (error) {
        showError(error, res);
    }
}


const addProduct = async (req = request, res = response) => {
    try {
        const { name, Product, precio, description, available } = req.body;
        // const name = req.body.name.toUpperCase();

        const product = new Product( {name, Product, precio, description, available} );

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