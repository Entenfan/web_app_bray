import mysql from 'mysql';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "webshop",
    multipleStatements: true //Interessant, das muss explizit fuer SQl injection an sein (sonst kann man keine gestackte anfrage senden)
});

export function updateProductsDisplay() {
    if (document.getElementById("searchBarInput") && document.getElementById("searchBarInput").value) {
        console.log("Product search" + document.getElementById("searchBarInput"));
        // noinspection JSStringConcatenationToES6Template,SqlResolve
        let queryString = "select * from products";
        console.log(queryString);
        try {
            con.query(queryString, function (err, result) {
                console.log(result);
                let todo = " <div id=\"checklist\">";
                if (result && result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        todo += '<input checked="" value="0" name="r" type="checkbox" id="01">' +
                            '<label htmlFor="01" style="color: #4f1c21;">' + result[i].name + '</label>';
                        console.log(todo)
                    }
                }
                todo += "</div>"
                document.getElementById('search').innerHTML = todo;
            });
        } catch (e) {
            console.error(e);
        }
    }
}
// let planArray = [];
// export function updateProductsDisplay() {
//     if(document.getElementById("input-field")&& document.getElementById("input-field").value) {
//         planArray.push(document.getElementById('input-field').value);
//     }
//     let todo = " <div id=\"checklist\">";
//     for (let i = 0; i < planArray.length; i++) {
//         todo += '<input value="0" name="r" type="checkbox" id="01">' +
//             '<label htmlFor="01" style="color: #4f1c21;">' +  planArray[i] + '</label>';
//         console.log(todo)
//     }
//     todo += "</div>"
//     document.getElementById('plan').innerHTML = todo;
// }