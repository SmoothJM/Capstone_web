require('../dbConnect');
const DoctorModel = require('../schemas/doctorModel');

module.exports.getDoctors = function (cal) {
    DoctorModel.find((err,result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.getDoctor = function (condition, cal) {
    DoctorModel.findOne(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.updateDoctor = function (condition, doctor, cal) {
    DoctorModel.updateOne(condition, doctor, (err, result) => {
        if (err) throw err;
        cal(result);
    });
};

module.exports.removeDoctor = function (condition, cal) {
    DoctorModel.deleteOne(condition, (err, result) => {
       if (err) throw err;
       cal(err, result);
    });
};
module.exports.addDoctor = function (doctor, cal) {
    DoctorModel.create(doctor, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};
