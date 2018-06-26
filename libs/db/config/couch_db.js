var NodeCouchDb = require('node-couchdb');
var couch = new NodeCouchDb({
     host:process.env.DB_HOST || 'localhost',
     protocol:process.env.DB_PROTOCAL || 'http',
     port:process.env.DB_PORT || '5984',
     auth:{
         user:process.env.DB_USER || 'root',
         password:process.env.DB_PASSWORD || 'password'
     }
 });
 
 module.exports = {
    connect :couch
 }

