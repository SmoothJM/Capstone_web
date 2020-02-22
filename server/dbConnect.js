const mongoose = require('mongoose');
let URL = 'mongodb://localhost:27017/capstone';

mongoose.connect(URL, { useNewUrlParser: true});

let db = mongoose.connection;
mongoose.set('useFindAndModify', false);
db.once('open', () => console.log('Mongodb connected!'));
