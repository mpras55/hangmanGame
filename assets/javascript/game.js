window.onload = function what() {
	// Hangman Repository 
	var dataBase = ["SUNIL GAVASKAR"
		, "SACHIN TENDULKAR"
		, "RAHUL DRAVID"
		, "ADAM GILCHRIST"
		, "VIVIAN RICHARDS"
		, "KAPIL DEV"
		, "STEVE WAUGH"
		, "M S DHONI"
		, "VIRAT KOHLI"
		, "WASIM AKRAM"
		, "BRIAN LARA"
		, "SIR DON BRADMAN"
		, "JOE ROOT"
		, "GLENN MCGRATH"
		, "SHANE WARNE"
		, "KUMARA SANGAKKARA"
		, "SANATH JAYASURIYA"
		, "ANIL KUMBLE"
		, "SOURAV GANGULY"
		, "COURTNEY WALSH"
		, "MUTTIAH MURALITHARAN"
	];

	//Global variables
	var totalWins = 0;
	var totalLoss = 0;
	var attemptsRemaining = 7;
	var gameOn = true;
	var ifWin = false;
	var ifLoss = false;

	//Grab all required document elements by id
	var hangmanDisp = document.getElementById("spacedout");
	var chosenLettersDisp = document.getElementById("chosen-letters");
	var attemptsRemainingDisp = document.getElementById("attempts-remaining");
	var totalWinsDisp = document.getElementById("total-wins");
	var totalLossDisp = document.getElementById("total-loss");

	//Declare and Initialize variables before reading input key clicks 
	var hangmanLetters = [];
	var hangmanBlanks = [];
	var chosenLetters = [];
	var randomIndex = Math.floor((Math.random() * dataBase.length));
	var hangmanWord = dataBase[randomIndex];
	console.log(randomIndex);
	console.log(hangmanWord);
	console.log(hangmanWord.length);

	for (var i = 0; i < hangmanWord.length; i++) {
		hangmanLetters.push(hangmanWord.charAt(i));
		if (hangmanWord.charAt(i) >= "A" && hangmanWord.charAt(i) <= "Z") {
			hangmanBlanks.push("_");
		}
		else if (hangmanWord.charAt(i) === " ") {
			hangmanBlanks.push(" ");
		}
	}
	console.log(hangmanLetters);
	console.log(hangmanBlanks);

	// var displayWord = concatWord(hangmanLetters);
	// console.log(displayWord);

	// displayWord = concatWord(hangmanBlanks);
	// console.log(displayWord);

	hangmanDisp.innerHTML = concatWord(hangmanBlanks);

	// Process key entered, while Win or Loss has not been decided
	// console.log("Inside win-loss while loop!");
	var keyClicked = "";
	var keyCode = 0;
	var atLeastOneMatch = false;
	var alreadyChosen = false;
	document.onkeyup = function (event) {
		console.log("Prcoessing click! " + event.key + " " + event.keyCode);
		if (!ifWin && !ifLoss) {
			keyClicked = (event.key).toUpperCase();
			keyCode = event.keyCode;
			console.log("Key clicked: " + keyClicked);
			if (keyCode >= 65 && keyCode <= 90) {
				chosenLetters.push(keyClicked);
				for (var i = 0; i < hangmanLetters.length; i++) {
					if (keyClicked === hangmanLetters[i]) {
						hangmanBlanks[i] = hangmanLetters[i];
						atLeastOneMatch = true;
					}
				}
				if (atLeastOneMatch) {
					atLeastOneMatch = false;
				}
				else {
					attemptsRemaining--;
				}
			}
			if (concatWord(hangmanBlanks) === concatWord(hangmanLetters)) {
				ifWin = true;
				totalWins++;
				alert("You Won!");
			}
			if (attemptsRemaining === 0) {
				ifLoss = true;
				totalLoss++;
				alert("Sorry. Better luck next time!");
			}
			hangmanDisp.innerHTML = concatWord(hangmanBlanks);
			chosenLettersDisp.innerHTML = concatWord(chosenLetters);
			attemptsRemainingDisp.innerHTML = attemptsRemaining;
			totalWinsDisp.innerHTML = totalWins;
			totalLossDisp.innerHTML = totalLoss;
		}
	}

};

// Functions

function concatWord(myCharArray) {
	var myWord = "";
	for (var i = 0; i < myCharArray.length; i++) {
		myWord = myWord + myCharArray[i];
	}
	return myWord;
}
