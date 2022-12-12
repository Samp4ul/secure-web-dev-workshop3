const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique : true,
        required : true
    },
    password:
        {
            type : String,
            required : true
        },
    role :{
        type : String,
    }


})

const Login = mongoose.model('userslogin', userSchema)

module.exports = Login
