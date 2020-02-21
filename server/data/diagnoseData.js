require('../dbConnect');
const DiagnoseModel = require('../schemas/diagnoseModel');

module.exports.insertDiagnose = function (diagnose, cal) {
    DiagnoseModel.create(diagnose, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.findAllDiagnose = function (condition, cal) {
    DiagnoseModel.find(condition, (err, results) => {
        if(err) throw err;
        cal(err, results);
    }).sort({ _id: -1 }).limit(5);
};

module.exports.deleteDiagnose = function (condition, cal) {
  DiagnoseModel.deleteOne(condition, (err, result) => {
     if (err) throw err;
     cal(err, result);
  });
};
