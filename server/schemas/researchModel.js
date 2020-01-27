const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let researchSchema = Schema({
   email: String,
   author: String,
   desc: String,
   img:[String]
});

let ResearchModel = mongoose.model('research', researchSchema, 'research');
module.exports
