const express = require('express');
const router = express.Router();
const customerModel = require('../data/customerData');
const md5 = require('md5');
const userModel = require('../data/userData');

router.post('/checkEmail', (req, res) => {
    let email = req.body['email'];
    customerModel.findCustomer({email: email}, (err, result) => {
        if (err) throw err;
        if (result === null) {
            res.json(false);
        } else {
            res.json(true);
        }
    })
});

router.post('/', (req, res) => {
    req.body['password'] = md5(req.body['password']);
    let customer = req.body;
    customerModel.addCustomer(customer, (err, result) => {
        if (err) throw err;
    });
    let user = {
        email: customer['email'],
        username: customer['username'],
        password: customer['password'],
        status: 0,
        role: 0,
    };
    userModel.addUser(user, (err, result) => {
        if (err) throw err;
    });
    res.json({message: 'Add customer success!'});
});
module.exports = router;
