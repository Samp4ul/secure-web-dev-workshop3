// This file holds the Business-Logic layer, interacting with Data Layer
const Location = require('./locations.model')

function findAll () {
	return Location.find()
}

async function findOne(id) {
	let location;
	try {
		location = await Location.findById(id);
	} catch (e) {

	}
	if (!location) {

	}
	return location;
}

function create(updateInfo){
	return Location.insertMany(updateInfo)

}

async function updateOne(id, locationData) {
	const location = await findOne(id);
	for (const locationElementKey in locationData) {
		if (
			locationElementKey[0] !== "_" &&
			locationData.hasOwnProperty(locationElementKey)
		) {
			location[locationElementKey] = locationData[locationElementKey];
		}
	}
	await location.save();
	return await findOne(id);
}

async function deleteO(id) {
	try{
		const location = await findOne(id);
		return location.remove();
	}
	catch (e){

	}

}

module.exports = {findAll,findOne,updateOne,deleteO,create}

