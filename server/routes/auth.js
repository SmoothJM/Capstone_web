const express = require('express');
// const session = require('express-session');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const url = require('url');

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
//     res.json(true);
//     // next();
// });

router.get('/authLogin',(req,res) => {
    // let flag = req.session.username;
    // console.log(req.session);
    if (!req.session.username) {
        res.json(false);
    } else {
        res.json(true);
    }
    // res.json(true);
});


module.exports = router;






