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

module.exports.updateCustomer = function (condition, customer, cal) {
    CustomerModel.updateOne(condition, customer, (err, result) => {
        if (err) throw err;
        cal(result);
    });
};

module.exports.getCustomers = function (condition, cal) {
    CustomerModel.find(condition, (err, results) => {
        if(err) throw err;
        cal(err, results);
    })
};
