var goalsJSON;

$(document).ready(function() {
    getDate();
    getGoalsJSON();
    chart();

    document.getElementById('add').addEventListener('click', postEntry);
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
                    time: {
                        unit: 'day',
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