var con = require('./config/couch_db');
var couch = con.connect
var dbName ='accounts'; 
var view_Accounts = '_design/accounts/_view/accounts-view';
var view_Type = '_design/accounts/_view/accounts-view?key=';
 module.exports = {
    db_Accounts : dbName,
    view_Accounts : view_Accounts,
    connect_Accounts : couch,
    view_Type_accounts : view_Type
 }

