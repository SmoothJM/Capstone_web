require('../dbConnect');
const DoctorModel = require('../schemas/doctorModel');

module.exports.getDoctors = function (cal) {
    DoctorModel.find((err,result) => {
        if (err) throw err;
        cal(err, result);
    });
};



