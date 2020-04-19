var ctx = document.getElementById('chart');
var goalsChart = new Chart(ctx, {
    type: 'line',
    data: '',
    options: {}
});

var goalsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            "label": "My Weight Log",
            "data": [65, 59, 80, 81, 56, 55, 40],
            "fill": false,
            "borderColor": "#f97c0f",
            "lineTension": 0.1
        }]
    },
    "options": {}
});

var goalbutton = document.getElementById("saveweight");
var inputval = document.getElementById("weight").value;

goalbutton.addEventListener("click", function()
    {
        console.log(document.getElementById("weight").value);
    }
);


function postWeight(item) {
    $.ajax({
        url: '/goals/weight/' + getUrlDate() + '/add',
        type: "POST",
        dataType: "json",
        data: { 
            weight: item.weight
        }
    });
}