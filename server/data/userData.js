require('../dbConnect');
const UserModel = require('../schemas/userSchema');

module.exports.findUser = function (condition, cal) {
    UserModel.findOne(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};








