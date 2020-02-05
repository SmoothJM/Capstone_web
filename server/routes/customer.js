const express = require('express');
const router = express.Router();
const customerModel = require('../data/customerData');
const md5 = require('md5');
const userModel = require('../data/userData');
const multer = require('multer');
const MODEL_DIR = 'E:/keras-yolo3-master/keras-yolo3-master/final_model/';
const TONGUE_DIR = 'C:/Users/14534/WebstormProjects/capstone/front/src/assets/customer/tongue';
const exec = require('child_process').exec;


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, TONGUE_DIR);
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
});

let upload = multer({storage: storage});

router.post('/tongue', upload.single('tongueImg'), (req, res, next) => {
    const file = req.file;
    const img_name = file.filename;
    // console.log(file);
    // console.log(img_name);
    exec('python '+MODEL_DIR+'od_predict.py ' + img_name, function (error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        let resultArr = stdout.split('loaded.');
        let result = resultArr[resultArr.length - 1];
        result = Number(result);
        if(result>0){
            exec('python '+MODEL_DIR+'model_diagnose.py ' + img_name, function (err, stdo, stde) {
                if (err) {
                    console.error('error: ' + err);
                    return;
                }
                res.json({
                    flag: true,
                    result: stdo
                });
            });
        }else{
            res.json({
                flag: false,
                result: "Cannot detected tongue, please use another photo."
            });
        }
    });
});
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
       if(err) console.log('');
    });
});



module.exports = router;
