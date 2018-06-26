var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
var con_Trans = require('.././db/transactions');
var router = express.Router();
var auth = require('./auth');
var rw = auth.rw_transactions


var connect_Trans = con_Trans.connect_Trans
var db_Trans = con_Trans.db_Trans
var view_Trans = con_Trans.view_Trans
var view_Type_trans = con_Trans.view_Type_trans

connect_Trans.listDatabases().then(function(dbs){
     console.log('Connect to  '+ "'Transactions'" + '  doucuments');
 });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:false
}));

router.get('/', function (req, res) {
   connect_Trans.get(db_Trans,view_Trans).then(function(data){
       if(data.data.rows.length <= 0){
           res.json({transactions:'Empty'});
           console.log('transactions : Empty');
       } 
       else{      
       res.json({transactions:data.data.rows});
       console.log(data.data.rows);
       }
   })            
});

router.get('/:name', function (req, res) {
     var type = req.param('name');
     var view_Type = view_Type_trans +'"'+type +'"';
     //var view_Type= '_design/transactions/_view/transactions-view?key="'+type+'"';
   connect_Trans.get(db_Trans,view_Type).then(function(data){
       if(data.data.rows.length <= 0){
           res.json({transactions:'Not found'});
       } 
       else{      
       res.json({transactions:data.data.rows});
       }
       
   })
});


router.post ('/', function (req,res){      
    connect_Trans.uniqid().then(function(ids){
        const id = ids[0];
        var json = req.body;
        var tran_name = json.tran_name
        var updatetime = json.updatetime   
        var fis_year = json.fis_year
        var date = json.date
        var type = json.type
        var detail = json.detail
        var ac_id = json.ac_id
        var amount = json.amount
        var remark = json.remark
        var account = json.account
        var transactions = json.transactions
        var token = req.headers.token

       for(var i = 0; i <= rw.length-1;i++)
        {
            var n = i;
            //console.log(i);
        }
        if(rw[n] === token){
        if(tran_name==="" || updatetime==="" || transactions[0].fis_year==="" || transactions[0].date==="" || transactions[0].type==="" || transactions[0].detail==="" || transactions[0].account[0].ac_id==="" || transactions[0].account[0].amount==="" )
        {
            res.json({msg:'please pass data all field'})
        }
        else{
        connect_Trans.insert(db_Trans,{
            _id:id ,
            tran_name,
            updatetime,
            transactions,
            fis_year,
            date,
            type,
            detail,
            account,
            ac_id,
            amount,
            remark


        }).then(
        function(data,headers,status,err){
            res.json({
    	            msg: 'Create Transactions Complete'
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

    })       
});

router.put ('/', function (req,res){      
       var id = req.body.id;
       var rev = req.body.rev;
       var json = req.body;
        var tran_name = json.tran_name
        var updatetime = json.updatetime   
        var fis_year = json.fis_year
        var date = json.date
        var type = json.type
        var detail = json.detail
        var ac_id = json.ac_id
        var amount = json.amount
        var remark = json.remark
        var account = json.account
        var transactions = json.transactions

        var token = req.headers.token

       for(var i = 0; i <= rw.length-1;i++)
        {
            var n = i;
            //console.log(i);
        }
        if(rw[n] === token){
        if(tran_name==="" || updatetime==="" || transactions[0].fis_year==="" || transactions[0].date==="" || transactions[0].type==="" || transactions[0].detail==="" || transactions[0].account[0].ac_id==="" || transactions[0].account[0].amount==="" )
        {
            res.json({msg:'please pass data all field'})
        }
        else{
        connect_Trans.update(db_Trans,{   
            _id:id,
            _rev:rev,  
            tran_name,
            updatetime,
            transactions,
            fis_year,
            date,
            type,
            detail,
            account,
            ac_id,
            amount,
            remark
        }).then(
        function(data,headers,status){
            res.json({
    	            msg: 'Update Transactions Complete'
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
    connect_Trans.del(db_Trans,id,rev).then(
        function(data,headers,status){
            res.json({
    	            msg: 'Delete Transactions Complete'
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