const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let appointmentModel = Schema({
    docEmail: String,
    cusEmail: String,
    appointmentDate: Date,
    applyDate: Date,
    status: String
});

let AppointmentModel = mongoose.model('appointment', appointmentModel, 'appointment');
module.exports = AppointmentModel;


















