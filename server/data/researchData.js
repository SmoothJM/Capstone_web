require('../dbConnect');
const ResearchModel = require('../schemas/researchModel');

module.exports.findResearch = function (condition, cal) {
    ResearchModel.find(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.removeResearch = function (condition, cal) {
    ResearchModel.deleteOne(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.insertResearch = function (research, cal) {
    ResearchModel.create(research, (err, result) => {
        if(err) throw err;
        cal (err, result);
    });
};
