let SQLQueryBad = require('./public/js/dbUserSearch');

const express = require('express');
const bodyParser = require("express");
const app = express();
const port = 80;
let query = new SQLQueryBad();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function(){
    console.log("Server started");
})

app.post("/account", (req,res) => {
    let data = req.body;
    console.log("Login Daten: " + req.body);
    res.send({foo : 'bar'})
})
