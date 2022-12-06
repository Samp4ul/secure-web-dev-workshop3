const router = require('express').Router()
const bodyParser = require("body-parser");
const loginService = require('./users.service')
const express = require("express");

const passport = require("passport");

const jwt = require("jsonwebtoken")


router.use(bodyParser.json());

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

router.get('/users', async (req, res) => {
    try{
        const login = await loginService.findAll();
        return res.status(200).send(login)
    }
    catch(e)
    {
        res.status(400).send("Bad request")
    }

})


router.get('/users/me', async (req, res) => {
    const login = await loginService.find(req.params.id)
    res.status(200).send(login)
})


router.put('/users/me', async (req, res) => {
    const login = await loginService.update(req.params.id, {...req.body})
    res.status(200).send(login)
})

router.delete('/users/me', async (req, res) => {
    const login = await loginService.deleteO(req.params.id)
    res.status(200).send(login)
})

router.post('/users/login',
    passport.authenticate('local',{session:false}),
    async (req, res) => {
        const user = await loginService.findU(req.params.username)
        const token = jwt.sign(
            { user_id: user._id},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        res.status(200).send({"token" : token})

});


module.exports = router