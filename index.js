const express = require('express')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000

const mongoose = require('mongoose')
require('dotenv').config()

app.use(locationController)


async function main(){
	const client = await mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Connected")});


	app.listen(port, () => {
		console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
	})
}
main()






app.get('', (req,res) => {    res.send("Hello World")})