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
            'x-app-id': xappid,
            'x-app-key': xappkey,
        }
    });

    // TODO: CONVERT TO TEMPLATE STRINGS
    $.getJSON('https://trackapi.nutritionix.com/v2/search/instant?query=' + input, function(json) {
        if (!json.common.length == 0) {
            for (var i = 0; i < 10; i++) {
                $('#common-results').append(
                    '<li data-type="common"><img src="' + json.common[i].photo.thumb + '">' + json.common[i].food_name + '</li>'
                );
            }
        } else {
            $('#common-results').append('<li>No results</li>');
        }
        if (!json.branded.length == 0) {
            for (var i = 0; i < 10; i++) {
                $('#branded-results').append('<li data-type="branded" data-nix_item_id="' +  json.branded[i].nix_item_id + '"><img src="' + json.branded[i].photo.thumb + '">' + json.branded[i].food_name + '</li>');
            }
        } else {
            $('#branded-results').append('<li>No results</li>');
        }
    });
}