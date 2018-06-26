
var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
var con_Accounts = require('.././db/accounts');
var auth = require('./auth');
var rw = auth.rw_accounts


var router = express.Router();

var connect_Accounts = con_Accounts.connect_Accounts
var db_Accounts = con_Accounts.db_Accounts
var view_Accounts = con_Accounts.view_Accounts
var view_Type_accounts = con_Accounts.view_Type_accounts

connect_Accounts.listDatabases().then(function(dbs){
     console.log('Connect to  '+ "'Accounts'" + '  doucuments');
 });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:false
}));


router.get('/', function (req, res) {
   connect_Accounts.get(db_Accounts,view_Accounts).then(function(data){
        if(data.data.rows.length <= 0){
           res.json({accounts:'Empty'});
           console.log('accounts : Empty');
       } 
       else{      
       res.json({accounts:data.data.rows});
       console.log(data.data.rows);
       }
   })            
});



router.get('/:user', function (req, res) {
     var type = req.param('user');
     var view_Type = view_Type_accounts +'"'+type +'"';
     //var view_Type= '_design/accounts/_view/accounts-view?key="'+type+'"';
  
   connect_Accounts.get(db_Accounts,view_Type).then(function(data){
       if(data.data.rows.length <= 0){
           res.json({accounts:'Not found'});
       } 
       else{      
       res.json({accounts:data.data.rows});
       }
       
   })
});

router.post ('/', function (req,res){
    connect_Accounts.uniqid().then(function(ids){
        const id = ids[0];
        var json = req.body
        var user_ac = json.user_ac 
        var ac_id = json.ac_id
        var name = json.name
        var lastname = json.lastname
        var cash = json.cash 
        var petty_cash = json.petty_cash
        var deposit = json.deposit
        var amount = json.amount
        var user = json.user
        var permission = json.permission
        var acl = json.acl
        var account = json.account                              
        var token = req.headers.token
        
        for(var i = 0; i <= rw.length-1;i++)
        {
            var n = i;
            //console.log(i);      
        }
        if(rw[n] === token){
        if(user_ac==="" || account.ac_id==="" || account.name==="" || account.lastname==="" || account.cash==="" || account.petty_cash==="" || account.deposit==="" || account.amount==="" ||account.acl.user==="" || account.acl.permission==="" ||account.acl[0].user==="" || account.acl[0].permission==="")
        {
            res.json({msg:'please pass data all field'})
        }
        else{
        connect_Accounts.insert(db_Accounts,{
            _id:id ,
            user_ac,
            account,
            ac_id,
            name,
            lastname,
            cash,
            petty_cash,
            deposit,
            amount,
            acl,
            user,
            permission

        }).then(
        function(data,headers,status,err){
            res.json({
    	            msg: 'Create Accounts Complete'
           });  
        }
        ,
        function(err){
            res.send(err);
        
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
       var user_ac = json.user_ac 
        var ac_id = json.ac_id
        var name = json.name
        var lastname = json.lastname
        var cash = json.cash 
        var petty_cash = json.petty_cash
        var deposit = json.deposit
        var amount = json.amount
        var user = json.user
        var permission = json.permission
        var acl = json.acl
        var account = json.account
        var token = req.headers.token
    
       for(var i = 0; i <= rw.length-1;i++)
        {
            var n = i;
            //console.log(i);
        }
        if(rw[n] === token){
       if(user_ac==="" || account.ac_id==="" || account.name==="" || account.lastname==="" || account.cash==="" || account.petty_cash==="" || account.deposit==="" || account.amount==="" ||account.acl.user==="" || account.acl.permission==="" ||account.acl[0].user==="" || account.acl[0].permission==="")
       {
           res.json({msg:'please pass data all field'})
       }
       else{
       connect_Accounts.update(db_Accounts,{   
            _id:id ,
            _rev:rev,
            user_ac,
            account,
            ac_id,
            name,
            lastname,
            cash,
            petty_cash,
            deposit,
            amount,
            acl,
            user,
            permission

        }).then(
        function(data,headers,status){
            res.json({
    	            msg: 'Update Accounts Complete'
           });  
        },
        function(err){
            res.send(err);
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
    connect_Accounts.del(db_Accounts,id,rev).then(
        function(data,headers,status){
            res.json({
    	            msg: 'Delete Accounts Complete'
           });                                                                                                             
        },
        function(err){
            res.send(err);
        });
    }
    else{
    res.json({msg:'cannot access'});
}
});

module.exports = router;