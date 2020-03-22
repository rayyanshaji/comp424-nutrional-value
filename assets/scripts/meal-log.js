$(document).ready(function() {
    const searchInput = $('#searchInput');
    const searchList = $('.search-list');
    const item = {
        image: '',
        name: '',
        servingQty: 1,
        servingUnit: '',
        calories: 1
    }
    
    // Add result that is clicked on to section below search input
    $('.results').on('click', 'li', function() {
        item.image = $(this).find('img').attr('src');
        item.name = $(this).find(".name").text();
        item.servingQty = $(this).find("[data-info=serving-quantity]").text();
        item.servingUnit = $(this).find("[data-info=serving-unit]").text();
        item.calories = $(this).find("[data-info=calories]").text();

        searchInput.val(item.name);
        searchList.hide();

        $('#add-to-display').hide();
        $('.list-add').show();

        updateAddList(item);
    });

    // Clear item in list add section
    $('#clear-item').on('click', function() {
        clearListAdd();
    });

    // Add item to the list
    $('#add-item').on('click', function() {
        addItem(item);
        calculateTotalNutritions();
        calculateNumberOfMeals();
        calculateMealCalories();
        clearListAdd();
    });

    // Delete an item when clicked on
    $('.list').on('click', '.delete-item', function() {
        $(this).parent().remove();
        var currentCal =  parseInt($(this).parent().find('#foodcalories').text());
        var currentTotal = parseInt($('.meals-total #calories-total').text());      
        var newTotalCal = currentTotal - currentCal; 
        $('.meals-total #calories-total').text(newTotalCal);
        calculateNumberOfMeals();
        calculateMealCalories();
    });

    $('.meal-collapse').on('click', function() {
        expanded = $(this).data('expanded');
        if (expanded) {
            $(this).data('expanded', false);
            $(this).find('.fas').removeClass('fa-angle-down').addClass('fa-angle-right');
            $(this).closest('.meal-group').find('.items').slideUp(200);
        } else {
            $(this).data('expanded', true);
            $(this).find('.fas').removeClass('fa-angle-right').addClass('fa-angle-down');
            $(this).closest('.meal-group').find('.items').slideDown(200);
        }
    });

    $(document).ready(function() {
        $('.list').on('click', '.close-modal', function() {
            $(this).closest('.modal').css('display', 'none');
        });
    });

    $('.list').on('click', '.expand-item', function() {
        $(this).parent().find('.modal').css('display', 'block');
    });

    calculateNumberOfMeals();
    
});

/**
 * Add item chosen from search to add item section below
 * @param {Item} item 
 */
function updateAddList(item) {
    const listAdd = $('.list-add');

    listAdd.find('.name').text(item.name);
    listAdd.find('img').attr('src', item.image);
    listAdd.find('#servings').val(item.servingQty);
    listAdd.find('#serving-unit').text(item.servingUnit);
    listAdd.find('#calories-amount').text(item.calories);

    var calories_per_serving_qty = parseInt(item.calories)/item.servingQty;

    // Updates calories value when serving amount is changed
    $('#servings').on('keyup', function() {
        var changed_calories = parseInt(calories_per_serving_qty) * $("#servings").val();
        listAdd.find('#calories-amount').text(changed_calories);
    });
}

// Adds the item from list add section at the top of the list depending on which meal was chosen
function addItem(item) {
    var newServingQty = $('.list-add #servings').val();
    var newCalories = $('.list-add #calories-amount').text(); 
    var modalUUID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const itemTemplate = `
        <li class="item">
            <img src="${item.image}">
            <h2 class="name" title="${item.name}">${item.name}</h2>
            <span class="servings">Servings: ${newServingQty}<strong></strong>
                <span>${item.servingUnit}</span>
            </span>
            <button class="delete-item"><i class="fas fa-times"></i></button>
            <span id="foodcalories">${newCalories}</span>
            <span id="foodcaloriestext">Calories</span>
            <i class="fas fa-chevron-right expand-item"></i>
            <div class="modal">
                <div class="modal-content">
                    <div class="close-modal">
                        <i class="fas fa-times"></i>
                    </div>
                    <div id="${modalUUID}"></div>
                </div>
            </div>
        </li>
    `;
    var meal = $('#mealSelect').val().toLowerCase();
    document.querySelector('#' + meal + ' .items').innerHTML += itemTemplate;
    getFullNutritions(modalUUID);
}

// Clears the list add section
function clearListAdd() {
    $('.list-add').hide();
    $('#add-to-display').show();
    $('#searchInput').val('');
}

var total = 0;
function calculateTotalNutritions() {
    $('span#foodcalories').each(function(){
        var cal = parseInt($(this).text(), 10);
        if($.isNumeric(cal)){
            total += cal;
        }
        $('.meals-total #calories-total').text(total + ' Cal');
        total = cal; //assigning current calories val so that it doesn't accumulate the previous values with current sum
    });
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

function calculateMealCalories() {
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

function getFullNutritions(modalUUID) {
    $('#' + modalUUID).nutritionLabel({
        showServingUnitQuantityTextbox : false,
        hideTextboxArrows : true,
        showItemName : false,
        showServingsPerContainer : true,
        ingredientList : 'Enriched Bleached Wheat Flour (Bleached Flour, Malted Barley Flour, Niacin, Iron, Thiamin Mononitrate, Riboflavin, Folic Acid), Sugar, Vegetable Oil (contains one or more of the following oils: Cottonseed Oil, Palm Oil, Soybean Oil), Water, Hydrogenated Vegetable Oil (Palm Kernel Oil, Palm Oil), High Fructose Corn Syrup, Cocoa Powder (Processed With Alkali), contains 2% or less of the following: Eggs, Nonfat Milk, Glycerin, Soy Flour, Corn Syrup Solids, Leavening (Sodium Acid Pyrophosphate, Baking Soda, Sodium Aluminum Phosphate), Preservatives (Potassium Sorbate, Sodium Propionate, Calcium Propionate), Salt, Distilled Monoglycerides, Dextrose, Food Starch-Modified (Corn and/or Wheat), Soy, Lecithin, Natural and Artificial Flavor, Mono- and Diglycerides, Spices, Tapioca Starch, Wheat Starch, Cellulose Gum, Guar Gum, Karaya Gum, colored with Extracts of Annatto and Turmeric, Artificial Color.',
    
        showPolyFat : false,
        showMonoFat : false,
        showTransFat : false,
        showFibers : false,
        showVitaminD : false,
        showPotassium_2018 : false,
        showCalcium : false,
        showIron : false,
        showCaffeine : false,
    
        valueServingPerContainer : 5,
        valueServingUnitQuantity : 2,
        valueServingSizeUnit : 'Cookies',
    
        valueCalories : 400,
        valueFatCalories : 220,
        valueTotalFat : 24,
        valueSatFat : 15,
        valueCholesterol : 25,
        valueSodium : 430,
        valueTotalCarb : 44,
        valueSugars : 24,
        valueProteins : 4,
        valueVitaminD : 12.22,
        valuePotassium_2018 : 4.22,
        valueCalcium : 7.22,
        valueIron : 11.22,
        valueAddedSugars : 17,
        showLegacyVersion : false
    });
}