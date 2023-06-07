const express = require('express');
//const cookieParser = require('cookie-parser');
const app = express();
const port = 80;
const mysql = require('mysql');
const md5 = require('md5');
const { htmlToText } = require('html-to-text');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


const con = mysql.createConnection({
    host: "localhost",
    user: "webshop",
    password: "password",
    database: "webshop"
});

app.listen(port, function(){
    console.log("Server started");
})

// SQL Injection wird jetzt auf Admin-Seite durchgefuehrt, wo ausversehen ein User drin ist mit Kommentar, muss in "user" schema (Hinweis auf anderes Schema)
app.post("/account", async (req, res) => {
    if (correctEmailXSS(req.body.loginEmail)) {
        await new Promise(r => setTimeout(r, 5000));
        res.send({email: "guy1@badguys.com", password: "iluvmumbai"})
    }
    else if (req.body.loginEmail === "guy1@badguys.com" && req.body.loginPassword === "iluvmumbai"){
        console.log("Erfolgreich als Admin eingeloggt");
        res.cookie('privilege', 'Admin');
        res.status(302).redirect('http://localhost/adminPage.html');
    }
    else {
        res.status(302).redirect('http://localhost/account.html');
    }
})

app.post("/product", (req,res) => {
    console.log("Login Daten: " + req.body.loginUsername + " " + req.body.loginPassword);
    // noinspection JSStringConcatenationToES6Template,SqlResolve
    let queryString = "select * from users Where username ='" + req.body.loginUsername + "' AND password = '" + md5(req.body.loginPassword) + "'";
    console.log(queryString);
    try {
        con.query(queryString, function(err, result) {
            if (result  && result.length > 0) {
                console.log(result);
                console.log(result[0].username);
                if (result[0].username === "TestAdmin") {
                    console.log("Erfolgreich als Admin eingeloggt");
                    res.cookie('privilege', 'Admin');
                    res.status(302).redirect('http://localhost/adminPage.html');
                }
                else {
                    res.send(result);
                }
            }
            else {res.send({ response : queryString + "hat kein Ergebnis geliefert... TODO: Diese Ausgabe sollte entfernt werden"})}
            })
        } catch (e) {
        console.error(e);

    }
})

app.post("/adminPage", function(req,res) {
    console.log(req.body.searchBarInput);
    //planArray.push(req.body.searchBarInput);
})

function correctEmailXSS(email) {
    let xssEmailInput = email.split(/,(.*)/s);
    return xssEmailInput[0] === "guy1@badguys.com" && xssEmailInput[1].includes('<a href="http://attacker.com">') && xssEmailInput[1].includes('</a>')
}
