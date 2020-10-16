const inputs = ['ninumber', 'fullname', 'phoneNum', 'address', 'department'];

// Displays data from JSON
function displayData() {
    for (let i = 0; i < records.length; i++) {
        let parent = document.getElementById('table');
        
        let record = document.createElement('tr');

        let NIN = document.createElement('td');
        NIN.innerText = records[i].ninumber; 

        let name = document.createElement('td');
        name.innerText = records[i].fullname; 

        let phone = document.createElement('td');
        phone.innerText = records[i].phone; 

        let address = document.createElement('td');
        address.innerText = records[i].address;

        let department = document.createElement('td');
        department.innerText = records[i].department;

        let editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.innerHTML = 'Edit';
        editBtn.onclick = function() {
            editRec();
        }

        let deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = function() {
            deleteRec();
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
}

function editRec() {
    console.log("edit!");
}

function deleteRec() {
    console.log("delete!");
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
                if(element.match(/^[0-9a-zA-Z]+$/)) {
                    return true;
                }
                return false;
            case 'fullname':
                return true;
            case 'phoneNum':
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
    } else {
        return value;
    }
}

// Add new data to the JSON 
function addRec(){
    const form = document.getElementById('form');
    var addedValues = [];

    for(let i = 0; i < inputs.length; i++){
        let element = form.elements.namedItem(inputs[i])
        let value = element.value;
        let label = document.getElementById(inputs[i]);
        addedValues.push(checkValid(inputs[i], value, label, element));
    }

    console.log(addedValues); // TO DO
}


displayData();