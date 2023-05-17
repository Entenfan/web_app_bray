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

//Evtl muss man die get Routen anpassen, ka ob das so nötig ist, weil vermtl. niemand (auch mit brute force) auf die admin seite kommt
// Im Moment wird übernimmt der express.static alles und erlaubt den leuten den zugriff auf die html seite: https://stackoverflow.com/questions/50302508/express-js-serve-static-folder-at-specific-url-only
// Man kann auch einfach die form von der searchbar erst nach cookie erkennen erscheinen lassen
// HTTP Cookie kann nciht aktiviert werden, weil sonst kein javascript code drauf zugreifen kann aber evtl kann man dann einfach das so im html code dann durchsuchen
// Weil ja eh keiner dann cookies von hand setzen kann 🤔 (:thinking:) KA muss ich wann anders gucekn
app.get("/adminPage.html", function(req, res) {
    console.log(req.cookies['privilege']);
    if (req.cookies['privilege'] !== 'Admin') {
        res.status(302).redirect('http://localhost/adminPage.html');
    }
})
