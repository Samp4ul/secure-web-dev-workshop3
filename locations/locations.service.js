// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find()
}

function find(id) {
	return Location.findOne(
		{_id:id}
	)
}

module.exports = {findAll,find}

