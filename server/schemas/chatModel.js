const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chatModel = Schema({
    from: String,
    to: String,
    content: String,
    time: Date
});

let ChatModel = mongoose.model('chat', chatModel, 'chat');
module.exports = ChatModel;


