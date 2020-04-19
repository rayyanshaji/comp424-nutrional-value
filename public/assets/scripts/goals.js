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
            "label": "My First Dataset",
            "data": [65, 59, 80, 81, 56, 55, 40],
            "fill": false,
            "borderColor": "rgb(75, 192, 192)",
            "lineTension": 0.1
        }]
    },
    "options": {}
});