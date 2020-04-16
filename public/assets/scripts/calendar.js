/**
 * @author: Nitin Patel
 * https://github.com/niinpatel/calendarHTML-Javascript
 * @license MIT
 * 
 * with modifications
 */

let today = new Date();
let pageMonth = getUrlDate().split('-')[1]-1;
let pageYear = getUrlDate().split('-')[0];
let pageDay = getUrlDate().split('-')[2];

let currentMonth = pageMonth;
let currentYear = pageYear;
let currentDay = pageDay;

let todayMonth = today.getMonth()+1;
let todayYear = today.getFullYear();

let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

setDateHeader();

function getUrlDate() {
    return window.location.pathname.split('/')[2];
}

function setDateHeader() {
    let dateHeader = document.getElementById('date-header');
    let dateValues = getUrlDate().split('-');
    dateHeader.innerHTML = months[dateValues[1]-1] + ' ' + dateValues[2] + ', ' + dateValues[0];
}

function showLogDates() {
    for (let i in logJSON) {
        //document.getElementById(logJSON[i].date).classList.add('has-log');
        $('#' + logJSON[i].date).addClass('has-log');
    }
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                let cellAnchor = document.createElement("a");
                cellAnchor.href = '/log/' + currentYear + '-' + (currentMonth + 1) + '-' + date;
                cellAnchor.id = currentYear + '-' + (currentMonth + 1) + '-' + date;
                // color today's date
                if (date === today.getDate() && year == today.getFullYear() && month === today.getMonth()) cellAnchor.classList.add("current");
                // current page's date
                if (date == pageDay && year == pageYear && month == pageMonth) cell.classList.add("today");
                cellAnchor.appendChild(cellText);
                cell.appendChild(cellAnchor);
                row.appendChild(cell);
                date++;
            }

        }
        tbl.appendChild(row); // appending each row into calendar body.
    }

    showLogDates();
}