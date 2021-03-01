const { Role, Category, User, Product } = require('../models');

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

const userExists = async ( id = '') => {
    const userExists = await User.findById(id);

    if (!userExists) {
        throw new Error(`The id: ${id} is not register in Database`);
    }
}

const categoryExitsById = async (id = '') => {
    const categoryExits = await Category.findById(id);

    if (!categoryExits) {
        throw new Error(`The id: ${id} is not register in Database`);
    }
}

const categoryNameExits = async (name = '') => {
    const categoryNameExits = await Category.findOne({ name });

    if (categoryNameExits) {
        throw new Error(`The name: ${name} already exits in Database`);
    }
}

const productNameExits = async (name = '') => {
    const productNameExits = await Product.findOne({ name });

    if (productNameExits) {
        throw new Error(`The name: ${name} already exits in Database`);
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExists,
    categoryExitsById,
    categoryNameExits,
    productNameExits
}