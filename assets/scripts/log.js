var listAdd = $('.list-add');

$(function() {
    $('#addfoodsubmit').on('click', function() {
        addMeal();
        //clearListAdd();
    });

    $('.results').on('click', 'li', function() {
        var itemName = $(this).text();
        var itemImage = $(this).find('img').attr('src');
        var itemType = $(this).data('type');

        searchInput.val($(this).text());
        searchList.hide();
        
        updateAddList(itemName, itemImage);
    });
});

function updateAddList(name, image) {
    listAdd.find('.name').text(name);
    listAdd.find('img').attr('src', image);
}

function addMeal() {
    var name = listAdd.find('.name').text();
    var servings = listAdd.find('#servings').val();
    var meal = listAdd.find('#mealSelect').val().toLowerCase();

    var htmlElement = '<li class="item">' +
        '<img src="https://d2xdmhkmkbyw75.cloudfront.net/384_thumb.jpg">' +
        '<h2 class="name" title="' + name + '">' + name + '</h2>' +
        '<span class="servings">Servings: <strong>' + servings + '</strong></span>' +
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