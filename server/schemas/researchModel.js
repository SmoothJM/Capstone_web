const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let researchSchema = Schema({
   email: String,
   author: String,
   title: String,
   abstract: String,
   category: String,
   issueDate: Date,
   paper: String
});

let ResearchModel = mongoose.model('research', researchSchema, 'research');
module.exports = ResearchModel;
