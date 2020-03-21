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
    res.json(req.body);
});

// Create a doctor
router.post('/doctor', (req, res) => {
    res.json(req.body);
});

module.exports = router;



