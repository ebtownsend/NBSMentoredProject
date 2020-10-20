const inputs = ['ninumber', 'fullname', 'phone', 'address', 'department'];

// Displays data from JSON
function display(item) {
    let parent = document.getElementById('tableBody');
        
    let record = document.createElement('tr');

    let NIN = document.createElement('td');
    NIN.innerText = item.ninumber; 

    let name = document.createElement('td');
    name.innerText = item.fullname; 

    let phone = document.createElement('td');
    phone.innerText = item.phone; 

    let address = document.createElement('td');
    address.innerText = item.address;

    let department = document.createElement('td');
    department.innerText = item.department;

    let editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.innerHTML = 'Edit';
    editBtn.onclick = function() {
        editRec(item.ninumber);
    }

    let deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = function() {
        deleteRec(item.ninumber);
    }

    let actions = document.createElement('td');
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);


    record.appendChild(NIN);
    record.appendChild(name);
    record.appendChild(phone);
    record.appendChild(address);
    record.appendChild(department);
    record.appendChild(actions);

    parent.appendChild(record);
}

function displayData() {
    document.getElementById('tableBody').innerHTML = "";
    
    for (let i = 0; i < records.length; i++) {
        display(records[i]);
    }
}

function displayFilteredData(filter) {
    document.getElementById('tableBody').innerHTML = "";

    if(filter == "All") {
        displayData();
    } else {
        for (let i = 0; i < records.length; i++) {
            if(records[i].department == filter) {
                display(records[i]);
            }
        }
    }
}

// TO DO
function editRec(number) {
    // show form, populate form with current data, on submit, update current data?
    console.log("edit!" + number);
}

// TO DO
function deleteRec(number) {
    // go throgh the array, delete the one with matching number?
    console.log("delete!" + number);
}

// If there is an error message on the input, remove it when something is typed into the input
function clearError(name){
    let current = document.getElementById(name);
    if(current.children.length == 1){
        current.lastChild.style.visibility = "hidden";
    }
}

// Validate input with swicth statement based on input type
function validate(inputType, element) {
    if(element != null && element.trim() != "" ) {
        switch (inputType) {
            case 'ninumber':
                if(element.match(/^[0-9a-zA-Z]+$/) && element.length <= 9) {
                    return true;
                }
                return false;
            case 'fullname':
                return true;
            case 'phone':
                if(!element.match(/^[A-Za-z]+$/)) {
                    return true;
                }
                return false;
            case 'address':
                return true;
            case 'department':
                return true;
        }
    } else {
        return false;
    }
}

// add error message to input if invalid data added, if there already was an error, make it visible again
function error(parent) {
    if (parent.children.length == 0) {
        let label = document.createElement('span');
        label.setAttribute("class", "error");
        label.innerHTML = " ** Please input a valid value **";
        parent.appendChild(label);
    } else {
        parent.lastChild.style.visibility = "visible";
    }
}

// if the input was not valid, add error message
function checkValid(name, value, label, element){
    if(validate(name, value) == false){
        error(label);
        element.focus();
        return false;
    } else {
        return true;
    }
}

// Add new data to the JSON 
function addRec(){
    const form = document.getElementById('form');
    var addedValues = [];

    for(let i = 0; i < inputs.length; i++){
        let element = form.elements.namedItem(inputs[i]);
        let value = element.value;
        let label = document.getElementById(inputs[i]);
        if(checkValid(inputs[i], value, label, element)) {
            addedValues.push(value);
        } else {
            break;
        }
    }

    if(addedValues.length == 5) {
        // Turn the added values into an object and push it into the record.
        var result = {};
        inputs.forEach((key, i) => result[key] = addedValues[i]);
        records.push(result);
        // TO DO - Write new array to file? How to preserve newly added data?

        document.getElementById('form').reset();
        displayData();
    }
}


function toggleVisibility() {
    var form = document.getElementById('form_cont');
    if (form.style.display === 'none') {
      form.style.display = 'block';
    } else {
      form.style.display = 'none';
    }
}

function filter() {
    let filterInput = document.getElementById('filter');
    if(filterInput.value != "0") {
        var filter = filterInput.value;
        displayFilteredData(filter);
    }
}

displayData();