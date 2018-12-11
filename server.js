const dd_options = {
    'response_code': true,
    'tags': ['app:diaristafacil']
}
const connect_datadog = require('connect-datadog')(dd_options)
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.use(connect_datadog);
app.use(cors())
app.use(compression());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json

app.use('/3drparty', express.static(__dirname + '/node_modules'));
app.use('/public', express.static(__dirname + '/dist/public_files'));
app.use(express.static(__dirname + '/dist'));                    // set the static files location /public/img will be /img for users


app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/dist' });
});

app.listen(3000, function () {
    console.log('Listening on port http://localhost:' + 3000)
});