const { request, response } = require("express");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { jwtGenerator } = require("../helpers/jwt-generator");

const login = async (req = request, res = response) => {

    const { email, password} = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ msg: 'Email not found in DB'});

        // Comprobar que el usuario esta activo en la BD
        if (!user.state) return res.status(400).json({ msg: 'Email is not active in DB'});

        // Verificar el password
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if(!isValidPassword) return res.status(400).json({ msg: 'Password is not valid'});

        // TODO Generar el JWT

        const token = await jwtGenerator(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contact with administrator'
        });
    }

}

module.exports = {
    login,
}

