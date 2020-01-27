const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerModel = Schema({
    email: String,
    username: String,
    password: String,
    age: Number,
    gender: String,
    desc: String
});

let CustomerModel = mongoose.model('customer',customerModel,'customer');
module.exports = CustomerModel;











