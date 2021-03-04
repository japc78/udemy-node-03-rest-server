const path = require('path');
const fs = require('fs');

const { response, request } = require("express");
const { uploadFile } = require('../helpers');

const { User, Product } = require('../models');


const uploadFiles = async (req = request, res = response) => {
    try {
        const name = await uploadFile(req.files);
        res.json({
            name
        });

    } catch (msg) {
        res.status(400).json({ msg })
    }
};

const updateImage = async (req = request, res = response) => {
    try {

        const { id, collection } = req.params;

        let model;

        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if (!model) return res.status(400).json({ msg: `Do not exist users with Id: ${id}`});
                break;

            case 'products':
                model = await User.findById(id);
                if (!model) return res.status(400).json({ msg: `Do not exist products with Id: ${id}`});
            break;
        }

        // Borrar image anterior
        if (model.img) {
            const pathImage = path.join( __dirname, '../uploads', collection, model.img );

            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }


        model.img = await  uploadFile(req.files, undefined, collection);
        model.save();

        res.json( model );

    } catch (msg) {
        res.status(400).json({ msg })
    }
}


const showImage = async (req = request, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) return res.status(400).json({ msg: `Do not exist users with Id: ${id}`});
            break;

        case 'products':
            model = await User.findById(id);
            if (!model) return res.status(400).json({ msg: `Do not exist products with Id: ${id}`});
        break;
    }

    // Comprobar que hay imagen
    if (model.img) {
        const pathImage = path.join( __dirname, '../uploads', collection, model.img );

        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    const defaultImage = path.join( __dirname, '../assets/no-image.jpg');

    res.sendFile(defaultImage);

}

module.exports = {
  uploadFiles,
  updateImage,
  showImage
}