# Account Management API

## Node RESTful API 
REST API using Node.js and Express.js framework with node-couchdb.js for working with CouchDB.

## Running API
You need to have installed Node.js and CouchDB 2.0

## Install dependencies 
To install dependencies enter project folder and run following command:
```
npm install
```

### Install CouchDB 2.0 and config : [CoudhDB 2.0](http://couchdb.apache.org)

### Config  : 

Config view document on CouchDB

#### Step 1 : Create Database 
```
 "members" , "accounts" , "transactions"
```


#### Step 2 : Add New View 
- #### members    

    Deisgn Documents > New View

    Design Documents : ```_design/members```

    Index name : ```members-view```

    Map funcion : 
    ```
    function (doc) {
        if(doc.user){
            emit(doc.user,doc);
        }
    }
    ```


- #### accounts
    Deisgn Documents > New View

    Design Documents : ```_design/accounts```

    Index name : ```accounts-view```

    Map funcion : 
    ```
    function (doc) {
        if(doc.user_ac){
            emit(doc.user_ac,doc);
        }
    }
    ```

- #### transactions
    Deisgn Documents > New View

    Design Documents : ```_design/transactions```

    Index name : ```transactions-view```

    Map funcion : 
    ```
    function (doc) {
        if(doc.tran_name){
            emit(doc.tran_name,doc);
        }
    }
    ```

## Run Server 
To run server execute:
 ```
 npm start 
 ```
Run server change port : 
```
PORT=7777 npm start 
```
Run server with Auth CouchDB : 
```
PORT=7777 DB_HOST=localhost DB_PROTOCAL=http DB_PORT=5984 DB_USER=root DB_PASSWORD=password npm start
```

## Use API 
### Manage Members
- Retrieves All members : ```GET:{{host}}/members```<br /><br />

- Retrieves member by primary user : ```GET:{{host}}/members/:user```<br /><br />

- Create member : ```POST:{{host}}/members``` <br /><br />
Permission >>  can use "rw" or "ro"
```json
{
	 "user":  "user", 
 	 "permission":"rw",    
	 "info":{        
            "name":"name",
            "lastname":"lastname",
            "address":"222/222",
            "phone":["090-1234567","090-7654321"],
            "email":"test@gmail.com"
	}
}
```
<br /><br />

- Update member : ```PUT:{{host}}/members```
```json
{
    "id":"id_number", 
    "rev":"rev_number", 
    "user":  "user", 
    "permission":"rw", 
	"info":{        
                "name":"name",
                "lastname":"lastname",
                "address":"222/222",
                "phone":["090-1234567","090-7654321"],
                "email":"test@gmail.com"
	}
}
```
<br /><br />
- Delete member : ```DELETE:{{host}}/members```
```json
{
     "id":"id",
     "rev":"rev"
}
```
<br /><br />




### Manage Accounts 
- Retrieves All accounts : ```GET:{{host}}/accounts```<br /><br />

- Retrieves account by primary user : ```GET:{{host}}/accounts/:user```<br /><br />

- Create account : ```POST:{{host}}/accounts```
```json
{	
	"user_ac":"stevemild",
	"account":{   
            "ac_id":"ac-01",
            "name":"steve",
            "lastname":"mild",
            "cash":"30,000",
            "petty_cash":"45,000",
            "deposit":"1,000",
            "amount":"76,000", 
            "acl":[
                {
                    "user":"stevemild",
                    "permission" : "rw"
                },
                {
                    "user":"necross",
                    "permission" :"ro"
                }
            ]
        }
}
```
<br /><br />

- Update account : ```PUT:{{host}}/accounts```
```json
{	
    "id":"id_number",
    "rev":"rev_number",
	"user_ac":"stevemild",
	"account":{   
            "ac_id":"ac-01",
            "name":"steve",
            "lastname":"mild",
            "cash":"30,000",
            "petty_cash":"45,000",
            "deposit":"1,000",
            "amount":"76,000", 
            "acl":[
                {
                    "user":"stevemild",
                    "permission" : "rw"
                },
                {
                    "user":"necross",
                    "permission" :"ro"
                }
            ]
        }
}
```
<br /><br />

- Delete account : ```DELETE:{{host}}/accounts```
```json
{
    "id":"id_number",
    "rev":"rev_number"
}
```
<br /><br />





### Manage Transactions 
- Retrieves All transactions : ```GET:{{host}}/transactions```<br /><br />

- Retrieves transaction by primary name : ```GET:{{host}}/members/:name```<br /><br />

- Create transaction: ```POST:{{host}}/transactions```
```json
{   
    "tran_name" : "Transactions 2017",
    "updatetime":  "07/06/2560 15:33:12",
    "transactions": [
     {
       "fis_year" : "60",
       "date":"01/04/2560",
       "type":"salary",
       "detail":"salary for Aug",
       "account":[
        {
          "ac_id":"ac-02",
          "amount":"(50,000.00)"
        }
                 ],
        "remark":"xxxx"
    }
 ]
}
```
<br /><br />

- Update transaction:```PUT:{{host}}/transactions```
```json
{   
    "id":"id_number",
    "rev":"rev_member",
    "tran_name" : "Transactions 2017",
    "updatetime":  "07/06/2560 15:33:12",
    "transactions": [
     {
       "fis_year" : "60",
       "date":"01/04/2560",
       "type":"salary",
       "detail":"salary for Aug",
       "account":[
        {
          "ac_id":"ac-02",
          "amount":"(50,000.00)"
        }
                 ],
        "remark":"xxxx"
    }
 ]
}
```
<br /><br />

- Delete transaction:```DELETE:{{host}}/transactions```
```json
{
    "id":"id_number",
    "rev":"rev_number"
}
```

## Access Control List 
### Can config and editor code access control list at "auth.js" 

- path: 
```
manage_account_api/libs/routes/  
```

### auth.js 
```javascript
var rw_members = ["ed05d1affde3a921002af7efcf184d0a","bypass"] // check on firebase 
var rw_accounts = ["bypass"]
var rw_transactions = ["bypass"]

module.exports = {
    rw_members : rw_members,
    rw_accounts : rw_accounts,
    rw_transactions : rw_transactions, 
}
```

### Can use ACL "token" checked with :
```
headers : key="token" , value ="ed05d1affde3a921002af7efcf16f61e"
```

## Modules used
- [express](https://www.npmjs.com/package/express)

- [body-parser](https://www.npmjs.com/package/body-parser)
- [node-couchdb](https://www.npmjs.com/package/node-couchdb)