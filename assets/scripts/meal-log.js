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

        searchInput.val($(this).find("span#foodname-title").text());
        searchList.hide();
        
        updateAddList(itemName, itemServing, itemImage);
    });
});

function updateAddList(name, unit, image) {
    listAdd.find('.name').text(name);
    listAdd.find('#servingsunit').text(unit);
    listAdd.find('img').attr('src', image);
}

function addMeal() {
    var name = listAdd.find('.name').text();
    var image = listAdd.find('img').attr('src');
    var servings = listAdd.find('#servings').val();
    var servingsunit = listAdd.find('#servingsunit').val();
    var meal = listAdd.find('#mealSelect').val().toLowerCase();


    // TODO: CONVERT TO TEMPLATE STRINGS
    var htmlElement = '<li class="item">' +
        '<img src="' + image + '">' +
        '<h2 class="name" title="' + name + '">' + name + '</h2>' +
        '<span class="servings">Servings: <strong>' + servings + '</strong>' + '<span>' +servingsunit+ '</span>' + '</span>' +
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