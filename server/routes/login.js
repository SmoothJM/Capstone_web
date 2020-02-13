const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const UserModel = require('../data/userData');
const url = require('url');
const md5 = require('md5');
// const session = require('express-session');
// let sess;
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(session({
//     secret: 'BTD secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {secure: true}
// }));

// router.use((req,res,next) => {
//     console.log(req.url);
//     console.log(url.parse(req.url));
//
// });

// verify user login and not access URL beyond rights.
router.post('/authLogin', (req, res) => {
    let accessURL = req.body['accessURL'];

    let role = 0;
    if (accessURL === 'doctor') role = 1;
    else if (accessURL === 'admin') role = 2;
    if (req.session && req.session.user && req.session.user['role'] === role) {
        res.json(true);
    } else {
        res.json(false);
    }
});


router.post('/login', (req, res) => {
    let email = req.body['email'];
    let username = req.body['username'];
    let password = md5(req.body['password']);
    let role = Number(req.body['role']);
    UserModel.findUser({email, password, role}, (err, result) => {
        if (err) throw err;
        if (result === null) {
            res.json({
                correct: false,
                message: 'Email or Password is incorrect. Please try again.'
            });
        } else if (result['status'] === 0) {
            req.session.regenerate((error) => {
                username = result['username'];
                result['password']='';
                req.session.user = result;
                // req.session.username['password'] = '';
                res.json({
                    correct: true,
                    message: `Welcome dear ${username}.`,
                    username: username
                });
            });
        } else {
            res.json({
                correct: false,
                message: 'This account is blocked, please contact administrator.'
            });
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.cookie.maxAge = 0;
    req.session.destroy(err => {
        if (err) throw err;
    });
    res.json('logout done!');
});

router.get('/sess', (req, res) => {
    res.json((req.session && req.session.user) ?
        {
            username: req.session.user['username'],
            role: req.session.user['role'],
            email: req.session.user['email']
        } :
        '');
});


module.exports = router;









