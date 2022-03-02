const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


// database connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'package-delivery-system-db',
    port: 3306
});

// check database connection

db.connect(err=>{
    if(err){
        console.log(err, "db-err");
    }
    console.log("database connected");
});

// get all data

app.get('/user', (req,res)=>{

    let qr = 'select * from user';
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, "err")
        }
        if(result.length>0){
            res.send({
                message: "all user data",
                data: result
            })
        }
    });
});


// get single data

app.get('/user/:id', (req, res)=>{
    
    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;

    db.query(qr, (err, result)=>{

        if(err){
            console.log(err);
        }
        if(result.length > 0){
            res.send({
                message: 'get single data',
                data: result
            });
        }
        else{
            res.send({
                message: 'data not found'
            });
        }
    });
});


// create/post data

app.post('/user', (req, res)=>{
    
    console.log(req.body, 'createdata');

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    let password = req.body.password;

    let qr = `insert into user(fullname, email, number, password) 
                values('${fullName}','${eMail}', '${mb}', '${password}')`;

    console.log(qr, 'qr');
    
    db.query(qr, (err, result) =>{
        if(err){
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted',
        });
    });
});


// put/update single data

app.put('/user/:id', (req, res)=>{

    console.log(req.body, 'updateData');

    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    let password = req.body.password;

    let qr = `update user set fullname = '${fullName}', email = '${eMail}', number = '${mb}', password = '${password}'
              where id = ${gID}`;

    db.query(qr, (err, result)=>{

        if(err){
            console.log(err);
        }
        res.send({
            message: "data updated"
        });
    });
});


// delete single data

app.delete('/user/:id', (req, res)=>{

    let gID = req.params.id;
    let qr = `delete from user where id = ${gID}`;

    db.query(qr, (err, result)=>{
        if(err){
            console.log(err);
        }

        res.send({
            message: "data deleted"
        })
    });
});









app.listen(3000, ()=>{
    console.log("server running..");
})

