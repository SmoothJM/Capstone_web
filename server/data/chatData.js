require('../dbConnect');
const ChatModel = require('../schemas/chatModel');

module.exports.findHistory = function (condition, cal) {
    // console.log(condition);
    ChatModel.find().or(condition). exec((err, result)=> {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.addHistory = function (chat, cal) {
    ChatModel.create(chat, (err, result) => {
        if(err) throw err;
        cal(result);
    });
};
