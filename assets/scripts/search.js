var searchList = $('.search-list');
var searchInput = ('#search');

// var common = [], branded = [];

$(function() {
    $(searchInput).on('click', function() {
        searchList.show();
    });
    
    $(searchInput).on('input', function() {
        getResults(searchInput.val());
    });
});

function getResults(input) {
    var results = $( '.results');
    $('.results > li').remove();

    $.ajaxSetup({
        method: 'GET',
        headers: {
            'x-app-id': '36e650cf',
            'x-app-key': '9ff34a709f1d44f63aa59fee827713d1',
        }
    });

    $.getJSON('https://trackapi.nutritionix.com/v2/search/instant?query=' + input, function(json) {
        for (let i = 0; i < json.common.length; i++) {
            // common.push(json.common[i]);
            results.append('<li>' + json.common[i].food_name + '</li>');
        }
        /*
        for (let i = 0; i < json.branded.length; i++) {
            branded.push(json.branded[i]);
        } */
    });
}

function displayResults(input) {
    var results = $( '.results');
    getResults(input);
}