

// VARIABLES
//--------------------------------------------------------------------------------------------------------------
var topics = ["Dallas Cowboys", "Texas Rangers", "Dallas Stars", "Dallas Mavericks", "LSU Tigers"];
var gifLimit = 10;
var ratingLimit = "PG-13";


//FUNCTION THAT CREATES BUTTONS UPON PAGE LOADING
//--------------------------------------------------------------------------------------------------------------
function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("btn");
        buttons.addClass("sportsBtn");
        buttons.text(topics[i]);
        $("#buttons-container").append(buttons);
    }


    // EMPTY AND RESET GIF CONTAINER
    $(".sportsBtn").unbind("click");
    $(".sportsBtn").on("click", function () {
        $(".gif-image").unbind("click");
        $("#gif-container").empty();
        $("#gif-container").removeClass("gif-border");
        populateGifs($(this).text());
    })
}

// PULL GIF INFO FROM API
//--------------------------------------------------------------------------------------------------------------
function populateGifs(show) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + show +
            "&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + ratingLimit + "&limit=" + gifLimit,
        method: "GET"
    }).then(function (response) {


        // CREATE DIV AND CLASS FOR GIFS
        response.data.forEach(function (element) {
            console.log(element);
            var newDiv = $("<div>");
            newDiv.addClass("single-gif");
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            var newImage = $("<img src= '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gif-image");
            newImage.attr("state", "still");
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animate-data", element.images.fixed_height.url);
            newDiv.append(newImage);
            $("#gif-container").append(newDiv);
        });

        // ON CLICK FUNTION TO START AND STOP GIF ANIMATION
        $("#gif-container").addClass("gif-border");
        $(".gif-image").unbind("click");
        $(".gif-image").on("click", function () {
            if ($(this).attr("state") === "still") {
                $(this).attr("state", "animate");
                $(this).attr("src", $(this).attr("animate-data"));
            } else {
                $(this).attr("state", "still")
                $(this).attr("src", $(this).attr("still-data"));
            }
        });

    });
}

// CREATE NEW BUTTONS ACCORDING TO WHAT USER INPUTS
function addButton(show) {
    if (topics.indexOf(show) === -1) {
        topics.push(show);
        $("#buttons-container").empty();
        renderButtons();
    }
}



// MAIN OPERATIONS
//--------------------------------------------------------------------------------------------------------------

$(document).ready(function () {
    renderButtons();
    $("#submit").on("click", function () {
        event.preventDefault();
        addButton($("#input-text").val().trim());
        $("#input-text").val("");
    })
});

