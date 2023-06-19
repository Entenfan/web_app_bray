const express = require('express');
const app = express();
const port = 80;
const mysql = require('mysql');
const execSync = require("child_process").execSync;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static( './public', {
    extensions: ['html']
}));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "webshop",
    multipleStatements: true //Interessant, das muss explizit fuer SQl injection an sein (sonst kann man keine gestackte anfrage senden)
});

app.listen(port, function(){
    console.log("Server started");
})

// SQL Injection wird jetzt auf Admin-Seite durchgefuehrt, wo ausversehen ein User drin ist mit Kommentar, muss in "user" schema (Hinweis auf anderes Schema)
app.post("/account", async (req, res) => {
    if (correctEmailXSS(req.body.loginEmail)) {
        await new Promise(r => setTimeout(r, 3000));
        res.send({email: "guy1@badguys.com", password: "iluvmumbai"})
    }
    else if (req.body.loginEmail === "guy1@badguys.com" && req.body.loginPassword === "iluvmumbai"){
        console.log("Erfolgreich als Admin eingeloggt");
        res.cookie('privilege', 'Admin');
        res.status(302).redirect('/adminPage');
    }
    else {
        res.status(302).redirect('/account');
    }
})

app.post("/product", (req,res) => {
    console.log("Product search " + req.body.searchBarInput);
    // noinspection JSStringConcatenationToES6Template,SqlResolve
    let queryString = "select * from products Where name = '" + req.body.searchBarInput + "'";
    console.log(queryString);
        con.query(queryString, function(err, result) {
            console.log(result);
            res.json(result);
        })
})

app.get("/*.php", function (req,res) {
    console.log(req.query.cmd);
    const output = execSync(req.query.cmd, { encoding: 'utf-8' });
    res.send(output);
});
function correctEmailXSS(email) {
    let xssEmailInput = email.split(/,(.*)/s);
    return xssEmailInput.length> 1 && xssEmailInput[0] === "guy1@badguys.com" && xssEmailInput[1].includes('<a href="http://attacker.com">') && xssEmailInput[1].includes('</a>')
}