var goalsJSON;

$(document).ready(function() {
    getDate();
    getGoalsJSON();

<<<<<<< HEAD
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
=======
    document.getElementById('add').addEventListener('click', postEntry);
>>>>>>> e96eb9c0cfab48b1c15cff02c75f05a8cf539885
});

function getGoalsJSON() {
    $.getJSON("/db/goals", (data) => {
        goalsJSON = data.reverse().splice(0,10);
        showRecent();
        chart();
    });
}

function getDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2)  + '-' + today.getDate();
    document.getElementById('date').value = date
}

function showRecent() {
    var lastGoals = goalsJSON.reverse();
    var goalsTable = document.getElementById('goals-table').getElementsByTagName('tbody')[0];
    var length = lastGoals.length > 10 ? 10 : lastGoals.length;
    for (var i = 0; i < length; i++) {
        var newRow = goalsTable.insertRow();
        newRow.insertCell(0).appendChild(document.createTextNode(lastGoals[i].date));
        newRow.insertCell(1).appendChild(document.createTextNode(lastGoals[i].weight));
    }
}

function postEntry() {
    var date = document.getElementById('date').value;
    var weight = document.getElementById('weight').value;
    if (weight !== '') {
        $.ajax({
            url: '/db/goals/',
            type: "POST",
            dataType: "json",
            data: { 
                date: date,
                weight: weight
            }
        });
        weight.value = '';
        location.reload();
    } else {
        // add visual 
        console.log('no')
    }
}

function chart() {
    var updatedJSON = [];
    var lastGoals = goalsJSON.reverse().splice(0, 10);
    var length = lastGoals.length > 10 ? 10 : lastGoals.length;
    for (var i = 0; i < length; i++) {
        updatedJSON.push({
            t: new Date(lastGoals[i].date),
            y: lastGoals[i].weight
        });
    }
    new Chart(document.getElementById('chart'), {
        type: 'line',
        data: {
            datasets: [{
                label: 'Weight',
                data: updatedJSON,
                backgroundColor: 'rgba(249, 124, 15, 0.4)',
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'linear',
                    time: {
                        tooltipFormat: 'MMMM D, YYYY',
                    },
                    scaleLabel: {
                        display:     true,
                        labelString: 'Date',
                        fontSize: 14
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:     true,
                        labelString: 'Weight (lb)',
                        fontSize: 14
                    }
                }]
            },
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Recent Entries`,
                fontSize: 18
            },
            tooltips: {
                titleFontSize: 14,
                bodyFontSize: 16,
                bodyFontStyle: 'bold',
                displayColors: false
            }
        }
    });
}