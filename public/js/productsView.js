function updateProductsDisplay(data) {
    let mydata = JSON.parse(data)
    let todo = " <div id=\"checklist\">";
    if (data && data.length > 0) {
        for (let i = 0; i < mydata.length; i++) {
            if (mydata[i].name) {
                todo += '<input value="0" name="r" type="checkbox" id="01">' +
                    '<label htmlFor="01" style="color: #4f1c21;">' + mydata[i].name + '</label>';
                console.log(todo)
            } else {
                todo += '<input value="0" name="r" type="checkbox" id="01">' +
                    '<label htmlFor="01" style="color: #4f1c21;">' + mydata[i].email + '</label>';
                console.log(todo)
            }
        }
    }
    todo += "</div>"
    document.getElementById('search').innerHTML = todo;
}