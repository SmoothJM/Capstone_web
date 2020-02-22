const express = require('express');
const router = express.Router();
const md5 = require('md5');
const multer = require('multer');
const exec = require('child_process').exec;
const fs = require('fs');

const customerModel = require('../data/customerData');
const userModel = require('../data/userData');
const diagnoseModel = require('../data/diagnoseData');
const appointmentModel = require('../data/appointmentData');


const MODEL_DIR = 'E:/keras-yolo3-master/keras-yolo3-master/final_model/';
const TONGUE_DIR = 'C:/Users/14534/WebstormProjects/capstone/server/public/customer/tongue';

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, TONGUE_DIR);
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

let upload = multer({storage: storage});

// Take diagnose, if there is a tongue detected then insert diagnose result into DB.
router.post('/tongue', upload.single('tongueImg'), (req, res, next) => {
    const file = req.file;
    const img_name = file.filename;
    let levels = {
        'Healthy': 1,
        'Mild': 2,
        'Moderate': 3,
        'Severe': 4
    };
    // console.log(file);
    // console.log(img_name);
    exec('python ' + MODEL_DIR + 'od_predict.py ' + img_name, function (error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        let resultArr = stdout.split('loaded.');
        let result = resultArr[resultArr.length - 1];
        result = Number(result);
        if (result > 0) {
            exec('python ' + MODEL_DIR + 'model_diagnose.py ' + img_name, function (err, stdo, stde) {
                if (err) {
                    console.error('error: ' + err);
                    return;
                }
                stdo = String(stdo);
                stdo = stdo.replace('\r\n', '');
                let date = new Date().setHours(new Date().getHours() - 6);
                diagnoseModel.findAllDiagnose({email: req.session.user['email']}, (error, results) => {
                    if (error) throw error;
                    if (results.length > 0) {
                        stdo = results[results.length-1].result;
                        // console.log(results[0].result);
                    }
                    diagnoseModel.insertDiagnose({
                        email: req.session.user['email'],
                        username: req.session.user['username'],
                        result: stdo,
                        img: img_name,
                        time: new Date()
                    }, (err, result) => {
                        if (err) throw err;
                    });
                    res.json({
                        flag: true,
                        result: stdo
                    });
                });
            });
        } else {
            fs.unlink(TONGUE_DIR + '/' + img_name, err => {
                if (err) console.log(err);
            });
            fs.unlink(TONGUE_DIR + '/result_whole/' + img_name, err => {
                if (err) console.log(err);
            });
            res.json({
                flag: false,
                result: "Cannot detected tongue, please use another photo."
            });
        }
    });
});

// Delete one diagnose result
router.delete('/diagnose', (req, res) => {
    diagnoseModel.deleteDiagnose(req.body, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
    fs.unlink(TONGUE_DIR + '/' + req.body['img'], err => {
        if (err) console.log(err);
    });
    fs.unlink(TONGUE_DIR + '/result_whole/' + req.body['img'], err => {
        if (err) console.log(err);
    });
    fs.unlink(TONGUE_DIR + '/result_box/' + req.body['img'], err => {
        if (err) console.log(err);
    });

});

// Return all diagnoses
router.get('/diagnose', (req, res) => {
    let email = req.session.user['email'];
    diagnoseModel.findAllDiagnose({email: email}, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Check the email is duplicate or not when register new customer.
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

// Register new customer.
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

// get customer
router.get('/', (req, res) => {
    let email = req.session.user ? req.session.user['email'] : '';
    customerModel.findCustomer({email: email}, (err, result) => {
        if (err) throw err;
        if (result != null) {
            result = result.toObject();
            delete result.password;
            res.json(result);
        } else {
            res.json('Not user login');
        }

    });
});

// Update customer profile.
router.put('/', (req, res) => {
    let customer = req.body;
    let email = req.body.email;
    delete customer._id;
    delete customer.email;
    // delete customer.__v;
    customerModel.updateCustomer({email: email}, customer, (err, result) => {
        if (err) console.log('');
        res.json('Saved changes.');
    });
    userModel.updateUser({email: email}, {username: customer.username}, (err, result) => {
        if (err) console.log('');
    });
});

// Add new appointment
router.post('/appointment', (req, res) => {
    appointmentModel.addAppointment(req.body, (err, result) => {
        if(err) throw err;
    });
    res.json('Got ya!');
});

// Get latest appointment status
router.get('/appointment', (req, res) => {
   let cusEmail = req.session.user.email;
   appointmentModel.getLastAppointment({cusEmail}, (err, result) => {
      if (err) throw err;
      if (result) {
          res.json(result.status === 'Waiting' || result.status === 'Accepted');
      } else {
          res.json(false);
      }
   });
});

// Get customer by email from front end
router.get('/email/:email', (req, res) => {
   customerModel.findCustomer(req.params, (err, result) => {
       if (err) throw err;
       if(result) {
           result =  result.toObject();
           delete result.password;
           res.json(result);
       } else {
           res.json('Cannot find this customer.');
       }
   });

});

module.exports = router;
