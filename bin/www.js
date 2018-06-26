var app = require('.././libs/app');
var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    console.log('Starting server on port ' + port)
});