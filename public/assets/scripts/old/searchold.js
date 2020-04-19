$(document).ready(function() {
    const searchInput = $('#search-input');
    const searchList = $('.search-list');
    let timeout = null;
    let opened = false;

    // Show the list when the input is clicked on
    searchInput.on('click', function() {
        if (searchInput.val().length > 0 && !opened) {
            searchList.show()
            opened = true;
        };
    });

    // Update the list each time the input gets edited
    searchInput.on('keyup', function() {
        $('.results li').remove();

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            if (searchInput.val().length > 0) getResults($(searchInput).val());
        }, 200);
        if (searchInput.val().length > 0 && !opened) {
            searchList.show()
            opened = true;
        };
        if (searchInput.val().length <= 0 && opened) { 
            searchList.hide()
            opened = false;
        }
    });

    // Hide the list when anywhere beside the input and the list is clicked on
    $(document).mouseup(function(e) {
        if (!searchList.is(e.target) && searchList.has(e.target).length === 0 && opened) {
            searchList.hide()
            opened = false;
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
            'x-app-id': '36e650cf',
            'x-app-key': '9ff34a709f1d44f63aa59fee827713d1'
        }
    });
});

/**
 * Template literal for individual search results in the list 
 * @param {JSON object of an food item} item 
 */
function resultTemplateCommon(item) {
    return `
        <li>
            <img src="${item.photo.thumb}">
            <span class="name">${item.food_name}</span>
            <div class="info">
                <div class="servings">
                    <span data-info="serving-quantity">${item.serving_qty}</span>
                    <span data-info="serving-unit">${item.serving_unit}</span>
                </div>
                <div class="calories"> 
                    <span data-info="calories">${Math.round(item.full_nutrients[4].value)}</span>
                    ${Math.round(item.full_nutrients[4].value) == 1 ? `calorie` : `calories` }
                </div>
            </div>
        </li>
    `;
}

function resultTemplateBranded(item) {
    return `
        <li>
            <img src="${item.photo.thumb}">
            <span class="name">${item.food_name}</span>
            <span class="nix_item_id" style="display: none;">${item.nix_item_id}</span>
            <div class="info">
                <div class="servings">
                    <span data-info="serving-quantity">${item.serving_qty}</span>
                    <span data-info="serving-unit">${item.serving_unit}</span>
                </div>
                <div class="calories"> 
                    <span data-info="calories">${Math.round(item.full_nutrients[3].value)}</span>
                    ${Math.round(item.full_nutrients[3].value) == 1 ? `calorie` : `calories` }
                </div>
            </div>
        </li>
    `;
}

/**
 * Get JSON from API and then display in the search list
 * @param {Value of search input} input 
 */
function getResults(input) {
    $.getJSON('https://trackapi.nutritionix.com/v2/search/instant?query=' + input +'&detailed=true', function(json) {
        if (json.common.length > 0) {
            for (var i = 0; i < 7; i++) {
                document.getElementById('common-results').innerHTML += resultTemplateCommon(json.common[i]);
            }
        }
        if (json.branded.length > 0) {
            for (var i = 0; i < 7; i++) {
                document.getElementById('branded-results').innerHTML += resultTemplateBranded(json.branded[i]);
            }
        }
    });
}