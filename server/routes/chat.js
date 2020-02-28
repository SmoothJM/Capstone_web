const express = require('express');
const router = express.Router();
const chatModel = require('../data/chatData');

// Get all chat history between two users
router.get('/:from/:to', (req, res) => {
    let e1 = req.params.from;
    let e2 = req.params.to;

    let condition = [
        {from: e1, to: e2},
        {from: e2, to: e1}
    ];
    chatModel.findHistory(condition, (err, result) => {
        if(result) res.json(result);
        else res.json('empty');
    });

});

// Add one history into DB
router.post('/', (req, res) => {
    res.json(req.body);
});


module.exports = router;

