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

router.get('/', (req,res) => {
    let email = req.session.user?req.session.user['email']:'';
    customerModel.findCustomer({email:email},(err, result) => {
        if (err) throw err;
        result = result.toObject();
        delete result.password;
        res.json(result);
    });
});

router.put('/', (req, res) => {
    let customer = req.body;
    let email = req.body.email;
    delete customer._id;
    delete customer.email;
    // delete customer.__v;
    customerModel.updateCustomer({email:email}, customer, (err, result) => {
        if (err) console.log('');
        res.json('Saved changes.');
    });
    userModel.updateUser({email:email}, {username:customer.username},(err, result) => {
       if(err) console.log('');console.log(result);
    });
});

module.exports = router;
