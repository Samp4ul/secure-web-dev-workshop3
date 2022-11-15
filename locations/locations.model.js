const mongoose = require('mongoose')

async function main(){
	const result = await mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Connected")});

}

const filmSchema = new mongoose.Schema({
	filmType: String,
	filmProducerName: String,
	endDate: Date,
	filmName: String,
	district: Number,
	geolocation: {
		coordinates: [Number],
		type: { type: String },
	},
	sourceLocationId: String,
	filmDirectorName: String,
	address: String,
	startDate: Date,
	year: Number,
})

const Location = mongoose.model('Location', filmSchema)

module.exports = Location
