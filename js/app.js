
$(document).ready(function(){
	
	/********************
	*	Constants
	********************/
	
	var MAX_NUM = 100;
	var ENTER_KEY_CODE = 13;
	
	/********************
	*	Game Data
	********************/
	
	var hiddenNumber = 0;
	var numGuesses = 0;
	var prevGuessDiff = 0;
	var gameRunning = false;
	
	/********************
	*	Functions
	********************/
	
	var clearCurrentGame = function clearCurrentGame() {
		$('#guessList').children().remove();
		$('#count').text(0);
		$('#feedback').text("Make your Guess!");
	};
	
	var startNewGame = function startNewGame() {
		//console.log("starting new game");
		// clear page of all previous game output
		clearCurrentGame();
		$('#guessing_UI').show();
		$('#guess_count').show();
		$('#victory_message').hide();
		
		// Generate a random number between 1-100 for the user to guess.
		hiddenNumber = Math.floor((Math.random()*100)+1);
		numGuesses = 0;
		prevGuessDiff = 0;
		gameRunning = true;
	};
	
	var endGame = function endGame() {
		gameRunning = false;
		// hide guessing interface
		$('#guessing_UI').hide();
		$('#guess_count').hide();
		// show victory message
		$('#victory_message').show();
		$('#victory_guesses').text(numGuesses);
	};
	
	var attemptGuess = function attemptGuess() {
		if (gameRunning) {
			submitGuess();
		}
		else {
			alert("You already won!");
		}
	};
	
	var submitGuess = function submitGuess() {
		var guess = +($('#userGuess').val()).trim();
		var feedbackMessage = "";
			
		// validate user input
		if ((guess >= 1) && (guess <= MAX_NUM) && (guess % 1 == 0)) {
			// process guess
			numGuesses++;
			
			// Update UI with new guess
			$('#count').text(numGuesses);
			$('<li></li>')
				.text(guess)
				.appendTo($('#guessList'));
			
			// Compare guess with hidden number and give feedback
			var guessDiff = Math.abs(guess - hiddenNumber);
			console.log("guessDiff is " + guessDiff);
			if (guessDiff == 0) {
				$('#feedback').text("You guessed it!");
				
				// The number was guessed, so end the game.
				endGame();
			}
			else {
				// give feedback about how good the guess was
				if (guessDiff <= 2) {
					feedbackMessage = "Burning!";
				}
				else if (guessDiff <= 5) {
					feedbackMessage = "Hot!";
				}
				else if (guessDiff <= 10) {
					feedbackMessage = "Warm.";
				}
				else if (guessDiff <= 20) {
					feedbackMessage = "Cool.";
				}
				else if (guessDiff <= 30) {
					feedbackMessage = "Cold.";
				}
				else {
					feedbackMessage = "Ice Cold.";
				}
				
				// give feedback about getting warmer or colder
				if (numGuesses > 1) {
					if (guessDiff < prevGuessDiff) {
						feedbackMessage = feedbackMessage + " You're getting warmer...";
					}
					else if (guessDiff > prevGuessDiff) {
						feedbackMessage = feedbackMessage + " You're getting colder...";
					}
				}
				
				$('#feedback').text(feedbackMessage);
				
				prevGuessDiff = guessDiff;
			}
		}
		else {
			alert("Invalid guess!");
		}
	};

	/********************
	*	Event Handlers
	********************/
	
	/*--- Display information modal box ---*/
  	$('a.what').click(function(){
    	$('.overlay').fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});
	
	$('a.new').click(function() {
		startNewGame();
	});
	
	$('#guessButton').click(function() {
		attemptGuess();
		// clear input textbox
		$('#userGuess').val("");
	});
	
	$('#userGuess').keydown(function(event) {
		if (event.which == ENTER_KEY_CODE) {
			attemptGuess();
			// clear input textbox
			$('#userGuess').val("");
		}
	});
		
	/********************
	*	Start
	********************/
	
	startNewGame();
});