const express = require('express');
const router = require('./posts/postRouter');
const server = express();

server.use('/api/posts', router)

server.post('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.now())
  next()
};

module.exports = server;
