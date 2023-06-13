function updateProductsDisplay(data) {
    console.log(JSON.parse(data));
    let mydata = JSON.parse(data)
    for (let i = 0; i < mydata.length; i++) {
        if (mydata[i].name) {
            alert(mydata[i].name);
        } else {
            alert(mydata[i].email);
        }
    }
}
// let todo = " <div id=\"checklist\">";
// if (data && data.length > 0) {
//     for (let i = 0; i < data.length; i++) {
//         todo += '<input checked="" value="0" name="r" type="checkbox" id="01">' +
//             '<label htmlFor="01" style="color: #4f1c21;">' + data[i].name + '</label>';
//         console.log(todo)
//     }
// }
// todo += "</div>"
// document.getElementById('search').innerHTML = todo;