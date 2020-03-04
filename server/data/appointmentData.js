require('../dbConnect');
const AppointmentModel = require('../schemas/appointmentModel');

module.exports.addAppointment = function (appointment, cal) {
    AppointmentModel.create(appointment, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.getLastAppointment = function (condition, cal) {
    AppointmentModel.findOne(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    }).sort({_id: -1}).limit(1);
};

module.exports.getAppointments = function (condition, cal) {
    AppointmentModel.find(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    }).sort({_id: 1});
};

module.exports.updateAppointmentStatus = function (condition, status, cal) {
    AppointmentModel.findByIdAndUpdate(condition, status, (err, result) => {
        if (err) throw err;
        cal(result);
    });
};

// module.exports.getDiagnosesByDocEmail = function(condition, cal) {
//   AppointmentModel.aggregate([
//       {$lookup:{
//               from: "customer",
//               localField:"cusEmail",
//               foreignField:"email",
//               as:"appCus"}
//       },
//       {$match:
//               condition
//       },
//       {$project:{
//               _id:0,
//               "appCus.username":1,
//               cusEmail:1,
//               docEmail:1,
//               appointmentDate:1,
//               applyDate:1,
//               status:1}
//       },
//       {$unwind : "appCus"}
//   ], (err, result) => {
//      if (err) throw err;
//      cal(result);
//   });
// };

