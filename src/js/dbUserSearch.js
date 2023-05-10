//Hier soll SQL-Injection gemacht werden
import mysql from "mysql";


class SQLQueryBad {

    var con;

    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password123",
            database: "users"
        })
    }

    boolean loginQuery(username, password) {
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