
var baseURL = 'https://api.giphy.com/v1/gifs/search?'
var animals = ['sloth', 'cat', 'kitten', 'hedgehog', 'puppy']
var searchQuantity = ('&limit=5')
var apiKey = '&api_key=8ar1hXDZE0ZQfYYwZmnouFFY3la70VLz'


//Create a function that wipes out any buttons that already exist and then creates buttons for all variables in the array
function renderButtons() {

	$(".button-area").empty();

	// Looping through the array of animals
	for (var i = 0; i < animals.length; i++) {

		// Dynamicaly generating buttons for each movie in the array.
		var newButton = $("<button>");
		newButton.addClass("button");
		newButton.attr("data-name",animals[i])
		newButton.text(animals[i]);
		// Adding the button to the HTML
		$(".button-area").append(newButton);
		console.log(newButton);
	}

}


$("#add-animal").on("click", function(event) {
	event.preventDefault();
	var animal = $("#animal-input").val().trim();
	animals.push(animal);
	renderButtons();
	});


function displayAnimals() {
	var searchAnimal = $(this).attr("data-name");
	var searchTerm = ('q='+searchAnimal)
	var queryURL = baseURL + searchTerm + searchQuantity + apiKey;
	console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: 'GET'
		}).done(function(response) {
	
			console.log(response);
			console.log(response.data[0].images.fixed_height.url);
			console.log(response.data[0].rating);
			var animalDiv = $('<div>');
			animalDiv.addClass('aDiv');

	        var imgURL = response.data[0].images.fixed_height.url;

          	var image = $("<img>").attr("src", imgURL);

			response.data[0].images.fixed_height.url;
			
			var rating = response.data[0].rating;
			var pOne = $("<p>").text("Rating: " + rating);
			response.data[0].rating;
			
			animalDiv.append(image);
			animalDiv.append(rating);

			$('.display-area').prepend(animalDiv);
		});


	};


        //   // Creating a div to hold the movie
        //   var movieDiv = $("<div class='movie'>");

        //   // Storing the rating data
        //   var rating = response.Rated;

        //   // Creating an element to have the rating displayed
        //   var pOne = $("<p>").text("Rating: " + rating);

        //   // Displaying the rating
        //   movieDiv.append(pOne);

        //   // Storing the release year
        //   var released = response.Released;

        //   // Creating an element to hold the release year
        //   var pTwo = $("<p>").text("Released: " + released);

        //   // Displaying the release year
        //   movieDiv.append(pTwo);

        //   // Storing the plot
        //   var plot = response.Plot;

        //   // Creating an element to hold the plot
        //   var pThree = $("<p>").text("Plot: " + plot);

        //   // Appending the plot
        //   movieDiv.append(pThree);

        //   // Retrieving the URL for the image
        //   var imgURL = response.Poster;

        //   // Creating an element to hold the image
        //   var image = $("<img>").attr("src", imgURL);

        //   // Appending the image
        //   movieDiv.append(image);

        //   // Putting the entire movie above the previous movies
        //   $("#movies-view").prepend(movieDiv);
        // });

      // }


$(document).on("click", ".button", displayAnimals);

renderButtons();

				
//Create set of original buttons that match the theme
//Allow new buttons to be dynamically created when the user inputs text into a box
//Pass the input box variable into the API call
