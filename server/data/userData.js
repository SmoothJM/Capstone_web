require('../dbConnect');
const UserModel = require('../schemas/userModel');

module.exports.findUser = function (condition, cal) {
    UserModel.findOne(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.addUser = function(user, cal) {
    UserModel.create(user, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.updateUser = function(condition, user, cal) {
    UserModel.updateOne(condition, user, (err, result) => {
        if (err) throw err;
        cal(result);
    });
};







