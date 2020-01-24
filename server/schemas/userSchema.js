const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = Schema({
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

let UserModel = mongoose.model('user',userSchema,'user');
module.exports = UserModel;











