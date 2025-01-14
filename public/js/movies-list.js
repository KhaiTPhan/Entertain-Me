var moviesHistory = []
var movie




// Function to render buttons based on what is in moviesHistory array
function renderButtons() {
    $(".buttons-view").empty();
    for (var i = 0; i < moviesHistory.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-success movie-btn");
        a.attr("data-Title", moviesHistory[i]);
        a.text(moviesHistory[i]);
        $(".buttons-view").prepend(a);
    }
}




// Function to display movie info
function displayMovieTitle() {
   
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var movieDiv = $("<div class='movie'>");
            if (moviesHistory.includes(response.Title) === false) {
                moviesHistory.push(response.Title)
            }
            
            renderButtons()

        })
};



//On click event listener for movie buttons
$(document).on("click", ".movie-btn", function () {
    movie = $(this).attr("data-Title");
    displayMovieTitle()

})


//To run when document loads (if/else statement that will pull from local storage only if the value is not "null")
$(document).ready(function() {
    if(localStorage.getItem("movies") !== null) {
        var savedMovie = localStorage.getItem("movies");
        var pushMovies = JSON.parse(savedMovie)
        moviesHistory = moviesHistory.concat(pushMovies)
    }

    //render buttons
    renderButtons()
  })
