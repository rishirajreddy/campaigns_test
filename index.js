const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const stud_routes = require('./routes/campaign.routes');
const db = require("./config/db");
const app = express();

db.authenticate()
    .then(() => console.log("Connect to Database"))
    .catch(err => console.log(err))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/", stud_routes);
// var mysqlConnection = mySql.createConnection({
//     host:'localhost',
//     user: 'root',
//     password: '',
//     database: 'studentsdb',
//     multipleStatements: true
// });



// mysqlConnection.connect((err) => {
//     if(!err){
//         console.log("Connection established to mysql");
//     }else{ 
//         console.log("Connection failed");
//         console.log(err);
//     }
// })


// app.post("/student", (req,res) => {
//     mysqlConnection.query('INSERT INTO students(name, email, phone) values(?,?,?)', 
//         [req.body.email, req.body.name, req.body.phone],
//         (err, response) => {
//             if(!err){
//                 res.send("Record inserted successfully");
//             }else{
//                 throw err;
//             }
//         }
//     )
// })

// app.get("/students", (req,res) => {
//     mysqlConnection.query('SELECT * FROM students', (err,result) => {
//         if(err){
//             throw err;
//         }else {
//             console.log("Fetched");
//             res.send(result);
//         }
//     })
// })

// app.get('/students/:id' , (req , res)=>{
//     mysqlConnection.query(`SELECT * FROM students WHERE id = ?`,[req.params.id] ,(err, rows, fields) => {
//         if(err){
//             throw err;
//         }else {
//             res.send(rows);
//         }
//     })
// })

// app.put('/students/:id' , (req , res)=>{
//     mysqlConnection.query('UPDATE students SET phone=? WHERE id=?', 
//     [req.body.phone, req.params.id], (err, rows, fields) => {
//         if(err){
//             throw err;
//         }else {
//             res.send(rows);
//         }
//     })

// })

// app.delete('/students/:id' , (req , res)=>{
//     mysqlConnection.query('DELETE FROM students WHERE id=?', [req.params.id],(err,result) => {
//         if(err){
//             throw err;
//         }else {
//             res.send(result);
//         }
//     })

// })
app.listen(3000, () => {
    console.log("Serve up and running....");
})