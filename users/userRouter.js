const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', validateUserId, (req, res) => {

});

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    db.getById(req.user.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
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

router.delete('/:id', validateUserId, (req, res) => {
    db.remove(req.user.id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json({
            message: "An error occured!"
        })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    db.update(req.user.id, req.body)
        .then(userName => {
            res.status(200).json(userName)
        })
        .catch(error => {
            res.status(400).json({
                message: "missing required name field"
            })
        })
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
    if (Object.keys(req.body).length) {
        next()
    } else {
        res.status(400).json({
            message: "missing user data"
        })
    }
};

function validatePost(req, res, next) {

};

module.exports = router;
