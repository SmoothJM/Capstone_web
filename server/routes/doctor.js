const express = require('express');
const router = express.Router();
const doctorModel = require('../data/doctorData');

router.get('/', (req,res) => {
    // console.log('http to doctors');
    doctorModel.getDoctors((err, result) => {
       if(err) throw err;
       res.json({doctors:result});
    });
});


module.exports = router;
