let planArray = ["Test", "Boeser Plan"];
function updateNameDisplay() {
    if(document.getElementById("input-field")&& document.getElementById("input-field").value) {
        planArray.push(document.getElementById('input-field').value);
    }
        let todo = " <div id=\"checklist\">";
        for (let i = 0; i < planArray.length; i++) {
            todo += '<input checked="" value="1" name="r" type="text" id="01">' +
                '<label htmlFor="01" style="color: #4f1c21;">' + 'Admin: ' + planArray[i] + '</label>';
            console.log(todo)
        }
        todo += "</div>"
        document.getElementById('plan').innerHTML = todo;
}

