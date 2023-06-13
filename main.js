import express from 'express';
//const cookieParser = require('cookie-parser');
const app = express();
const port = 80;
import mysql from 'mysql';
import md5 from 'md5';
import fs from 'fs';


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static( './public', {
    extensions: ['html']
}));

export let products;


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
        res.status(302).redirect('http://localhost/adminPage.html');
    }
    else {
        res.status(302).redirect('http://localhost/account.html');
    }
})

app.post("/product", (req,res) => {
    console.log("Product search " + req.body.searchBarInput);
    // noinspection JSStringConcatenationToES6Template,SqlResolve
    let queryString = "select * from products Where name = '" + req.body.searchBarInput + "'";
    console.log(queryString);
        con.query(queryString, function(err, result) {
            console.log(result);
            // res.send(JSON.stringify(result));
            // res.end();
            let dataString = JSON.stringify(result).replaceAll('[','').replaceAll(']','');
            dataString = 'function data(){ return JSON.stringify([' + dataString + ']);}';
            fs.writeFile('public/data.js', dataString, (err) => { //"data = '" + JSON.stringify(result) + "'"
                if (err) throw err;
            })
            // fs.readFile('public/data.js', (err, data) => {
            //     if (err) throw err;
            //     let mydata = JSON.parse(data)
            //     for(let i=0; i<mydata.length; i++) {
            //         if (mydata[i].name) {
            //             console.log(mydata[i].name);
            //         }
            //         else {
            //             console.log(mydata[i].email);
            //         }
            //
            //     }
            // });
        })
})

/**
app.post("/adminPage", function(req,res) {
    console.log(req.body.searchBarInput);
    //planArray.push(req.body.searchBarInput);
})
**/
function correctEmailXSS(email) {
    let xssEmailInput = email.split(/,(.*)/s);
    return xssEmailInput.length> 1 && xssEmailInput[0] === "guy1@badguys.com" && xssEmailInput[1].includes('<a href="http://attacker.com">') && xssEmailInput[1].includes('</a>')
}

function getDepth(obj) {
    let depth = 0;
    if (obj.children) {
        obj.children.forEach(function (d) {
            let tmpDepth = getDepth(d)
            if (tmpDepth > depth) {
                depth = tmpDepth
            }
        })
    }
    return 1 + depth
}