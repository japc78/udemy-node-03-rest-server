const { response, request } = require("express");
const path = require('path');

const uploadFiles = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json( { msg: 'No files were uploaded'});
        return;
    }

    const { file } = req.files;
    const fileNameSplit = file.name.split('.');
    const extension = fileNameSplit[ fileNameSplit.length - 1];

    // Extension validator
    const validExtension = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

    if (!validExtension.includes(extension)) res.status(400).json({ msg: `The extension: .${extension}, is not allowed`})

    console.log(extension);


    const uploadPath = path.join( __dirname, '../uploads/', file.name);

    file.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Oops!!! Something has been wrong, contact the administrator' });
        }

        res.json({ msg: 'File uploaded to ' + uploadPath});
    });
};

module.exports = {
  uploadFiles,
};