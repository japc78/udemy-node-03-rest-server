const { response, request } = require("express");
const Category = require("../models/category");

const addCategory = async ( req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    try {
        const categoryDB = await Category.findOne( {name} );
        if (categoryDB) return res.status(400).json({ msg: `The category: ${categoryDB.name} already exists`});

        const data = {
            name,
            user: req.user._id
        }

        const category = new Category(data);

        // Save in database
        await category.save();

        res.status(201).json({
            category
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: `Server error, contact with administrator`});
    }
}

module.exports = {
    addCategory,
}