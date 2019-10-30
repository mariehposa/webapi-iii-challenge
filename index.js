// code away!
const server = require('./server')

server.listen(process.env.PORT || 3000, () => {
    console.log('Port is listening on ' + (process.env.PORT || 3000))
})