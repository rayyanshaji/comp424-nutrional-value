function getInfo() {
    $.getJSON("/db/user", function (response) {
        console.log(response);
    });
}

$(document).ready(getInfo());