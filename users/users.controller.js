const router = require('express').Router()
const bodyParser = require("body-parser");
const loginService = require('./users.service')
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken")

router.use(bodyParser.json());

//MIDDLEWARE

const verifyUserToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user_id = decoded.user_id;
        const role = await loginService.findR(req.user_id)
        req.user_role = role
        next();
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};

function roleMiddleware (allowedRoles) {
    return function (req, res, next) {

        if (allowedRoles.includes(req.user_role)) {
            return next()
        }
        return res.status(403).send()
    }
}


//REQUEST

router.post('/users/register', async (req, res) => {
    try{
        const login = await loginService.create(req.body)
        res.status(200).send(login)
    }
    catch (e)
    {
        if(e.code==11000)
        {
            res.status(400).send("Username already exists")
        }
        else
        {
            res.status(400).send("Bad request")
        }
    }



})

router.get('/users',verifyUserToken,roleMiddleware(['admin']), async (req, res) => {
    try{
        const login = await loginService.findAll();
        return res.status(200).send(login)
    }
    catch(e)
    {
        res.status(400).send("Bad request")
    }

})


router.get('/users/me',verifyUserToken, async (req, res) => {
    const login = await loginService.find(req.user_id)
    res.status(200).send(login)
})


router.put('/users/me',verifyUserToken, async (req, res) => {
    const login = await loginService.update(req.user, {...req.body})
    res.status(200).send(login)
})

router.delete('/users/me',verifyUserToken, async (req, res) => {
    const login = await loginService.deleteO(req.user_id)
    res.status(200).send(login)
})

router.post('/users/login',
    passport.authenticate('local',{session:false}),
    async (req, res) => {
        const user = await loginService.findU(req.body.username)
        const token = jwt.sign(
            { user_id: user._id,role : user.role},
            process.env.TOKEN_KEY,
            {
                expiresIn: 60*60,
            }
        );
        res.status(200).send({"token" : token})

});


module.exports = router