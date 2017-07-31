let currSymUser;
let currSymComp;
let singlePlayer = true;
let buttonIds = {0:"zero",1:"first",2:"second",3:"third",4:"fourth",5:"fifth",6:"sixth",7:"seventh",8:"eighth"}
let winnerPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let drawPattern = [0,1,2,3,4,5,6,7,8];
let gameObj = {0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
let X = ".X";
let O = ".O";
let h1 = "h1";
let draw = "draw";
let won = "won";
let userSymbol = ".userSymbol";
let computerSymbol = ".computerSymbol";
function fadeOut(element){
	$(element).fadeOut(500);
}
function fadeIn(element){
	$(element).fadeIn(1000)
}
function showMe(element){
	$(element).show();
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function lowerOpatictyWhenResultShown(){
	let choiceContent = '.choiceContent';
	let computerThinking = ".computerThinking";
	let buttonContainer = '.buttonContainer';
	$(buttonContainer).css({opacity : '0.5'});
	$(computerThinking).css({opacity : '0.5'});
	$(choiceContent).css({opacity : '0.5'});
}
function fullOpacityAfterResult(){
	let choiceContent = '.choiceContent';
	let computerThinking = ".computerThinking";
	let buttonContainer = '.buttonContainer';
	$(buttonContainer).css({opacity : '1'});
	$(computerThinking).css({opacity : '1'});
	$(choiceContent).css({opacity : '1'});
}
function afterResultBeforeTimeOut(){
	let computerThinking = ".computerThinking";
	let ticTacToeArea = '.ticTacToeArea';
	lowerOpatictyWhenResultShown();
	gameObj ={0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
	$(ticTacToeArea).prop("disabled",true);
	$(computerThinking).text("");
	$(computerSymbol).css({visibility:'hidden'});
	$(userSymbol).text("Choose");
	$('.playerTwo').hide();
}
function afterResultTimeOut(){
	let ticTacToeArea = '.ticTacToeArea';
	let arrow = '.arrow';
	$(h1).animate({top:'-500'},500);
	$(ticTacToeArea).text("").css({fontSize : '.1rem'});
	$(O).css({visibility : 'visible'});
	$(X).css({visibility : 'visible'});
	$(arrow).animate({opacity : '1'},500);
	fullOpacityAfterResult();
}
function winOrDrawMessages(str){
	let popup = 400;
	$(h1).text(str).animate({top:popup},1000);
}
//if there is a winner reset all the variable for next game
function weHaveWinner(winner){
	let whoseTheBoss = ["You're the boss ","I'm the boss","You win "];
	let whoWon = whoseTheBoss[0] + " " + winner;
	let youWin = whoseTheBoss[2] + " " + winner;
	if (singlePlayer) {
		if (winner === currSymUser) {
			winOrDrawMessages(whoWon);
		}else if (winner === currSymComp) {
			winOrDrawMessages(whoseTheBoss[1]);
		}
	}else{
		winOrDrawMessages(youWin);
	}
	afterResultBeforeTimeOut();
	setTimeout(function() {
		afterResultTimeOut();
		// $('.playerTwo').css({visibility : 'hidden'});
	}, 2000);
	currSymUser = undefined;
}
function itWasADraw(){
	let matchDraw = ["I like competition","It's a draw"]
	if (singlePlayer) {
		winOrDrawMessages(matchDraw[0]);
	}else {
		winOrDrawMessages(matchDraw[1]);
		
	}
	afterResultBeforeTimeOut();
	setTimeout(function() {
		afterResultTimeOut();
		// $('.playerTwo').css({visibility : 'hidden'});
	}, 2000);
	currSymUser = undefined;
}
function checkIfWonOrDraw(gameObject){
	let stringX = 'X';
	let stringO = 'O';
	let draw = "draw";
	let won = "won";
	for(var i = 0; i < winnerPatterns.length; i+=1){
		// get the winnerPatterns array and check if there are 2 values similar in every pattern and return winner
		if(gameObject[winnerPatterns[i][0]] === stringX && gameObject[winnerPatterns[i][1]] === stringX  && gameObject[winnerPatterns[i][2]] === stringX){
			weHaveWinner(stringX);
			return won;
		}else if (gameObject[winnerPatterns[i][0]] === stringO && gameObject[winnerPatterns[i][1]] === stringO  && gameObject[winnerPatterns[i][2]] === stringO) {
			weHaveWinner(stringO);
			return won;
		}
	}
	if(gameObject[0] !== "" && gameObject[1] !== "" && gameObject[2] !== "" && gameObject[3] !== "" && gameObject[4] !== "" && gameObject[5] !== "" && gameObject[6] !== "" && gameObject[7] !== "" && gameObject[8] !== ""){
			itWasADraw();
			return draw;
	}
}
function computerMoveDecided(move,iteration,index){
	let block = "block";
	let goWin = "win";
	let random = "random";
	let idToReturn = "";
	if (move === goWin) {
		gameObj[winnerPatterns[iteration][index]] = currSymComp;
		idToReturn = buttonIds[winnerPatterns[iteration][index]];
	}else if (move === block) {
		gameObj[winnerPatterns[iteration][index]] = currSymComp;
		idToReturn = buttonIds[winnerPatterns[iteration][index]];
	}else if (move === random) {
		let numsLeft = drawPattern.reverse();
		for(var i = 0; i < drawPattern.length; i+=1){
			if(gameObj[drawPattern[i]] === ""){
				gameObj[drawPattern[i]] = currSymComp;
				idToReturn = buttonIds[drawPattern[i]];
				break;
			}
		}
	}
	return idToReturn;
}
// params are gameObj, and the currentSymbol entered
function computerMove(objectProperty){
	//will return button ID so we can display computer symbol
	let block = "block";
	let center = "center";
	let goWin = "win";
	let random = "random";
	// if the center spot is empty, computer will place its move in center;
	if(gameObj[4] === ""){
		gameObj[4] = currSymComp;
		return buttonIds[4];
	} 
	// this will check if the 2 computer symbols are set so with the third move the computer will win, this will make the computer win
	for(var i = 0; i < winnerPatterns.length; i+=1 ){
		if(gameObj[winnerPatterns[i][0]] === currSymComp && gameObj[winnerPatterns[i][1]] === currSymComp && gameObj[winnerPatterns[i][2]] === ""){
			return computerMoveDecided(goWin,i,2);
		}else if (gameObj[winnerPatterns[i][0]] === currSymComp && gameObj[winnerPatterns[i][1]] === "" && gameObj[winnerPatterns[i][2]] === currSymComp ) {
			return computerMoveDecided(goWin,i,1);
		}else if (gameObj[winnerPatterns[i][0]] === "" &&  gameObj[winnerPatterns[i][1]] === currSymComp && gameObj[winnerPatterns[i][2]] === currSymComp ) {
			return computerMoveDecided(goWin,i,0);
		}
	}
	// this will check if the user has 2 symbols with which the 2rd symbol will win the game for the user, this will block that move
	for(var i = 0; i < winnerPatterns.length; i+=1 ){
		if(gameObj[winnerPatterns[i][0]] === currSymUser && gameObj[winnerPatterns[i][1]] === currSymUser && gameObj[winnerPatterns[i][2]] === ""){
			return computerMoveDecided(block,i,2);
		}else if (gameObj[winnerPatterns[i][0]] === currSymUser && gameObj[winnerPatterns[i][2]] === currSymUser && gameObj[winnerPatterns[i][1]] === "") {
			return computerMoveDecided(block,i,1);
		}else if (gameObj[winnerPatterns[i][1]] === currSymUser && gameObj[winnerPatterns[i][2]] === currSymUser && gameObj[winnerPatterns[i][0]] === "") {
			return computerMoveDecided(block,i,0);
		}
	}
	// this will return a random id
	var rand =  computerMoveDecided(random);
	return rand;
}
// will display computer's symbol when user chooses its symbol
function computerMessageShow(btnToHide){
	$(computerSymbol).css({opacity:'.1'});
	$(computerSymbol).text('Computer is: ' + currSymComp);
	$(computerSymbol).css({visibility:'visible'});
	$(btnToHide).css({visibility : 'hidden'});
	$(computerSymbol).animate({opacity:'1'},500);
}
// will display user's symbol when user chooses its symbol
function userMessageShow(){
	let arrow = '.arrow';
	let ticTacToeArea = '.ticTacToeArea';
	$(userSymbol).css({opacity:'.1'});
	if(!singlePlayer){
		$(userSymbol).text('Player One: ' + currSymUser);
	}else {
		$(userSymbol).text('You chose: ' + currSymUser);
	}
	$(userSymbol).animate({opacity:'1'},500);
	$(arrow).animate({opacity : '0'},500);
	$(ticTacToeArea).prop("disabled",false);
}
function hideGameTypeOption(){
	let choiceContent = '.choiceContent';
	let buttonContainer = '.buttonContainer';
	let ticTacToeArea = '.ticTacToeArea';
	$(buttonContainer).css({visibility : 'visible'});
	$(ticTacToeArea).css({visibility : 'visible'}).fadeIn(1500).prop("disabled",true);
	$(choiceContent).animate({top:'-500'},1000);
}
$(document).ready(function(){
	let chooseTypeGameSingle = ".chooseTypeGameSingle";
	let chooseTypeGameDouble = ".chooseTypeGameDouble";
	let stringX = 'X';
	let stringO = 'O';
	let draw = "draw";
	let won = "won";
	let computerLetMeThink = "Ok Let Me Think...";
	let computerTalks = ["Hah I got this..","Hmmm...let me think...","Intelligent move...","Let's see what you got"];
	let computerThinking = ".computerThinking";
	let ticTacToeArea = '.ticTacToeArea';
	$(ticTacToeArea).prop("disabled",true);
	$(chooseTypeGameSingle).on('click',function(){
		hideGameTypeOption();
		singlePlayer = true;
	});
	$(chooseTypeGameDouble).on('click',function(){
		hideGameTypeOption();
		$(computerSymbol).css({display:'none'});	
		singlePlayer = false;
	});
	$(X).on('click',function(){
		if(!currSymUser){
			currSymUser = $(this).text();
			userMessageShow();
			//check if the user selected to play a double player game or dpuble and show buttons accordingly
			if (!singlePlayer) {
				// $(computerSymbol).css({display:'none'});
				$('.playerTwo').fadeIn(200);
				$('.playerTwo').text("Player Two: O");
				$(O).css({visibility : 'hidden'});
				$(X).css({visibility : 'hidden'});
				return;
			}
			currSymComp = $(O).text();
			computerMessageShow(O);
		}
	});
	$(O).on('click',function(){
		if(!currSymUser){
			currSymUser = $(this).text();
			userMessageShow();
			if (!singlePlayer) {
				
				$('.playerTwo').fadeIn(200);
				$('.playerTwo').text("Player Two: X");
				$(X).css({visibility : 'hidden'});
				$(O).css({visibility : 'hidden'});
				return;
			}
			//check if the user selected to play a double player game or dpuble and show buttons accordingly
			currSymComp = $(X).text();
			computerMessageShow(X);
		}
	});
		// On each button click get data-object will have gameObj prop and enter currValue into gameObj
	$(ticTacToeArea).on('click',function(){
		if (singlePlayer) {
			if($(this).text() !== stringX && $(this).text() !== stringO){
				// get the current button id so it can be deleted from the compRandom object so the computer doesnt insert its value on which the user just clicked
				$(this).text(currSymUser);
				$(this).animate({fontSize:'1.5rem'},10);
				//get the data-object attribute number so we can insert the user symbol into the gameObj
				var objProp = $(this).data('object');
				gameObj[objProp] = currSymUser;
				var wonOrDraw = checkIfWonOrDraw(gameObj);
				// if the user wins the retur before entering the computer's move
				if(wonOrDraw === won){
					checkIfWonOrDraw(gameObj);
					return;
				} else if (wonOrDraw === draw) {
					checkIfWonOrDraw(gameObj);
					return;
				}
				let time = getRandomInt(5,20);
				let fadeInTime = Number(time + "00");
				if (time <= 10){
					computerLetMeThink = computerTalks[0];
				}else if (time > 10 && time <= 5) {
					computerLetMeThink = computerTalks[1];
				}else if (time > 15) {
					computerLetMeThink = computerTalks[2];
				}
				$(computerThinking).text(computerLetMeThink).fadeIn(fadeInTime);
				$(ticTacToeArea).prop("disabled",true);
				//to set the computer move
				setTimeout(function() {
					$(computerThinking).text(computerTalks[3]);
					$(ticTacToeArea).prop("disabled",false);
					let idToDisplay = "#";
					idToDisplay += computerMove(objProp);
					$(idToDisplay).text(currSymComp);
					$(idToDisplay).animate({fontSize:'1.5rem'},10);
					checkIfWonOrDraw(gameObj);
				}, fadeInTime);
			}
		}else {
			if($(this).text() !== stringX && $(this).text() !== stringO){
				// get the current button id so it can be deleted from the compRandom object so the computer doesnt insert its value on which the user just clicked
				$(this).text(currSymUser);
				$(this).animate({fontSize:'1.5rem'},10);
				//get the data-object attribute number so we can insert the user symbol into the gameObj
				var objProp = $(this).data('object');
				gameObj[objProp] = currSymUser;
				var winOrLoose = checkIfWonOrDraw(gameObj);
				if(winOrLoose === won){
					checkIfWonOrDraw(gameObj);
					return;
				} else if (wonOrDraw === draw) {
					checkIfWonOrDraw(gameObj);
					return;
				}
				// this will reverse the current user symbol for double player game
				if(currSymUser === "X"){
					currSymUser = "O";
				} else if(currSymUser === "O"){
					currSymUser = "X";	
				}
			}
		}
	});
});