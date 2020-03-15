var listAdd = $('.list-add');

$(function() {
    $('#addfoodsubmit').on('click', function() {
        addMeal();
        //clearListAdd();
    });

    $('.results').on('click', 'li', function() {
        var itemName = $(this).find("span#foodname-title").text();
        
        console.log("itemname" +itemName);
        var itemImage = $(this).find('img').attr('src');
        var itemType = $(this).data('type');
        console.log("itemtype" +itemType);
        
        var itemServing = $(this).find("span#serving-unit-search").text();
        //var itemServing = $(this).find('span').attr('id').text()”;
        console.log('food name --->' +$(this).find("span#foodname-title"))
        
        var itemCalories = $(this).find("span#calories").text();

        searchInput.val($(this).find("span#foodname-title").text());
        searchList.hide();
        
        
        updateAddList(itemName, itemServing, itemCalories, itemImage);
    });
});

function updateAddList(name, unit, calories, image) {
    listAdd.find('.name').text(name);
    
   
    listAdd.find('#servingsunit').text(unit);
    listAdd.find('#caloriesdisplay').text(calories);
  
    var current_calories = listAdd.find('#caloriesdisplay').text();
    listAdd.find('img').attr('src', image);


$('#servings').on('keyup', function(){
    
    console.log('current '+parseInt(current_calories));
    
    var changed_calories = parseInt(current_calories)*$("#servings").val();
    console.log('input ->'+$("#servings").val());
    console.log(changed_calories);
    listAdd.find('#caloriesdisplay').text(changed_calories).append(' calories');
    
})
}

function addMeal() {
    var name = listAdd.find('.name').text();
    var image = listAdd.find('img').attr('src');
    var servings = listAdd.find('#servings').val();
    var servingsunit = listAdd.find('#servingsunit').text();
    var foodcalories = listAdd.find('#caloriesdisplay').text();
    var meal = listAdd.find('#mealSelect').val().toLowerCase();


    // TODO: CONVERT TO TEMPLATE STRINGS
    var htmlElement = '<li class="item">' +
        '<img src="' + image + '">' +
        '<h2 class="name" title="' + name + '">' + name + '</h2>' +
        '<span class="servings">Servings: <strong>' + servings + '</strong>' + '<span>' +servingsunit+ '</span>' + '</span>' +
        '<span id="foodcalories">' +foodcalories+'</span>' +
        '<span id="foodcaloriestext">Cal</span>' +
        '<i class="fas fa-chevron-right expand-item"></i>' +
        '</li>';

    $('#' + meal + ' .items').append(htmlElement);
}

function clearListAdd() {
    listAdd.hide();
    $('#add-to-display').show();
    searchInput.val("");
    /*
    listAdd.find('.name').text("");
    listAdd.find('#servings').val("");
    listAdd.find('#mealSelect').val($("option:first").val()); */
}

/*
function checkEmpty() {
    $('.items').each(function() {
        if (this.length == 0) {
            $(this).addClass('empty');
        }
    });
} */