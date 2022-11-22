// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const bodyParser = require("body-parser");
const locationsService = require('./locations.service')
const express = require("express");

router.use(bodyParser.json());

router.get('/locations', async (req, res) => {
	const locations = await locationsService.findAll();
	return res.status(200).send(locations)
})


router.get('/locations/:id', async (req, res) => {
	const location = await locationsService.find(req.params.id)
	res.status(200).send(location)
})

router.post('/locations/', async (req, res) => {
	const location = await locationsService.create({...req.body})
	res.status(200).send(location)
})

router.put('/locations/:id', async (req, res) => {
	const location = await locationsService.update(req.params.id, {...req.body})
	res.status(200).send(location)
})

router.delete('/locations/:id', async (req, res) => {
	const location = await locationsService.deleteO(req.params.id)
	res.status(200).send(location)
})

module.exports = router