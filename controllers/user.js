const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const userGet = (req = request, res = response) => {
    const queryParams = request.query;

    res.json({
        msg: 'get API - controller',
        queryParams
    })
}

const userPost = async (req = request, res = response) => {
    // const body = req.body;
    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role});

    // TODO Verificar si el email existe
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({
        msg: 'This email is registered in the database'
    });

    // Encriptar el password
    // Se crea un salt para aumentar la dificultad del password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    // Guardar usuario en BD
    await user.save();

    res.json({
        user
    })
}

const userPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controller',
        id
    })
}

const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controller'
    })
}

const userPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}

module.exports =  {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}