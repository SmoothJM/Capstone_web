const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userModel = Schema({
    email: String,
    username: String,
    password: String,
    state: {
        type: Number,
        default: 0
    },
    role: {
        type: Number,
        default: 0
    }
});

let UserModel = mongoose.model('user',userModel,'user');
module.exports = UserModel;











