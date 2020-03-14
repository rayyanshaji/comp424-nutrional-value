const searchInput = $('#searchInput');
const searchList = $('.search-list');
let timeout = null;

$(function() {
    searchInput.on('click', function() {
        searchList.show();
    });

    searchInput.on('keyup', function() {
        $('.results li').remove();

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            getResults($(searchInput).val());
        }, 200);
    });

    $('.tab').on('click', function() {
        if (!$(this).hasClass('active')) {
            $('#' + $('.tab.active').data('tab')).removeClass('active');
            $('.tab.active').removeClass('active');
            $(this).addClass('active');
            $('#' + $(this).data('tab')).addClass('active');
        }
    })

    $(document).mouseup(function(e) {
        if (!searchList.is(e.target) && searchList.has(e.target).length === 0) {
            searchList.hide();
        }
    });
});

function getResults(input) {
    $.ajaxSetup({
        method: 'GET',
        headers: {
            // from secret.js, create your own
            // assign constants/variables inside it
            'x-app-id': '36e650cf',
            'x-app-key': '9ff34a709f1d44f63aa59fee827713d1',
        }
    });

    // TODO: CONVERT TO TEMPLATE STRINGS
    //GETTING JSON DATA
    $.getJSON('https://trackapi.nutritionix.com/v2/search/instant?query=' + input +'&detailed=true', function(json) {
        var json = json;
        console.log(json);
        //IF ARRAY LIST IS EMPTY
        if (!json.common.length == 0) {
            for (var i = 0; i < 3; i++) {
                //append the div element with image of food item searched to the list.
                $('#common-results').append(
                    '<li data-type="common"><img src="' + json.common[i].photo.thumb + '">' + 
                    '<span id="foodname-title">'+json.common[i].food_name + '</span>' + 
                    '<span id="serving-unit-search">1 ' +
                    json.common[i].serving_unit + ",</>"+ 
                    '<span>'+' '+Math.round(json.common[i].full_nutrients[4].value)+
                    ' calories'+'</span>'+'</li>'
                );
            }
        } else {
            $('#common-results').append('<li>No results</li>');
        }
        if (!json.branded.length == 0) {
            for (var i = 0; i < 2; i++) {
                $('#branded-results').append('<li data-type="branded" data-nix_item_id="' + 
                json.branded[i].nix_item_id + '"><img src="' + json.branded[i].photo.thumb +
                '">' + '<span id="foodname-title">' + json.branded[i].brand_name_item_name + 
                '</span>'+ '<span id="serving-unit-search">' +
                json.branded[i].serving_unit + 
                ',<span>'+' '+json.branded[i].nf_calories+
                    ' calories'+'</span>'+'</li>');
            }
        } else {
            $('#branded-results').append('<li>No results</li>');
        }
    });
}