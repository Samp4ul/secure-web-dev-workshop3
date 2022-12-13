const Login = require('./users.model')
const bcrypt = require("bcrypt")
const {ObjectID} = require("mongodb");


async function create(updateInfo) {
    const salt = 10
    const login = new Login({...updateInfo, password: await bcrypt.hash(updateInfo.password, salt), role :"membre"})
    await login.save()
    return login
}

async function checkPassword(username,password){
    const user = await Login.findOne({username})
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return false
    }
    return user
}

function findAll () {
    return Login.find().select({"password":0})
}

function find(id) {
    return Login.findOne(
        {_id:id}
    )
}

async function findR(id) {
    var ID = ObjectID(id)
    const user = await Login.findOne({_id : ID})
    return user.role
}

function findU(username) {
    return Login.findOne(
        {username:username}
    )
}
function update(id,updateInfo){
    const login = find(id);
    return login.update(updateInfo)

}

function deleteO(id){
    console.log(id)
    return Login.deleteOne({"_id":id})
}



module.exports = {create,find,findAll,update,deleteO,checkPassword,findU,findR}