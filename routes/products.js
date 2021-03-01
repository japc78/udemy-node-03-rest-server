const { Router, response } = require('express');
const { check } = require('express-validator');
const { getProducts, addProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/products');

const { validJWT, validFields, shouldBeRole } = require('../middlewares');

const { categoryExitsById, productNameExits, productExitsById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getProducts);


router.get('/:id', [
    check('id', 'Not is valid id').isMongoId(),
    validFields,
    check('id').custom(productExitsById),
    validFields
], getProductById);


router.post('/', [
    validJWT,
    check('name', 'The name is required').notEmpty(),
    check('name').custom(productNameExits),
    check('category', 'Not is valid id').isMongoId(),
    check('category').custom(categoryExitsById),
    validFields
], addProduct);


router.put('/:id', [

], updateProduct);


router.delete('/:id', [


], deleteProduct);

module.exports = router;