const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', validateUserId, (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', validateUserId, (req, res) => {
    db.getUserPosts(req.user.id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json({
            message: "An error occured!"
        })
    })
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    db.getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next()
            }else {
                res.status(400).json({
                    message: "invalid user id"
                })
            }
        })
        .catch(err => res.status(500))
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
