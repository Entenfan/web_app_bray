const express = require('express');
//const cookieParser = require('cookie-parser');
const app = express();
const port = 80;
const mysql = require('mysql');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "webshop"
});

app.listen(port, function(){
    console.log("Server started");
})

app.post("/account", (req,res) => {
    console.log("Login Daten: " + req.body.loginUsername + " " + req.body.loginPassword);
    // noinspection JSStringConcatenationToES6Template,SqlResolve
    let queryString = "select * from users Where username ='" + req.body.loginUsername + "' AND password = '" + req.body.loginPassword + "'";
    console.log(queryString);
    try {
        con.query(queryString, function(err, result) {
            if (result  && result.length > 0) {
                console.log(result);
                console.log(result[0].username);
                if(result[0].username == "TestAdmin") {
                    console.log("Erfolgreich als Admin eingeloggt");
                    res.cookie('privilege', 'Admin');
                    res.status(302).redirect('http://localhost/adminPage.html');
                }
            }
            else {res.send({ response : queryString + "hat kein Ergebnis geliefert... TODO: Diese Ausgabe sollte entfernt werden"})}
            })
        } catch (e) {
        console.error(e);

    }
})
