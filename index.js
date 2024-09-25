const email = document.getElementById('email');
email.addEventListener('input', () => validate(email));

function validate(elem){
    if(elem.validity.typeMismatch){
        elem.setCustomValidity("The format of email is not right");
        elem.reportValidity();
    }else{
        elem.setCustomValidity('');
    }
}    
    
let userForm = document.getElementById('user_form');
const fetchEntries = () => {
    let entries = localStorage.getItem('user-entries');
    if (entries) {
        entries = JSON.parse(entries)
    }else{
        entries=[];
    }
    return entries;
}
let userEntries = fetchEntries();

const displayEntries = () => {
    const entries = fetchEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`
        const mailCell = `<td class='border px-4 py-2'>${entry.mail}</td>`
        const psswdCell = `<td class='border px-4 py-2'>${entry.psswd}</td>`
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`
        const acceptedTCCell = `<td class='border px-4 py-2'>${entry.acceptedTC}</td>`

        const row = `<tr>${nameCell} ${mailCell} ${psswdCell} ${dobCell} ${acceptedTCCell}</tr>`
        return row;
    }).join("\n");

    const table = `<table class = "table-auto w-full"><tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Accepted terms?</th>
        </tr>${tableEntries} </table>`;
    
        let details = document.getElementById("user-entries");
        details.innerHTML=table;
}

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const mail = document.getElementById('email').value;
    const psswd = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTC = document.getElementById('acceptTerms').checked;

    const entry = {
        name,
        mail,
        psswd,
        dob,
        acceptedTC
    }

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();

    userForm.reset();
}
userForm.addEventListener('submit', saveUserForm);
displayEntries();

document.addEventListener('DOMContentLoaded', function () {
    const dobInput = document.getElementById('dob');
    const today = new Date();
    
    // Calculate max date (today - 18 years)
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    
    // Calculate min date (today - 55 years)
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()).toISOString().split('T')[0];

    // Set the min and max attributes for the date input
    dobInput.setAttribute('min', minDate);
    dobInput.setAttribute('max', maxDate);

});
