const Login = require('./users.model')
const bcrypt = require("bcrypt")


async function create(updateInfo) {
    const salt = 10
    const login = new Login({...updateInfo, password: await bcrypt.hash(updateInfo.password, salt)})
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

function findU(username) {
    return Login.findOne(
        {_username:username}
    )
}
function update(id,updateInfo){
    const login = find(id);
    return login.update(updateInfo)

}

function deleteO(id){
    return Login.deleteOne(find({_id:id}))
}

function login(body){
    try{
        Login.findOne({"username":body.username})

    }
    catch (e){
    }
}

module.exports = {create,find,findAll,update,deleteO,login,checkPassword,findU}