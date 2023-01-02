const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')

const app =express();

app.use(cors());
app.use(bodyparser.json());


//connect mysql Database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'subject',
    port:3306
})

//check database connection

db.connect(err =>{
    if(err){console.log('err')}
    console.log('Database connected successfull!!')
})

//get all data
app.get('/computer',(req,res)=>{
    // console.log('Get All computer');
    let qrr= 'SELECT * FROM computer';
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        if(results.length>0){
            res.send({
                message:'All computer Data',
                data:results
            });
        };
    });
});

//get single data by ID
app.get('/computer/:id',(req,res)=>{
    // console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT * FROM computer where id = ${qrId}`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0){
            res.send({
                message:"Get data by ID",
                data:results
            })
        }else{
            res.send({
                message:"Data not found here!"
            });
        };
    });
});

//post data
app.post('/computer',(req,res)=>{
    let subjectName = req.body.subjectname;
    let Professor = req.body.professor;
    let Mobile = req.body.mobile;

    let qr = `insert into computer(subjectname,professor,mobile)value('${subjectName}','${Professor}','${Mobile}')`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:"Data added successfull",
            data:results
        });
    });
});

// update data
app.put('/computer/:id',(req,res)=>{
    // console.log(req.body,"update data")

    let sID = req.params.id;
    let subjectName = req.body.subjectname;
    let Professor = req.body.professor;
    let Mobile = req.body.mobile;

    let qr = `UPDATE computer set subjectname = '${subjectName}', professor= '${Professor}', mobile = '${Mobile}' where id = ${sID}`;
    db.query(qr,(err,results)=>{
        if(err) {
            console.log(err)
            res.send({
                message:"Data update successfull",
                data:results
            });
        };
    });
});

// delete data
app.delete('/computer/:id',(req,res)=>{
    let sID= req.params.id;
    let qr= `delete from computer where id = '${sID}'`;
    db.query(qr,(err,results)=>{
        if(err){
            connsole.log(err)
        };
        res.send({
            message:"data deleted successfull"
        });
    });
});

app.listen(2000, ()=>{
    console.log("server is running on 2000 PORT,kavyacode");
})