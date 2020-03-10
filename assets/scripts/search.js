function autocomplete(input) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    var selectedfoods;
    var isLargeNumber;
    var fooddetails;
    /*execute a function when someone writes in the text field:*/
    input.addEventListener("input", function() {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("div");
        a.setAttribute("id", this.id + "-autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/

        var happylist;

        $.ajaxSetup({
            method: 'GET',
            headers: {
                'x-app-id': '36e650cf',
                'x-app-key': '9ff34a709f1d44f63aa59fee827713d1',
            }
        });

        $.get('https://trackapi.nutritionix.com/v2/search/instant', {
            query: input.value,
            detailed: true
        }, lstofresults)
        // const searchFoods = async searchText => {
        // const res = await fetch('https://trackapi.nutritionix.com/v2/search/instant?query=milk'
        //   ,{
        //   method: 'GET',
        //   headers: {
        //   'x-app-id':'36e650cf',
        //   'x-app-key': '9ff34a709f1d44f63aa59fee827713d1',
        //   }
        // });
        // lstofresults();

        //const fooditems = await res.json();
        //console.log(fooditem.common);

        function lstofresults(results) {

            const lstResults = results;

            happylist = lstResults;
            //console.log(happylist.common);

            var foodindex = happylist.common;
            //var selectedfood;
            for (i = 0; i < 10; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                //console.log(happylist.common[i]);
                if (happylist.common[i].food_name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    //console.log('Matched! '+happylist.common[i]);
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<img src = " + happylist.common[i].photo.thumb + " > </>";
                    b.innerHTML += "<strong>" + happylist.common[i].food_name.substr(0, val.length) + "</strong>";
                    b.innerHTML += happylist.common[i].food_name.substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + happylist.common[i].food_name + "'>";

                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        input.value = this.getElementsByTagName("input")[0].value;
                        selectedfoods = input.value;

                        isLargeNumber = foodindex.findIndex(function(item, i) {
                            return item.food_name === input.value
                        });
                        //var ele = foodindex.findIndex(isLargeNumber);
                        fooddetails = happylist.common[isLargeNumber];


                        var body = {
                            query: input.value,
                            timezone: "US/Eastern",
                        };




                        //                      $.post(' https://trackapi.nutritionix.com/v2/natural/nutrients', {data: JSON.stringify(body)})
                        //                          .then(function(data) {
                        //                    console.log( "Data Loaded: " + data.foods );
                        //                    });

                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                        //return selectedfoods;
                        showresult();

                    });
                    a.appendChild(b);
                }

                //return selectedfood;

            }

        }

        //lstofresults();


    });

    /*execute a function presses a key on the keyboard:*/
    input.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].addClass("active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].removeClass("active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    function showresult() {

        console.log("selected food is : " + selectedfoods);
        console.log("index details of selected food " + fooddetails.full_nutrients[4].value);
        //if(document.getElementById("results") != null){
        var k = document.getElementById("result");
        k.innerHTML += "<p> You have chosen " + selectedfoods + "</p>";
        k.innerHTML += "<img src = " + fooddetails.photo.thumb + "> </>";
        k.innerHTML += "<p> Serving Weight in gm " + fooddetails.serving_weight_grams + "</p>"

            +
            "<p>Energy Kcal " + fooddetails.full_nutrients[4].value + "</p>";

        //                $.ajaxSetup({
        //                      method: 'POST',
        //                          async: true,
        //                          crossDomain: true,
        //                          url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
        //                          //data: JSON.stringify({query:selectedfoods, timezone: "US/Eastern"}),
        //                        headers: {
        //                        'x-app-id':'36e650cf',
        //                        'x-app-key': '9ff34a709f1d44f63aa59fee827713d1',
        //                            'x-remote-user-id': 0,
        //                        'Content-Type': "application/json;",
        //                            'Accept':"application/json;",
        //                            
        //                      },
        //                      dataType: "json",
        //                      success: function(data)
        //                        {
        //                          console.log("data "+data);
        //                        },
        //                          error : function(){
        //                              console.log("Error...")
        //                          }
        //                      });
        //        $.get("https://trackapi.nutritionix.com/v2/natural/nutrients", JSON.stringify({query: selectedfoods, timezone: "US/Eastern"}));

    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("myInput"));