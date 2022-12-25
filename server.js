const express = require('express')
const mysql= require ('mysql') 
const BodyParser=require("body-parser")
const app= express()

//server baru http
const http=require("http")
const server=http.createServer(app)
const {Server}=require("socket.io")
const io=new Server (server)

app.use(BodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.set("views","views")

const db= mysql.createConnection ( {
    host : "localhost",
    database : "chatgirl",
    user : "root",
    password : "",
    
})
//database connect
db.connect ((err)=> {
    if (err) throw err
    console.log("database connect")
    //get data
    app.get ("/", function (req, res) {
        const sql="SELECT * FROM data"
        db.query(sql,(err,result)=> {
        const users= JSON.parse(JSON.stringify(result))
        res.render("index",{users : users, title : "Chat Web "})
        })
    } )

    app.get("/chat",(req,res)=>{
        res.render("chat",{title : "Masuk Room"})
    })
    //insert data 
    app.post("/tambah",(req,res)=> {
    var insertsql= `INSERT INTO data (NAMA,ALAMAT) VALUES ('${req.body.nama}', '${req.body.alamat}')`;
    db.query(insertsql,(err,result) =>{
        if (err) throw err
        res.redirect("/");
        })
    })
    })

    io.on("connection",(socket)=>{
        socket.on("message",(data)=>{
            const {id,message} = data
            socket.broadcast.emit("message",id,message)
        })
    })
    server.listen(9000, function () {
    console.log ("server ready")
    })