
var app = require('express')();
var members = require('./routes/members');
var accounts = require('./routes/accounts');
var transactions = require('./routes/transactions');

app.use('/members',members);
app.use('/accounts',accounts);
app.use('/transactions',transactions);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404);
    res.json({ 
    	error: 'Not found' 
    });
    return;
});




app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({ 
    	error: err.message 
    });
    return;
});

module.exports = app; 