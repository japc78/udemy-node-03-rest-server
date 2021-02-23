const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validJWT = ( req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) return res.status(401).json( {msg: 'There is not token in the request'} );

    try {
        // Verificar token recibido
        // jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const payload = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        console.log(payload);

        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'Token is not valid'});
    }
}

module.exports = {
    validJWT
}