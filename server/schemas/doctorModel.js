const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let doctorSchema = Schema({
    email: String,
    username: String,
    password: String,
    addr: String,
    gender: String,
    desc: String,
    photo: String,
    schedule: [Date]
});

let DoctorModel = mongoose.model('doctor',doctorSchema,'doctor');
module.exports = DoctorModel;











