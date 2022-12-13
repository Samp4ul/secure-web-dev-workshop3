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

function create(updateInfo){
	return Location.insertMany(updateInfo)

}

function update(id,updateInfo){
	return Location.updateOne({_id:id},updateInfo)

}

function deleteO(id){
	return Location.deleteOne(find({_id:id}))
}

module.exports = {findAll,find,update,deleteO,create}

