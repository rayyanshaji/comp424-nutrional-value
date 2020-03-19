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
    
});

function updateAddList(item) {
    const listAdd = $('.list-add');

    listAdd.find('.name').text(item.name);
    listAdd.find('img').attr('src', item.image);
    listAdd.find('#servings').val(item.servingQty);
    listAdd.find('#serving-unit').text(item.servingUnit);
    listAdd.find('#calories').text(item.calories);

    var calories_per_serving_qty = parseInt(item.calories)/item.serving;

    $('#servings').on('keyup', function() {
        var changed_calories = parseInt(calories_per_serving_qty) * $("#servings").val();
        listAdd.find('#calories').text(changed_calories).append(' calories');
    })

    // Add item to the list
    $('#addfoodsubmit').on('click', function() {
        addItem();
        totalCalories();
        clearListAdd();
    });

    function addItem() {
        const itemTemplate = `
            <li class="item">
                <img src="${item.image}">
                <h2 class="name" title="${item.name}">${item.name}</h2>
                <span class="servings">Servings: ${item.servingQty}<strong></strong>
                    <span>${item.servingUnit}</span>
                </span>
                <button class="deletemeal"><i class="fas fa-times"></i></button>
                <span id="foodcalories">${item.calories}</span>
                <span id="foodcaloriestext">Calories</span>
                <i class="fas fa-chevron-right expand-item"></i>
            </li>
        `;
        var meal = $('#mealSelect').val().toLowerCase();
        //document.querySelector('#' + meal + ' .items').innerHTML += itemTemplate;
        $('#' + meal + ' .items').append(itemTemplate);
    }
}

function clearListAdd() {
    $('.list-add').hide();
    $('#add-to-display').show();
    $('#searchInput').val("");
}

var total = 0;
function totalCalories(){
    
    $('span#foodcalories').each(function(){
        var cal = parseInt($(this).text(),10);
        if($.isNumeric(cal)){
            total += cal;
        }
        var htmlTotal = '<span id="foodcalories">' +total+'</span>' +
        '<span id="foodcaloriestext">Cal</span>';
        $('#totalcal .items').html(htmlTotal);
        total = cal; //assigning current calories val so that it doesn't accumulate the previous values with current sum
       
    });
}

function deleteItem() {
    var flag = false;
        
    $( ".deletemeal" ).click(function(evt){
        flag = true;    
        if(flag === true){
        var c_cal =  parseInt($(this).closest('li').find('span#foodcalories').text());
        var c_total = parseInt($('#totalcal').find('span#foodcalories').text());   
        var sel = $(this);   
        console.log('CURRENT TOTAL NOW --->'+total);
        var v = c_total - c_cal;
        console.log("now the value is "+v);
        flag = false;    
        evt.stopImmediatePropagation();
        var htmlel = '<span id="foodcalories">' +v+ '</span>'; 
        $('#totalcal').find('span#foodcalories').replaceWith(htmlel);
        v = 0;
        sel.closest('li').toggleClass('strike').fadeOut(300, function(){$(this).detach().removeData(); 
        console.log('NEW TOTAL --->'+parseInt($('#totalcal').find('span#foodcalories').text()));                                                                
        });
        }

    });
   
}