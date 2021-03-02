const { request, response } = require("express");
const { ObjectId } = require ('mongoose').Types;

const { User, Product, Category} = require('../models');

const allowCollection = [
    'categories',
    'products',
    'roles',
    'users',
]


const search = ( req = request, res = response) => {
    const { collection, term } = req.params;

    if (!allowCollection.includes(collection)) return res.status(400).json({ msg: `The collection allow are: ${allowCollection}`});

    switch (collection) {
        case 'categories':

        break;

        case 'products':

        break;

        case 'roles':

        break;

        case 'users':
            searchUsers(term, res);
        break;
    }
}

const searchUsers = async ( term = '',  res = response ) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);

        return res.json({
            results: (user) ? [user] : []
        });
    }

    // Se crea una expresion regular para familitar las busquedas
    const regex = new RegExp(term, 'i');

    const users = await User.find({
        // Varias opciones de coincidencia para el nombre y el email
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true}]
    });

    return res.json({
        total: users.length,
        results: users
    });
}

module.exports = {
    search
}