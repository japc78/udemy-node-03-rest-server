const { Router, response } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');

const router = Router();

// TODO Obtener todas las categorías
router.get('/', (req, res= response) => {
    res.json({msg: 'Get categories'});
});

// TODO Obtener una categoría por Id
router.get('/:id', (req, res= response) => {
    res.json({msg: 'Get category by id'});
});

// TODO Crear categoría, cualquier usuario con token valido.
router.post('/', (req, res= response) => {
    res.json({msg: 'Post add category'});
});

// TODO Actualizar categoría por ID.
router.put('/:id', (req, res= response) => {
    res.json({msg: 'Put, Update category by id'});
});

// TODO Eliminar/desactivar categoría.
router.delete('/:id', (req, res= response) => {
    res.json({msg: 'Delete, category by id'});
});

module.exports = router;