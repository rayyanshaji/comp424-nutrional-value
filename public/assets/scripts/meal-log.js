var logJSON;

$(document).ready(function() {
    searchSelect();
    getLogJSON();

    document.getElementById('add-item').addEventListener('click', () => {
        addItem('search');
        calculateNumberOfMeals();
        calculateMealNutritions();
        clearListAdd();
    })

    document.getElementById('clear-item').addEventListener('click', clearListAdd);
});

/**
 * Handles when a search result is clicked on
 */
function searchSelect() {
    $('.results').on('click', 'li', function() {
        var type, nix_item_id, name, imageURL, servingUnit, calories
        var searchInput = document.getElementById('search-input');
        var searchList = document.getElementById('search-list');
        type = $(this).parent().attr('id').split('-')[0];
        type === 'branded' ? nix_item_id = $(this).find(".nix_item_id").text() : nix_item_id = '';
        name = $(this).find(".name").text();
        imageURL = $(this).find('img').attr('src');
        servingUnit = $(this).find("[data-info=serving-unit]").text();
        calories = $(this).find("[data-info=calories]").text();

        searchInput.value = name;
        searchList.style.display = 'none';
        document.getElementById('add-to-display').style.display = 'none'
        document.getElementById('list-add').style.display = ''

        $('#add-to-display').hide();
        $('.list-add').show();
        updateAddList(type, nix_item_id, name, imageURL, servingUnit, calories);
    });
}

/**
 * Updates the item-add section
 * @param {string} name name of the item
 * @param {string} imageURL url of the item's image
 * @param {string} servingUnit serving unit of the item
 * @param {number} calories number of calories for 1 serving of the item
 */
function updateAddList(type, nix_item_id, name, imageURL, servingUnit, calories) {
    document.getElementById('type').textContent = type;
    document.getElementById('nix_item_id').textContent = nix_item_id;
    document.getElementById('name').textContent = name;
    document.getElementById('image').setAttribute('src', imageURL);
    var servings = document.getElementById('servings')
    servings.value = 1;
    var caloriesAmount = document.getElementById('calories-amount')
    caloriesAmount.textContent = calories;
    document.getElementById('serving-unit').textContent = servingUnit;
    document.getElementById('meal-select').value = '';

    var caloriesPerServingQty = parseInt(caloriesAmount.textContent)

    servings.addEventListener('keyup', () => {
        caloriesAmount.textContent = caloriesPerServingQty * servings.value;
    })
}

function addItemToList(item) {
    const itemTemplate = `
        <li class="item">
            <img src="${item.imageURL}">
            <div class="info">
                <h2 class="name" title="${item.name}">${item.name}</h2>
                <span class="servings">Servings: ${item.servingQty}<strong></strong>
                    <span>${item.servingUnit}</span>
                </span>
            </div>
            <div class="nutritions">
                <span class="calories">${item.nutritions.calories} calories</span>
                <span class="total_fat">${item.nutritions.total_fat} total fat</span>
                <span class="cholesterol">${item.nutritions.cholesterol} cholesterol</span>
                <span class="sodium">${item.nutritions.sodium} sodium</span>
            </div>
            <i class="fas fa-chevron-right expand-item"></i>
        </li>
    `;
    document.querySelector('#' + item.meal + ' .items').innerHTML += itemTemplate;
}

