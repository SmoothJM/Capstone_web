require('../dbConnect');
const AppointmentModel = require('../schemas/appointmentModel');

module.exports.addAppointment = function (appointment, cal) {
    AppointmentModel.create(appointment,(err, result) => {
        if(err) throw err;
        cal(err, result);
    });
};

module.exports.getLastAppointment = function(condition, cal) {
    AppointmentModel.findOne(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    }).sort({ _id: -1 }).limit(1);
};


