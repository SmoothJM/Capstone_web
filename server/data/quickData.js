require('../dbConnect');
const QuickDiagnoseModel = require('../schemas/quickDiagnoseModel');

module.exports.insertQuickDiagnose = function (quick, cal) {
    QuickDiagnoseModel.create(quick, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};
