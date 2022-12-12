// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const bodyParser = require("body-parser");
const locationsService = require('./locations.service')
const express = require("express");
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());

const verifyUserToken = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).send("Unauthorized request");
	}
	const token = req.headers["authorization"].split(" ")[1];
	if (!token) {
		return res.status(401).send("Access denied. No token provided.");
	}
	console.log(token)
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(400).send("Invalid token.");
	}
};



router.get('/locations',verifyUserToken, async (req, res) => {
	const locations = await locationsService.findAll();
	return res.status(200).send(locations)
})


router.get('/locations/:id',verifyUserToken, async (req, res) => {
	const location = await locationsService.find(req.params.id)
	res.status(200).send(location)
})

router.post('/locations/',verifyUserToken, async (req, res) => {
	const location = await locationsService.create({...req.body})
	res.status(200).send(location)
})

router.put('/locations/:id',verifyUserToken, async (req, res) => {
	const location = await locationsService.update(req.params.id, {...req.body})
	res.status(200).send(location)
})

router.delete('/locations/:id',verifyUserToken, async (req, res) => {
	const location = await locationsService.deleteO(req.params.id)
	res.status(200).send(location)
})

module.exports = router