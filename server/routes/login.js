const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const UserModel = require('../data/userData');
const url = require('url');
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
router.get('/authLogin',(req,res) => {
    // console.log(req.session.username);
    if (req.session && req.session.username) {
        res.json(true);
    } else {
        res.json(false);
    }
});


router.post('/login', (req, res) => {
    // sess = req.session;
    let username = req.body['username'];
    let password = req.body['password'];
    let role = Number(req.body['role']);
    UserModel.findUser({username, password, role}, (err, result) => {
        // console.log(result);
        if (err) throw err;
        if (result === null) {
            res.json({
                correct: false,
                message: 'Username or Password is incorrect. Please try again.'
            });
        } else if (result['state'] === 0) {
            // TODO whole user obj
            req.session.regenerate( (error) => {
                req.session.username = username;
                console.log('after login', username);
                res.json({
                    correct: true,
                    message: `Welcome dear ${username}.`
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

router.get('/logout', (req,res) => {
    console.log('Server logout');
    // sess = req.session;
    req.session.cookie.maxAge = 0;
    req.session.destroy(err => {
        console.log(err);
    });
    res.json('logout done!');
});

router.get('/sess', (req,res) => {
    // console.log('sess:',req.session.username);
    res.json((req.session && req.session.username)? req.session.username:'');
});



module.exports = router;









