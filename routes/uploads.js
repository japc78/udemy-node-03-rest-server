const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFiles, updateImage } = require('../controllers/uploads');
const { isAllowCollection } = require('../helpers');
const { fileExist, validFields } = require('../middlewares');


const router = Router();

router.post('/', fileExist, uploadFiles);

router.put('/:collection/:id', [
    check('collection').custom( c => isAllowCollection(c, ['users', 'products'])),
    check('id', 'Not is valid id').isMongoId(),
    fileExist,
    validFields,

], updateImage);

module.exports = router;