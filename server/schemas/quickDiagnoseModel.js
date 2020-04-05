const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quickSchema = Schema({
    result: String,
    img: String,
    time: Date,
    percentage: Number
});

let QuickSchema = mongoose.model('quick',quickSchema,'quick');
module.exports = QuickSchema;
