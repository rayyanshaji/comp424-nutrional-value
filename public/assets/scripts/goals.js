var goalsJSON;

$(document).ready(function() {
    getDate();
    getGoalsJSON();
    chart();

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
    } else {
        // add visual 
        console.log('no')
    }
}

function chart() {
    new Chart(document.getElementById('chart'), {
        type: 'line',
        data: {
            datasets: [{
                label: 'Weight',
                data: goalsJSON,
                backgroundColor: 'rgba(0, 119, 204, 0.3)'
                /*
                data: [
                    {
                        t: new Date('2019-04-27'),
                        y: 165
                    },
                    {
                        t: new Date('2019-04-26'),
                        y: 165
                    },
                    {
                        t: new Date('2019-01-26'),
                        y: 165
                    }
                ] */
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'linear',
                    time: {
                        parser: 'MM/DD/YYYY'
                    },
                    scaleLabel: {
                        display:     true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:     true,
                        labelString: 'Weight (lb)'
                    }
                }]
            }
        }
    });
}