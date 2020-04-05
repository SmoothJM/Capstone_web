const express = require('express');
const router = express.Router();
const multer = require('multer');
const exec = require('child_process').exec;
const fs = require('fs');

const quickDiagnoseModel = require('../data/quickData');


const MODEL_DIR = 'public/keras-yolo3-master/final_model/';
const TONGUE_DIR = 'public/customer/tongue';

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, TONGUE_DIR);
    },
    filename: (req, file, callBack) => {
        callBack(null, 'quick-' + file.fieldname + '-' + Date.now() + '.jpg')
    }
});

let upload = multer({storage: storage});

// Quick test
router.post('/tongue', upload.single('tongueImg'), (req, res, next) => {
    const file = req.file;
    const img_name = file.filename;
    let levels = ['Healthy', 'Mild', 'Moderate', 'Severe'];
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
                stdo = stdo.replace('[', '');
                stdo = stdo.replace(']', '');
                let arr = stdo.split(', ').map(ele => {
                    return Number(ele);
                });
                let percentage = Math.max(...arr);
                let level = levels[arr.indexOf(percentage)];
                quickDiagnoseModel.insertQuickDiagnose({
                    result: level,
                    img: img_name,
                    time: new Date(),
                    percentage: percentage
                }, (err, result) => {
                    if (err) throw err;
                });
                res.json({
                    flag: true,
                    result: level,
                    img: img_name,
                    percentage: percentage
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

module.exports = router;
