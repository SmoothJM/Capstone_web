const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const MODEL_DIR = 'E:\\keras-yolo3-master\\keras-yolo3-master\\final_model\\';
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');

const login = require('./routes/login');
const auth = require('./routes/auth');

app.use(session({
    secret: 'BTD secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000
    }
}));

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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(MODEL_DIR+'data'));


app.use(function (req, res, next) {
    console.log(req.url, ' arrived at: ', Date.now());
    next();
});
app.use('/api', login);
// app.get('/authLogin', login);
// app.post('/login', login);
// app.get('/sess', login);
// app.get('/logout', login);

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, MODEL_DIR+'data');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
});

let upload = multer({storage: storage});

app.post('/api/uploadTongue', upload.single('tongueImg'), (req, res, next) => {
    const file = req.file;
    const img_name = file.filename;
    exec('python '+MODEL_DIR+'od_predict.py ' + img_name, function (error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        let resultArr = stdout.split('loaded.');
        let result = resultArr[resultArr.length - 1];
        result = Number(result);
        if(result>0){
            exec('python '+MODEL_DIR+'model_diagnose.py ' + img_name, function (err, stdo, stde) {
                if (err) {
                    console.error('error: ' + err);
                    return;
                }
                res.json({
                    flag: true,
                    result: stdo
                });
            });
        }else{
            res.json({
                flag: false,
                result: "Cannot detected tongue, please use another photo."
            });
        }

    });
});

// app.post('/upload', (req, res) => {
//     const form = new multiparty.Form();
//     form.uploadDir = MODEL_DIR+'data';
//     form.parse(req, (err, fields, files) => {
//         let img_path_arr = files.img[0].path.split('\\');
//         let len = img_path_arr.length;
//         let img_name = img_path_arr[len - 1];
//
//         exec('python '+MODEL_DIR+'od_predict.py ' + img_name, function (error, stdout, stderr) {
//             if (error) {
//                 console.error('error: ' + error);
//                 return;
//             }
//             let resultArr = stdout.split('loaded.');
//             let result = resultArr[resultArr.length - 1];
//             result = Number(result);
//             if(result>0){
//                 exec('python '+MODEL_DIR+'model_diagnose.py ' + img_name, function (err, stdo, stde) {
//                     if (err) {
//                         console.error('error: ' + err);
//                         return;
//                     }
//                     res.render('upload', {
//                         username: fields.name[0],
//                         result: stdo
//                     });
//                 });
//             }else{
//                 res.send("<script>location.href='/';alert('No tongue detected. Please upload again.');</script>");
//             }
//
//         });
//     });
//     // console.log(req.body);
// });

app.listen(3000, '127.0.0.1');

