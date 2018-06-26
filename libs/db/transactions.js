var con = require('./config/couch_db');
var couch = con.connect
var dbName ='transactions'; 
var view_Trans ='_design/transactions/_view/transactions-view';
var view_Type= '_design/transactions/_view/transactions-view?key=';
 module.exports = {
    db_Trans: dbName,
    view_Trans: view_Trans,
    connect_Trans: couch ,
    view_Type_trans : view_Type
 }

