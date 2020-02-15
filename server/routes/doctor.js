const express = require('express');
const router = express.Router();
const doctorModel = require('../data/doctorData');
const userModel = require('../data/userData');

router.get('/', (req, res) => {
    doctorModel.getDoctors((err, result) => {
        if (err) throw err;
        res.json({doctors: result});
    });
});

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

router.get('/:email', (req, res) => {
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


module.exports = router;
