function getInfo() {
    $.getJSON("/db/user", function(response) {
        document.getElementById('provider').textContent = response.provider;
        document.getElementById('name').textContent = response.name;
    });
}

getInfo();