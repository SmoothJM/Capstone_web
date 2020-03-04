const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let diagnoseSchema = Schema({
   email: String,
   username: String,
   result: String,
   img: String,
   time: Date,
   percentage: Number
});

let DiagnoseSchema = mongoose.model('diagnose',diagnoseSchema,'diagnose');
module.exports = DiagnoseSchema;
