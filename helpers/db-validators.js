const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne({ role });

    if (!roleExists) {
       throw new Error(`The role: ${role} is not register in Database`);
    }
}

const emailExists = async ( email = '') => {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        throw new Error(`The email: ${email} already exists in database`);
    }
}

module.exports = {
    isRoleValid,
    emailExists
}