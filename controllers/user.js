const { response, request } = require('express');
const User = require('../models/user');


const userGet = (req = request, res = response) => {
    const queryParams = request.query;

    res.json({
        msg: 'get API - controller',
        queryParams
    })
}

const userPost = async (req = request, res = response) => {
    // const body = req.body;
    const { name, age } = req.body;

    // Save data in database
    const user = new User(req.body);
    await user.save();

    res.json({
        msg: 'ok',
        age,
        name
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