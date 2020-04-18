var logJSON;

$(document).ready(function() {
    searchSelect();
    getLogJSON();

    $('#add-item').on('click', function() {
        addItem('search');
        calculateNumberOfMeals();
        calculateMealNutritions();
        clearListAdd();
    });

    $('#clear-item').click(() => clearListAdd());
});

/**
 * Handles when a search result is clicked on
 */
function searchSelect() {
    $('.results').on('click', 'li', function() {
        var name, imageURL, servingQty, servingUnit, calories
        var searchInput = document.getElementById('search-input');
        var searchList = document.getElementById('search-list');
        name = $(this).find(".name").text();
        imageURL = $(this).find('img').attr('src');
        servingUnit = $(this).find("[data-info=serving-unit]").text();
        calories = $(this).find("[data-info=calories]").text();

        searchInput.value = name;
        searchList.style.display = 'none';

        $('#add-to-display').hide();
        $('.list-add').show();

        updateAddList(name, imageURL, servingUnit, calories);
    });
}

/**
 * Updates the item-add section
 * @param {string} name name of the item
 * @param {string} imageURL url of the item's image
 * @param {string} servingUnit serving unit of the item
 * @param {number} calories number of calories for 1 serving of the item
 */
function updateAddList(name, imageURL, servingUnit, calories) {
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
            <h2 class="name" title="${item.name}">${item.name}</h2>
            <span class="servings">Servings: ${item.servingQty}<strong></strong>
                <span>${item.servingUnit}</span>
            </span>
            <span id="foodcalories">${item.calories}</span>
            <span id="foodcaloriestext">Calories</span>
            <i class="fas fa-chevron-right expand-item"></i>
        </li>
    `;
    document.querySelector('#' + item.meal + ' .items').innerHTML += itemTemplate;
}

function addItem(method) {
    // todo: add addition nutrions
    var item = {
        name: '',
        meal: '',
        imageURL: '',
        servingQty: 1,
        servingUnit: '',
        calories: 1
    }

    // todo: fetch from nutritionix api for the item's nutritions
    if (method === 'search') {
        item.name = document.getElementById('name').textContent;
        item.meal = document.getElementById('meal-select').value.toLowerCase();
        item.imageURL = document.getElementById('image').getAttribute('src');
        item.servingQty = document.getElementById('servings').value;
        item.servingUnit = document.getElementById('serving-unit').textContent;
        item.calories = document.getElementById('calories-amount').textContent;
        addItemToList(item);
        postItem(item);
    } else if (method === 'db') {
        for (let i in logJSON) {
            if (logJSON[i].date == getUrlDate()) {
                var item = logJSON[i].items
                for (let i in item) {
                    item.name = item[i].name;
                    item.meal = item[i].meal;
                    item.imageURL = item[i].image_url;
                    item.servingQty = item[i].serving_qty;
                    item.servingUnit = item[i].serving_unit;
                    item.calories = item[i].calories;
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
            calories: item.calories
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