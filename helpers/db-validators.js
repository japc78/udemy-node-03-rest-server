const Role = require('../models/role');

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne({ role });

    if (!roleExists) {
       throw new Error(`The role: ${role} is not register in Database`);
    }
}

module.exports = {
    isRoleValid
}