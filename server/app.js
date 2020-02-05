const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const customer = require('./routes/customer');
const login = require('./routes/login');
const doctor = require('./routes/doctor');

const app = express();

app.use(session({
    secret: 'BTD secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 10 * 60 * 1000
    }
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/customer', customer);
app.use('/api/doctor', doctor);
app.use('/api', login);

app.listen(3000, '127.0.0.1');


// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Credentials', false);
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//     next();
// });
//
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     if(req.method=="OPTIONS") res.sendStatus(200);
//     else  next();
// });
// app.use(cors({origin: '*'}));