function addItem(method) {
    // todo: add addition nutritions
    var item = {
        type: '',
        name: '',
        meal: '',
        imageURL: '',
        servingQty: 1,
        servingUnit: '',
        nutritions: {
            calories: 1,
            total_fat: 1,
            cholesterol: 1,
            sodium: 1
        },
    }

    // todo: fetch from nutritionix api for the item's nutritions
    if (method === 'search') {
        item.type = document.getElementById('type').textContent;
        item.name = document.getElementById('name').textContent;
        item.meal = document.getElementById('meal-select').value.toLowerCase();
        item.imageURL = document.getElementById('image').getAttribute('src');
        item.servingQty = document.getElementById('servings').value;
        item.servingUnit = document.getElementById('serving-unit').textContent;
        item.nutritions.calories = document.getElementById('calories-amount').textContent;
        if (item.type === 'common') {
            $.ajax({
                url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
                type: "POST",
                dataType: "json",
                data: { 
                    query: item.name
                },
                success: (result) => {
                    var resultItem = result.foods[0];
                    item.nutritions.total_fat = resultItem.nf_total_fat;
                    item.nutritions.cholesterol = resultItem.nf_cholesterol;
                    item.nutritions.sodium = resultItem.nf_sodium;
                    addItemToList(item);
                    postItem(item);
                }
            });
        } else if (item.type === 'branded') {
            var id = document.getElementById('nix_item_id').textContent;
            $.ajax({
                url: 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=' + id,
                type: "GET",
                success: (result) => {
                    var resultItem = result.foods[0];
                    item.nutritions.total_fat = resultItem.nf_total_fat;
                    item.nutritions.cholesterol = resultItem.nf_cholesterol;
                    item.nutritions.sodium = resultItem.nf_sodium;
                    addItemToList(item);
                    postItem(item);
                }
            });
        }
    } else if (method === 'db') {
        for (let i in logJSON) {
            if (logJSON[i].date == getUrlDate()) {
                var items = logJSON[i].items
                for (let i in items) {
                    item.name = items[i].name;
                    item.meal = items[i].meal;
                    item.imageURL = items[i].image_url;
                    item.servingQty = items[i].serving_qty;
                    item.servingUnit = items[i].serving_unit;
                    item.nutritions.calories = items[i].nutritions.calories;
                    item.nutritions.total_fat = items[i].nutritions.total_fat;
                    item.nutritions.cholesterol = items[i].nutritions.cholesterol;
                    item.nutritions.sodium = items[i].nutritions.sodium;
                    addItemToList(item);
                }
            }
        }
        calculateNumberOfMeals();
        calculateMealNutritions();
    }
}

function postItem(item) {
    $.ajax({
        url: '/db/log/' + getUrlDate() + '/add',
        type: "POST",
        dataType: "json",
        data: { 
            name: item.name,
            meal: item.meal,
            image_url: item.imageURL,
            serving_qty: item.servingQty,
            serving_unit: item.servingUnit,
            'nutritions.calories': item.nutritions.calories,
            'nutritions.total_fat': item.nutritions.total_fat,
            'nutritions.cholesterol': item.nutritions.cholesterol,
            'nutritions.sodium': item.nutritions.sodium
        }
    });
}

function getLogJSON() {
    $.getJSON("/db/log", (data) => {
        logJSON = data;
        for (let i in logJSON) {
            $('#' + logJSON[i].date).addClass('has-log');
        }
        addItem('db');
    });
}

function clearListAdd() {
    document.getElementById('list-add').style.display = 'none';
    document.getElementById('add-to-display').style.display = '';
    document.getElementById('search-input').value = '';
}

/**
 * @todo: Make not just calories
 */
function calculateMealNutritions() {
    var dayCals = 0;
    $('.meal-group').each(function() {
        var mealCals = 0;
        var foods = $(this).find('.items').children();
        foods.each(function () {
            var amount = $(this).find('#foodcalories').text();
            mealCals += parseInt(amount);
        });
        $(this).find('.meal-nutritions').text(mealCals + " Cal");
        dayCals += mealCals;
    });
    $('.meals-total .items .calories').text(dayCals + " Cal");
}

function calculateNumberOfMeals() {
    var total = 0;
    $('.meal-group').each(function() {
        var amount = $(this).find('.items').children().length;
        total += amount;
        $(this).find('.total').text('(' + amount + ')');
    });
    $('.meals-total .total').text('(' + total + ')');
}