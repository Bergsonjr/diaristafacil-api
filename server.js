var express = require('express')
var app = express()

app.get('/hello', function (req, res) {
    res.send("Hello World!")
})

app.post('/hello', function (req, res) {
    res.send("You just called the post method at '/hello'!\n")
})

app.use(function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, function () {
    console.log('Listening on port http://localhost:' + 3000)
});