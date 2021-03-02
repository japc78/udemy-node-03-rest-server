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
}

module.exports = {
    search
}