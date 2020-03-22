const express = require('express');
const router = express.Router();
const doctorModel = require('../data/doctorData');
const userModel = require('../data/userData');
const customerModel = require('../data/customerData');
const md5 = require('md5');
const multer = require('multer');

const PHOTO_DIR = 'public/doctor/photo/';

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, PHOTO_DIR);
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

let upload = multer({storage: storage});


// Get all customer
router.get('/customer', (req, res) => {
    customerModel.getCustomers({}, (err, results) => {
        if(err) throw err;
        if(results) res.json(results);
        else res.json(null);
    });
});

// Delete a customer by email
router.delete('/customer', (req, res) => {
    customerModel.removeCustomer(req.body, (err, result) => {
        if(err) throw err;
        res.json('success');
    });
});


// Get all doctors
router.get('/doctor', (req, res) => {
    doctorModel.getDoctors((err, results) => {
       if(err) throw err;
       if(results) res.json(results);
       else res.json(null);
    });
});

// Delete a doctor by email
router.delete('/doctor', (req, res) => {
    doctorModel.removeDoctor(req.body, (err, result) => {
        if(err) throw err;
        res.json('success');
    });
});

// Create a doctor
router.post('/doctor',upload.single('photo'), (req, res) => {
    req.body['password'] = md5(req.body['password']);
    userModel.addUser({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        status: 0,
        role:1
    }, (err, result) => {
       if(err) throw err;
    });
    doctorModel.addDoctor({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        addr: req.body.addr,
        gender: req.body.gender,
        desc: req.body.desc,
        photo: req.file.filename
    }, (err, result) => {
        if (err) throw err;
        res.json('done');
    })
});

// Check email whether duplicated
router.post('/doctor/checkEmail', (req, res) => {
    userModel.findUser(req.body, (err, result) => {
        if(err) throw err;
        if (result === null) {
            res.json(false);
        } else {
            res.json(true);
        }
    });
});

module.exports = router;



