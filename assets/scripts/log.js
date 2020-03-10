$(function() {
    var listAdd = $('.list-add');
    // var meals = $('#meals');

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

    function resetListAdd() {
        listAdd.find('.name').text("");
        listAdd.find('#servings').val("");
        listAdd.find('#mealSelect').val("Breakfast");
    }

    /*
    function checkEmpty() {
        $('.items').each(function() {
            if (this.length == 0) {
                $(this).addClass('empty');
            }
        });
    } */

    $('#addfoodsubmit').on('click', function() {
        addMeal();
        resetListAdd();
    });
});