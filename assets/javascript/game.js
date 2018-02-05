window.onload = function what() {
	/*---------------------------------------------------------------------------*/
	//		Hangman Repository 
	/*---------------------------------------------------------------------------*/
	var dataBase = ["SUNIL GAVASKAR"
		, "SACHIN TENDULKAR"
		, "RAHUL DRAVID"
		, "ADAM GILCHRIST"
		, "VIVIAN RICHARDS"
		, "KAPIL DEV"
		, "STEVE WAUGH"
		, "MAHENDRA SINGH DHONI"
		, "VIRAT KOHLI"
		, "WASIM AKRAM"
		, "BRIAN LARA"
		, "DON BRADMAN"
		, "JOE ROOT"
		, "GLENN MCGRATH"
		, "SHANE WARNE"
		, "KUMARA SANGAKKARA"
		, "SANATH JAYASURIYA"
		, "ANIL KUMBLE"
		, "SOURAV GANGULY"
		, "COURTNEY WALSH"
		, "MUTTIAH MURALITHARAN"
		, "CURTLY AMBROSE"
		, "BISHAN SINGH BEDI"
		, "ALLAN BORDER"
		, "IAN BOTHAM"
		, "GEOFFREY BOYCOTT"
		, "GREG CHAPPELL"
		, "RICHARD HADLEE"
		, "GRAHAM GOOCH"
		, "GORDON GREENIDGE"
		, "MARTIN CROWE"
		, "MICHAEL HOLDING"
		, "DENNIS LILLEE"
		, "CLIVE LLOYD"
		, "MALCOLM MARSHALL"
		, "GARY KIRSTEN"
		, "GARY SOBERS"
		, "IMRAN KHAN"
		, "CHRIS GAYLE"
		, "INZAMAM UL HAQ"
		, "SHAUN POLLOCK"
		, "RICKY PONTING"
		, "JACQUES KALLIS"
	];

	/*---------------------------------------------------------------------------*/
	//		Global variables
	/*---------------------------------------------------------------------------*/
	var totalWins = 0;
	var totalLoss = 0;
	var attemptsRemaining = 7;
	var gameOn = true;
	var ifWin = false;
	var ifLoss = false;
	var atLeastOneMatch = false;
	var alreadyChosen = false;
	var keyClicked = "";
	var keyCode = 0;
	var winAudio = new Audio('assets/audio/BallHitCheer.mp3');
	var lossAudio = new Audio('assets/audio/Aah.mp3');

	/*---------------------------------------------------------------------------*/
	//		Grab all required document elements by id
	/*---------------------------------------------------------------------------*/
	var hangmanDisp = document.getElementById("spacedout");
	var chosenLettersDisp = document.getElementById("chosen-letters");
	var attemptsRemainingDisp = document.getElementById("attempts-remaining");
	var totalWinsDisp = document.getElementById("total-wins");
	var totalLossDisp = document.getElementById("total-loss");
	var spaceBarDisp = document.getElementById("space-bar-text");

	/*---------------------------------------------------------------------------*/
	//		Declare and Initialize variables before reading input key clicks 
	//		Initial Page Load with first hangman puzzle
	/*---------------------------------------------------------------------------*/
	var hangmanLetters = [];
	var hangmanBlanks = [];
	var chosenLetters = [""];
	var randomIndex = Math.floor((Math.random() * dataBase.length));
	var hangmanWord = dataBase[randomIndex];
	// console.log(randomIndex);
	// console.log(hangmanWord);
	// console.log(hangmanWord.length);

	for (var i = 0; i < hangmanWord.length; i++) {
		hangmanLetters.push(hangmanWord.charAt(i));
		if (hangmanWord.charAt(i) >= "A" && hangmanWord.charAt(i) <= "Z") {
			hangmanBlanks.push("_");
		}
		else if (hangmanWord.charAt(i) === " ") {
			hangmanBlanks.push(" ");
		}
	}
	// console.log(hangmanLetters);
	// console.log(hangmanBlanks);

	hangmanDisp.innerHTML = concatWord(hangmanBlanks);

	/*---------------------------------------------------------------------------*/
	//		Script Re-entry Point after key click
	/*---------------------------------------------------------------------------*/

	document.onkeyup = function (event) {
		// console.log("Prcoessing click! " + event.key + " " + event.keyCode);

		/*---------------------------------------------------------------------------*/
		//	If game is on, don't load new hangman puzzle.
		//	If game is NOT on and space bar is pressed, load a new hangman puzzle.
		/*---------------------------------------------------------------------------*/

		if (!gameOn && event.keyCode === 32) {
			// console.log("Getting new hangman question");

			// Half second delay
			sleep(500);
			hangmanLetters = [];
			hangmanBlanks = [];
			chosenLetters = [""];
			randomIndex = Math.floor((Math.random() * dataBase.length));
			hangmanWord = dataBase[randomIndex];
			// console.log(randomIndex);
			// console.log(hangmanWord);
			// console.log(hangmanWord.length);

			for (var i = 0; i < hangmanWord.length; i++) {
				hangmanLetters.push(hangmanWord.charAt(i));
				if (hangmanWord.charAt(i) >= "A" && hangmanWord.charAt(i) <= "Z") {
					hangmanBlanks.push("_");
				}
				else if (hangmanWord.charAt(i) === " ") {
					hangmanBlanks.push(" ");
				}
			}
			// console.log(hangmanLetters);
			// console.log(hangmanBlanks);

			/*---------------------------------------------------------------------------*/
			//	Initialize Variables and innerHTML elements for frest start
			//	of next Hangman Puzzle
			/*---------------------------------------------------------------------------*/

			attemptsRemaining = 7;
			gameOn = true;
			ifWin = false;
			ifLoss = false;
			hangmanDisp.innerHTML = concatWord(hangmanBlanks);
			chosenLettersDisp.innerHTML = concatWord(chosenLetters);
			attemptsRemainingDisp.innerHTML = attemptsRemaining;
			spaceBarDisp.innerHTML = "";
		}

		/*---------------------------------------------------------------------------*/
		//	Process key clicked, if Win or Loss has not been decided
		/*---------------------------------------------------------------------------*/

		if (!ifWin && !ifLoss) {
			keyClicked = (event.key).toUpperCase();
			keyCode = event.keyCode;
			// console.log("Key clicked: " + keyClicked);
			if (keyCode >= 65 && keyCode <= 90) {
				for (var i = 0; i < chosenLetters.length; i++) {
					if (keyClicked === chosenLetters[i]) {
						alreadyChosen = true;
					}
				}
				if (alreadyChosen) {
					alreadyChosen = false;
				}
				else {
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
					winAudio.play();
				}
				if (attemptsRemaining === 0) {
					ifLoss = true;
					totalLoss++;
					lossAudio.play();
				}
				hangmanDisp.innerHTML = concatWord(hangmanBlanks);
				
				/*---------------------------------------------------------------------------*/
				// Display answer if attempt fails
				/*---------------------------------------------------------------------------*/
				if (ifLoss) { 
					hangmanDisp.innerHTML = concatWord(hangmanLetters); 
				}

				chosenLettersDisp.innerHTML = concatWord(chosenLetters);
				attemptsRemainingDisp.innerHTML = attemptsRemaining;
				totalWinsDisp.innerHTML = totalWins;
				totalLossDisp.innerHTML = totalLoss;

				/*---------------------------------------------------------------------------*/
				//	After a Win or Loss, reset gameOn switch to trigger loading a
				//	fresh puzzle
				/*---------------------------------------------------------------------------*/

				if (ifWin || ifLoss) {
					// console.log("Win or loss confirmed!");
					gameOn = false;
					spaceBarDisp.innerHTML = "Press Space Bar to continue playing";
				}
			}
		}
	}
};

/*---------------------------------------------------------------------------*/
//		Functions
/*---------------------------------------------------------------------------*/

function concatWord(myCharArray) {
	var myWord = "";
	for (var i = 0; i < myCharArray.length; i++) {
		myWord = myWord + myCharArray[i];
	}
	return myWord;
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}