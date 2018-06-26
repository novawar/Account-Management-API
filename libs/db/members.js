var con = require('./config/couch_db');
var couch = con.connect
var dbName ='members'; 
var view_Members ='_design/members/_view/members-view';
var view_Type= '_design/members/_view/members-view?key=';


module.exports = {
    db_Members: dbName, 
    view_Members: view_Members,
    connect_Members :couch,
    view_Type_members : view_Type

 }
