let SQLQueryBad = require('./public/js/dbUserSearch');

const express = require('express');
const app = express();
const port = 80;
let query = new SQLQueryBad();

app.use(express.static("public"));

app.listen(port, function(){
    console.log("Server started");
})
