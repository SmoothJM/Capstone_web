require('../dbConnect');
const CustomerModel = require('../schemas/customerModel');

module.exports.findCustomer = function (condition, cal) {
    CustomerModel.findOne(condition, (err, result) => {
        if (err) throw err;
        cal(err, result);
    });
};

module.exports.addCustomer = function (customer, cal) {
    CustomerModel.create(customer,(err, result) => {
        if(err) throw err;
        cal(err, result);
    });
};
