const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPatch, userPut, userDelete } = require('../controllers/user');

const { validFields } = require('../middlewares/valid-fields')

const router = Router();

router.get('/', userGet);
router.post('/', [
    check('email', 'The Email is not valid').isEmail(),
    check('name', 'The Name is required').not().isEmpty(),
    check('password', 'The password must be at least 6 characters long').isLength({min: 6}),
    check('role', 'It is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validFields
], userPost);
router.put('/:id', userPut);
router.delete('/', userDelete);
router.patch('/', userPatch);

module.exports = router;