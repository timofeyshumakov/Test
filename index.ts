const output = document.getElementById('output');
let go = [];
let i: number = 0;
const items_on_page: number = 10;
let current_page: number = 1;
let count_pages: number = 0;
let table_number: number = 0;
let data: any[] = [];
let eye_color_element: any;
let count_items: number = 0;
let items_number: number = 0;
let items_last_number: number = 0;
let person = [];

document.getElementById('previous-page').onclick = myFunction;
document.getElementById('next-page').onclick = myFunction;
document.getElementById('settings-header').addEventListener('click', function () {
    document.getElementById('settings-table-cols').classList.toggle('visible');
    this.getElementsByTagName('img')[0].classList.toggle('rotate-down');
});
document.addEventListener("DOMContentLoaded", function (event) {
    count_pages = Math.ceil(count_items / items_on_page);
    for (i = 0; i < items_on_page; i++) {
        go[i] = document.createElement('tr');
        go[i].setAttribute("onclick", "showEditForm(this)");
        output.appendChild(go[i]);
    }
myFunction();

});
var editForm = document.getElementById("editForm");
function showEditForm(row) {
    for( i = 0; i < document.getElementsByTagName('tr').length; i++){
        document.getElementsByTagName('tr')[i].classList.remove("selected-row");
    }
    row.classList.toggle('selected-row');
    var row_data = row.getElementsByTagName("td");
    for( i = 0; i < row_data.length; i++){
    document.getElementsByClassName("edit__input")[i].value = row_data[i].innerHTML;
    }
    editForm.style.display = "flex";
}
function saveChanges() {
    targetRow = document.getElementsByClassName('selected-row')[0];
    
    for( i = 0; i < targetRow.getElementsByTagName('td').length; i++){
        rowValue = document.getElementsByClassName("edit__input")[i].value;
        targetRow.getElementsByTagName("td")[i].innerText = rowValue;
        if(i === 3){
            targetRow.getElementsByTagName("td")[i].style.background = rowValue;
            targetRow.getElementsByTagName("td")[i].style.color = rowValue;
        }
    }
  }
  function closeForm(){
    editForm.style.display = "none";
  }
const input = document.querySelectorAll("input[type=checkbox]");
input.forEach(function (item) {
    item.addEventListener('click', imgClickHandler);
});
function imgClickHandler() {
    switch (this.id) {
        case 'firstName':
            table_number = 0;
            break;
        case 'lastName':
            table_number = 1;
            break;
        case 'about':
            table_number = 2;
            break;
        case 'eyeColor':
            table_number = 3;
            break;
    }
    document.querySelectorAll('th')[table_number].classList.toggle('hidden');
    for (i = 0; i < items_on_page; i++) {
        document.querySelectorAll('td')[(i * input.length) + table_number].classList.toggle('hidden');
    }
}
function sortTable(columnIndex) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector("table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function myFunction() {
    if (event.target.id  === 'previous-page') {
      current_page--;
    }
    else if (event.target.id === 'next-page') {
        current_page++;
    }

fetch('table-data.json')
    .then(function (response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
    .then(function (data) {
        items_last_number = current_page * items_on_page;
        if (items_last_number > count_items) {
            items_last_number = count_items;
        }
        count_items = data.length;
        count_pages = Math.ceil(count_items / items_on_page);

        if (current_page > count_pages) {
            current_page = 1;
        }
        else if (current_page <= 0) {
            current_page = count_pages;
        }
        items_last_number = current_page * items_on_page;
        if (items_last_number > count_items) {
            items_last_number = count_items;
        }
        i = 0;
        for (items_number = (current_page-1) * items_on_page; items_number < items_last_number; items_number++) {
            person = data[items_number];
            go[i].innerHTML = `
            <td class="first-name">${person.name.firstName}</td>
            <td class="last-name">${person.name.lastName}</td>
            <td class="about">${person.about}</td>
            <td class="eye-color">${person.eyeColor}</td>
          `;        
                eye_color_element = document.querySelectorAll('.eye-color')[0];
                eye_color_element.style.background = person.eyeColor;
                eye_color_element.style.color = person.eyeColor;
                output.appendChild(go[i]);
                i++;
        };
        document.getElementById('current-page').innerText = current_page;
})
    .catch(function (error) {
    console.error('There has been a problem with your fetch operation:', error);
});

}

