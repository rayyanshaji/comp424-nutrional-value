$(document).ready(function() {
    const searchInput = $('#searchInput');
    const searchList = $('.search-list');
    let timeout = null;

    // Show the list when the input is clicked on
    searchInput.on('click', function() {
        if (searchInput.val().length > 0) searchList.show();
    });

    // Update the list each time the input gets edited
    searchInput.on('keyup', function() {
        $('.results li').remove();

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            getResults($(searchInput).val());
        }, 200);
        if (searchInput.val().length > 0) searchList.show();
        if (searchInput.val().length <= 0) searchList.hide();
    });

    // Hide the list when anywhere beside the input and the list is clicked on
    $(document).mouseup(function(e) {
        if (!searchList.is(e.target) && searchList.has(e.target).length === 0) {
            searchList.hide();
        }
    });

    // Tabs for list
    $('.tab').on('click', function() {
        if (!$(this).hasClass('active')) {
            $('#' + $('.tab.active').data('tab')).removeClass('active');
            $('.tab.active').removeClass('active');
            $(this).addClass('active');
            $('#' + $(this).data('tab')).addClass('active');
        }
    })

    // Set up AJAX with headers to use API
    $.ajaxSetup({
        method: 'GET',
        headers: {
            // from secret.js, create your own
            // assign constants/variables inside it
            'x-app-id': xappid,
            'x-app-key': xappkey,
        }
    });
});

/**
 * Template literal for individual search results in the list 
 * @param {JSON object of an food item} item 
 */
function resultTemplate(item) {
    return `
        <li data-type="common">
            <img src="${item.photo.thumb}">
            <span class="name">${item.food_name}</span>
            <div class="info">
                <span data-info="serving-unit-quantity">${item.serving_qty}</span>
                <span data-info="serving-unit-unit">
                    ${item.serving_unit}, <span data-info="calories"> ${Math.round(item.full_nutrients[4].value)} calories</span>
                </span>
            </div>
        </li>
    `;
}

/**
 * Get JSON from API and then display in the search list
 * @param {Value of search input} input 
 */
function getResults(input) {
    var item;

    $.getJSON('https://trackapi.nutritionix.com/v2/search/instant?query=' + input +'&detailed=true', function(json) {
        if (json.common.length > 0) {
            for (var i = 0; i < 10; i++) {
                item = json.common[i];
                document.getElementById('common-results').innerHTML += resultTemplate(item);
            }
        }
        if (json.branded.length > 0) {
            for (var i = 0; i < 10; i++) {
                item = json.branded[i];
                document.getElementById('branded-results').innerHTML += resultTemplate(item);
            }
        }
    });
}