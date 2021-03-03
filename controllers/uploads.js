const { response, request } = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { uploadFile } = require('../helpers');


const uploadFiles = async (req = request, res = response) => {

    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
            res.status(400).json( { msg: 'No files were uploaded'});
            return;
        }

        const name = await uploadFile(req.files);

        res.json({
            name
        })
    } catch (error) {
        console.error(error);
        res.json({ msg: 'Oops, There has been an error uploading the files, please contact the administrator.'})
    }
};

module.exports = {
  uploadFiles,
};