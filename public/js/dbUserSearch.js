//Hier soll SQL-Injection gemacht werden
var mysql = require('mysql');

class SQLQueryBad {


    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "store",
            password: "password123",
            database: "users"
        })
    }

    loginQuery(username, password) {
        console.log("Query wird ausgefuehrt");
        this.con.connect(function (err) {
                if (err) throw err;
                this.con.query("Select * FROM users WHERE username=" + username + "password =" + password, function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                })
            }
        );
    }
}

module.exports = SQLQueryBad;