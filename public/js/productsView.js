function updateProductsDisplay(data) {
    let mydata = data
    let todo = " <div id=\"checklist\">";
    if (mydata && mydata.length > 0) {
        for (let i = 0; i < mydata.length; i++) {
            if (mydata[i].name) {
                todo += '<input value="0" name="r" type="checkbox" id="01">' +
                    '<label htmlFor="01" style="color: #4f1c21;">' + mydata[i].name + '</label>';
            } else if (mydata[i].email) {
                todo += '<input value="0" name="r" type="checkbox" id="01">' +
                    '<label htmlFor="01" style="color: #4f1c21;">' + mydata[i].email + '</label>';
            }
            for (let j = 0; j<mydata[i].length; j++) {
                if (mydata[i][j].name) {
                    todo += '<input value="0" name="r" type="checkbox" id="01">' +
                        '<label htmlFor="01" style="color: #4f1c21;">' + mydata[i][j].name + '</label>';
                } else if (mydata[i][j].email) {
                    todo += '<input value="0" name="r" type="checkbox" id="01">' +
                        '<label htmlFor="01" style="color: #4f1c21;">' + mydata[i][j].email + '</label>';
                }
            }

        }
    }
    todo += "</div>"
    console.log(todo);
    document.getElementById('search').innerHTML = todo;
}