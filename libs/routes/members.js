var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
var con_Members = require('.././db/members');
var router = express.Router();
var auth = require('./auth');
var rw = auth.rw_members


var connect_Members = con_Members.connect_Members
var db_Members = con_Members.db_Members
var view_Members = con_Members.view_Members
var view_Type_members = con_Members.view_Type_members


connect_Members.listDatabases().then(function(dbs){
     console.log('Connect to  '+ "'Members'" + '  doucuments');
 });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:false
}));

router.get('/', function (req, res) {
   connect_Members.get(db_Members,view_Members).then(function(data){
       if(data.data.rows.length <= 0){
           res.json({members:'Empty'});
           console.log('members : Empty');
       }
       else{      
       res.json({members:data.data.rows});
       console.log(data.data.rows);
    } 
   })            
});




router.get('/:user', function (req, res) {
     var type = req.param('user');
     var view_Type = view_Type_members +'"'+type +'"';
     //var view_Type= '_design/members/_view/members-view?key="'+type+'"'; 
   connect_Members.get(db_Members,view_Type).then(function(data){ 
       if(data.data.rows.length <= 0){
           res.json({members:'Not found'});
       } 
       else{      
       res.json({members:data.data.rows});
       }      
   })
});

router.post ('/', function (req,res){       
  connect_Members.uniqid().then(function(ids){
        const id = ids[0];
        var json = req.body
        var user = json.user
        var permission = json.permission
        var name  = json.name 
        var lastname = json.lastname
        var address = json.address
        var phone = json.phone
        var email = json.email
        var info = json.info 
        var token = req.headers.token

       for(var i = 0; i <= rw.length-1;i++)
        {
            var n = i;
            //console.log(i);
        }
        if(rw[n] === token){
        if(user === "" ||permission !== "rw" && permission !=="ro" || info.name === "" || info.lastname===""|| info.phone==="" || info.phone[0]=== "" || info.email=== ""){
            res.json({msg:'please pass data all field'})
        }
        else{
        connect_Members.insert(db_Members,{
            _id:id ,
            user,
            permission,
            info, 
            name,
            lastname,
            address,
            phone,
            email
 
        }).then(
        function(data,headers,status,err){
            res.json({
    	            msg: 'Create Members Complete'
           });  
        },
        function(err){
            res.json(err);
        
        });
      }     
    }
    else{
    res.json({msg:'cannot access'});
}

})      
});   
 


router.put ('/', function (req,res){      
       var id = req.body.id;
       var rev = req.body.rev;
       var json = req.body;
       var user = json.user
       var permission = json.permission
        var name  = json.name 
        var lastname = json.lastname
        var address = json.address
        var phone = json.phone
        var email = json.email
        var info = json.info 
        var token = req.headers.token

       for(var i = 0; i <= rw.length-1;i++)
        {
            var n = i;
            //console.log(i);
        }
        if(rw[n] === token){
       if(user === "" ||permission !== "rw" && permission !=="ro"|| info.name === ""  || info.lastname===""|| info.phone==="" || info.phone[0]=== "" || info.email=== "")
       {
           res.json({msg:'please pass data all field'})
       } 
       else{
        connect_Members.update(db_Members,{   
            _id:id,
            _rev:rev,
            user,
            permission,
            info, 
            name,
            lastname,
            address,
            phone,
            email

        }).then(
        function(data,headers,status){
            res.json({
    	            msg: 'Update Members Complete'
           });  
        },
        function(err){
            res.json(err);
        });
       }
    }
    else{
    res.json({msg:'cannot access'});
}
});

router.delete('/',function(req,res){
    const id = req.body.id;
    const rev = req.body.rev;
    var token = req.headers.token

       for(var i = 0; i <= rw.length-1;i++)
        {
            var n = i;
            //console.log(i);
        }
        if(rw[n] === token){

    connect_Members.del(db_Members,id,rev).then(
        function(data,headers,status){
                 res.json({
    	            msg: 'Delete Members Complete'
           });                                                                                                            
        },
        function(err){
            res.json(err);   
     });
    }
    else{
    res.json({msg:'cannot access'});
}
});






module.exports = router;