const validFields = require('../middlewares/valid-fields');
const validJWT = require('../middlewares/valid-jwt');
const validRoles = require('../middlewares/valid-roles');

module.exports = {
    ...validFields,
    ...validJWT,
    ...validRoles
}
