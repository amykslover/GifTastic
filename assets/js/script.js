//Create set of original buttons that match the theme
//Allow new buttons to be dynamically created when the user inputs text into a box
//Pass the input box variable into the API call

var baseURL = 'https://api.giphy.com/v1/gifs/search?'
var animals = ['sloth', 'cat', 'kitten', 'hedgehog', 'puppy']
//You can change the quantity here if more or less results are desired
var quantity = 10
var searchQuantity = ('&limit='+quantity)
var apiKey = '&api_key=8ar1hXDZE0ZQfYYwZmnouFFY3la70VLz'


//Create a function that wipes out any buttons that already exist
//then creates buttons for all variables in the array
function renderButtons() {
	$(".button-area").empty();
	// Looping through the array of animals
	for (var i = 0; i < animals.length; i++) {
		//Dynamicaly generating buttons for each anima; in the array.
		var newButton = $("<button>");
		newButton.addClass("button");
		newButton.attr("data-name",animals[i])
		newButton.text(animals[i]);
		// Adding the button to the HTML
		$(".button-area").append(newButton);
	}
}

//Allow user to create new animal button by typing into input box. 

$("#add-animal").on("click", function(event) {
	event.preventDefault();
	var animal = $("#animal-input").val().trim();
	animals.push(animal);
	$("#animal-input").val('');
	renderButtons();
	});

//User will push one of the buttons and cause giph image and rating to be displayed based on the data name attribute

function displayAnimals() {
	$('.display-area').empty();

	var searchAnimal = $(this).attr("data-name");
	var searchTerm = ('q='+searchAnimal)
	var queryURL = baseURL + searchTerm + searchQuantity + apiKey;
	console.log(queryURL);


	$.ajax({
		url: queryURL,
		method: 'GET'
		}).done(function(response) {

			var results = response.data;
			console.log(results);

			for (var i = 0; i < results.length; i++) {

				var animalDiv = $('<div>');
				animalDiv.addClass('aDiv');

				var imageDiv = $('<div>');
		        var imgURLr = response.data[i].images.fixed_height_still.url;
		        var imgURLa = response.data[i].images.fixed_height.url;
		        var imgURLs = response.data[i].images.fixed_height_still.url;

		      	var image = $('<img>')
				image.addClass('gif')
		      	image.attr('src', imgURLr);
				image.attr('data-animate',imgURLa)
				image.attr('data-still',imgURLs)
				image.attr('data-state','still')
				imageDiv.append(image);
				//Verify that image object is built as expected
				console.log(image);
				//Checking to make sure that values are returned as expected
				console.log('regular ' + imgURLr);
				console.log('still ' + imgURLs);
				console.log('active '+ imgURLa);

				var rating = response.data[i].rating;
				console.log(rating)
				var ratingDisplay = $('<div>').text('Rating: ' + rating);
				
				animalDiv.append(imageDiv);
				animalDiv.append(ratingDisplay);

				$('.display-area').prepend(animalDiv);
			}

		});


	};


 	//Users can click on a gif and they will move or be still
 	//We are going to use the attributes set in the display function to allow a user to click on the function to change the data state, targeting the class 
 	//The 'src' tag will have a default 'still' value assigned from when we first set the attribute above
 	//The data-still tag will have the same as the source
 	//The data-animagte attribute will store the animated gif so when the user clicks on a button where the state was previously set to still, the state will change to animate and the animated gif url will be referenced.
   $(".gif").on("click", function(event) {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      console.log(this);
      var state = $(this).data("data-state");
      console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

    });

$(document).on("click", ".button", displayAnimals);

renderButtons();

				
