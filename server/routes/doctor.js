const express = require('express');
const router = express.Router();
const doctorModel = require('../data/doctorData');
const userModel = require('../data/userData');
const appointmentModel = require('../data/appointmentData');




// Return all doctors
router.get('/', (req, res) => {
    doctorModel.getDoctors((err, result) => {
        if (err) throw err;
        res.json({doctors: result});
    });
});

// Update doctor's profile
router.put('/', (req, res) => {
    let doctor = req.body;
    let email = doctor['email'];
    delete doctor['email'];
    delete doctor['_id'];
    doctorModel.updateDoctor({email:email}, doctor, (err, result) => {
        if (err) console.log('');
        res.json('Saved changes.');
    });
    userModel.updateUser({email: email}, {username: doctor['username']}, (err, result) => {
        if (err) console.log('');
    });
});

// Return one doctor by email
router.get('/docEmail/:email', (req, res) => {
    doctorModel.getDoctor(req.params, (err, result) => {
        if (err) throw err;
        if(result) {
            result = result.toObject();
            delete result.password;
            res.json(result);
        } else {
            res.json('Login first');
        }
    });
});

// Return all appointments for this doctor
router.get('/appointment', (req, res) => {
    let email = req.session.user.email;
    appointmentModel.getAppointments({'docEmail':email}, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
router.put('/appointment', (req, res) => {
   let id = req.body.id;
   let status = req.body.status;
   appointmentModel.updateAppointmentStatus(id, {status:status}, (err, result) => {
      // if (err) console.log(err);
      res.json(result);
   });
});



module.exports = router;
