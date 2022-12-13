// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const bodyParser = require("body-parser");
const locationsService = require('./locations.service')
const express = require("express");
const jwt = require("jsonwebtoken");
const loginService = require("../users/users.service");

router.use(bodyParser.json());

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



router.get('/locations',verifyUserToken,roleMiddleware(['admin']), async (req, res) => {
	const locations = await locationsService.findAll();
	return res.status(200).send(locations)
})


router.get('/locations/:id',verifyUserToken,roleMiddleware(['admin']), async (req, res) => {
	const location = await locationsService.find(req.params.id)
	res.status(200).send(location)
})

router.post('/locations/',verifyUserToken,roleMiddleware(['admin']), async (req, res) => {
	const location = await locationsService.create({...req.body})
	res.status(200).send(location)
})

router.put('/locations/:id',verifyUserToken,roleMiddleware(['admin']), async (req, res) => {
	const location = await locationsService.update(req.params.id, {...req.body})
	res.status(200).send(location)
})

router.delete('/locations/:id',verifyUserToken,roleMiddleware(['admin']), async (req, res) => {
	const location = await locationsService.deleteO(req.params.id)
	res.status(200).send(location)
})

module.exports = router