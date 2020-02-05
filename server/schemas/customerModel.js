const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerModel = Schema({
    email: String,
    username: String,
    password: String,
    birthday: Date,
    gender: String,
    desc: String,
    docEmail: String
});

let CustomerModel = mongoose.model('customer',customerModel,'customer');
module.exports = CustomerModel;











