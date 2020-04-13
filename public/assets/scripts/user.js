/* function getInfo() {
    $.getJSON("/db/user", function (response) {
        console.log(response);
    });
} */

function getInfo() {
    $.post('/db/food_log');
}

$(document).ready(getInfo());