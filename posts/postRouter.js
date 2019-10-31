const express = require('express');
const db = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: "Än error occured!"
        })
    })
});

router.get('/:id', validatePostId, (req, res) => {
    db.getById(req.post.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
});

router.delete('/:id', validatePostId, (req, res) => {
    db.remove(req.post.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occured!"
            })
        })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
    db.update(req.post.id, req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(400).json({
                message: "missing required name field"
            })
        })
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params

    db.getById(id)
        .then(post => {
            if (post) {
                req.post = post
                next()
            } else {
                res.status(404).json({
                    message: "invalid post id"
                })
            }
        })
        .catch(err => {
            res.status(404)
        })
};

function validatePost(req, res, next){
    if(Object.keys(req.body).length) {
        if (req.body.text) {
            next()
        }  else {
            res.status(400).json({
                message: "missing required name field"
            })
        }
    } else {
        res.status(400).json({
            message: "missing user data"
        })
    }
}

module.exports = router;