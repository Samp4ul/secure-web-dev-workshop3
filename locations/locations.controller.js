// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const bodyParser = require("body-parser");
const locationsService = require('./locations.service')
const express = require("express");

router.use(bodyParser.json());

router.get('/locations', (req, res) => {
	return res.status(200).send({locations: []})
})



router.get('/location/:id', (req,res) => {    const id = parseInt(req.params.id)
	const location = locationsService.find(locations => locations.id === id)
	res.status(200).json(locationsService)})

router.post('/locations', (req,res) => {    locationsService.push(req.body)
	res.status(200).json(locationsService)})

module.exports = router