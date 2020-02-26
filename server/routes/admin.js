const express = require('express');
const router = express.Router();
const doctorModel = require('../data/doctorData');
const userModel = require('../data/userData');
const customerModel = require('../data/customerData');


// Get all customer
router.get('/customer', (req, res) => {
    customerModel.getCustomers({}, (err, results) => {
        if(err) throw err;
        if(results) res.json(results);
        else res.json(null);
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


module.exports = router;



