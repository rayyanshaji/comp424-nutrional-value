var listAdd = $('.list-add');

$(function() {
    var total = 0;
    $('#addfoodsubmit').on('click', function() {
        addMeal();
        totalCalories();
        //clearListAdd();
    });

    $('.results').on('click', 'li', function() {
        var itemName = $(this).find("span#foodname-title").text();
        
        
        var itemServingsQty = $(this).find("#serving-unit-quantity").text();
        
       
        
        var itemImage = $(this).find('img').attr('src');
        var itemType = $(this).data('type');
     
        
        var itemServing = $(this).find("#serving-unit-search").text();
        //var itemServing = $(this).find('span').attr('id').text()”;
       
        
        var itemCalories = $(this).find("span#calories").text();

        searchInput.val($(this).find("span#foodname-title").text());
        searchList.hide();
        
        
        updateAddList(itemName, itemServingsQty, itemServing, itemCalories, itemImage);
    });
});

function updateAddList(name, serving, unit, calories, image) {
    listAdd.find('.name').text(name);
    
    listAdd.find('#servings').val(serving);
   
    listAdd.find('#servingsunit').text(unit);
    listAdd.find('#caloriesdisplay').text(calories);
    var initial_serving = listAdd.find('#servings').val(serving);
  
    var calories_per_serving_qty = parseInt(calories)/serving;
    
    console.log("cal per qty -->" +calories_per_serving_qty);
    console.log($(this).find('#servingsunit').val());
    
    console.log('initial serving' +parseInt(initial_serving));
    listAdd.find('img').attr('src', image);


$('#servings').on('keyup', function(){
    
    console.log('current --> '+parseInt(calories_per_serving_qty));
    
    var changed_calories = parseInt(calories_per_serving_qty)*$("#servings").val();
    
    console.log('changed --->' +changed_calories);
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

function totalCalories(){
    var total = 0;
    $('span#foodcalories').each(function(){
        var cal = parseInt($(this).text(),10);
        if($.isNumeric(cal)){
            total += cal;
        }
            var htmlTotal = '<span id="foodcalories">' +total+'</span>' +
            '<span id="foodcaloriestext">Cal</span>';
            
            $('#totalcal .items').html(htmlTotal);
        total = cal;
//            if(total.length>0){
//            console.log('sum of element -->'+total);
//            var finaltotal = total.reduce(function(a,b){ return a+b },0)
//                console.log(finaltotal);
//            }
});
}


/*
function checkEmpty() {
    $('.items').each(function() {
        if (this.length == 0) {
            $(this).addClass('empty');
        }
    });
} */