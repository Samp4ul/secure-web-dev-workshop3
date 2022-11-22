const Login = require('./users.model')
const bcrypt = require("bcrypt")


async function create(updateInfo) {
    const salt = await bcrypt.genSalt()
    const login = new Login({...updateInfo, password: await bcrypt.hash(updateInfo.password, salt)})
    await login.save()
    return login
}

function findAll () {
    return Login.find().select({"password":0})
}

function find(id) {
    return Login.findOne(
        {_id:id}
    )
}
function update(id,updateInfo){
    const login = find(id);
    return login.update(updateInfo)

}

function deleteO(id){
    return Login.deleteOne(find({_id:id}))
}

module.exports = {create,find,findAll,update,deleteO}