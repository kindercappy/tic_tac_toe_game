let game = [[],[],[]];
let currSymUser;
let currSymComp;
let singlePlayer = true;
let buttonIds = {0:"zero",1:"first",2:"second",3:"third",4:"fourth",5:"fifth",6:"sixth",7:"seventh",8:"eighth"}
let winnerPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let drawPattern = [0,1,2,3,4,5,6,7,8];
let ticTacToeArea = '.ticTacToeArea';
let buttonContainer = '.buttonContainer';
let choiceContent = '.choiceContent';
let X = ".X";
let O = ".O";
let h1 = "h1";
let draw = "draw";
let won = "won";
var gameObj = {0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
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
//if there is a winner reset all the variable for next game
function weHaveWinner(winner){	
	gameObj ={0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
	$(h1).text("You win " + winner).animate({top:'500'},1000);
	$(ticTacToeArea).prop("disabled",true);
	setTimeout(function() {
		$(h1).animate({top:'-500'},500);
		$(ticTacToeArea).text("");
		$(O).css({visibility : 'visible'});
		$(X).css({visibility : 'visible'});
	}, 2000);
	currSymUser = undefined;
}
function itWasADraw(){
	gameObj ={0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
	$(h1).text("Its a Draw").animate({top:'500'},1000);
	$(ticTacToeArea).prop("disabled",true);
	setTimeout(function() {
		$(h1).animate({top:'-500'},500);
		$(ticTacToeArea).text("");
		$(O).css({visibility : 'visible'});
		$(X).css({visibility : 'visible'});
	}, 2000);
	currSymUser = undefined;
}
function checkIfWonOrDraw(gameObject){
	let stringX = 'X';
	let stringO = 'O';
	if(gameObject[0] !== "" && gameObject[1] !== "" && gameObject[2] !== "" && gameObject[3] !== "" && gameObject[4] !== "" && gameObject[5] !== "" && gameObject[6] !== "" && gameObject[7] !== "" && gameObject[8] !== ""){
			itWasADraw();
			return draw;
	}
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
			return computerMoveDecided(block,i,2);
		}else if (gameObj[winnerPatterns[i][0]] === currSymComp && gameObj[winnerPatterns[i][1]] === "" && gameObj[winnerPatterns[i][2]] === currSymComp ) {
			return computerMoveDecided(block,i,1);
		}else if (gameObj[winnerPatterns[i][0]] === "" &&  gameObj[winnerPatterns[i][1]] === currSymComp && gameObj[winnerPatterns[i][2]] === currSymComp ) {
			return computerMoveDecided(block,i,0);
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
$(document).ready(function(){
	let stringX = 'X';
	let stringO = 'O';
	$(ticTacToeArea).prop("disabled",true);
	$(choiceContent).on('click',function(){
		$(buttonContainer).css({visibility : 'visible'});
		$(ticTacToeArea).css({visibility : 'visible'}).fadeIn(1500).prop("disabled",true);
		$(this).fadeOut(500);
	});
			$(X).on('click',function(){
				if(!currSymUser){
					currSymUser = $(this).text();
					currSymComp = $('.O').text();
					$(O).css({visibility : 'hidden'});
					$(ticTacToeArea).prop("disabled",false);
				}
			});
			$(O).on('click',function(){
				if(!currSymUser){
					currSymUser = $(this).text();
					currSymComp = $(X).text();
					$(X).css({visibility : 'hidden'});
					$(ticTacToeArea).prop("disabled",false);
				}
			});
		// On each button click get data-object will have gameObj prop and enter currValue into gameObj
	$(ticTacToeArea).on('click',function(){
		if (singlePlayer) {
			if($(this).text() !== stringX && $(this).text() !== stringO){
				// get the current button id so it can be deleted from the compRandom object so the computer doesnt insert its value on which the user just clicked
				$(this).text(currSymUser);
				//get the data-object attribute number so we can insert the user symbol into the gameObj
				var objProp = $(this).data('object');
				gameObj[objProp] = currSymUser;
				var wonOrDraw = checkIfWonOrDraw(gameObj);
				// if the user wins the retur before entering the computer's move
				if(wonOrDraw === won){
					// console.log(gameObj);
					checkIfWonOrDraw(gameObj);
					console.log(gameObj);
					return;
				} else if (wonOrDraw === draw) {
					checkIfWonOrDraw(gameObj);
					console.log(gameObj);
					return;
				}
				//to set the computer move
				let idToDisplay = "#";
				idToDisplay += computerMove(objProp);
				
				$(idToDisplay).text(currSymComp);
				checkIfWonOrDraw(gameObj);
				console.log(gameObj);	 
			}
		}else {
			if($(this).text() !== stringX && $(this).text() !== stringO){
				// get the current button id so it can be deleted from the compRandom object so the computer doesnt insert its value on which the user just clicked
				$(this).text(currSymUser);
				//get the data-object attribute number so we can insert the user symbol into the gameObj
				var objProp = $(this).data('object');
				gameObj[objProp] = currSymUser;
				checkIfWonOrDraw(gameObj);
				if(currSymUser === "X"){
					currSymUser = "O";
				} else if(currSymUser === "O"){
					currSymUser = "X";	
				}
			}
		}
	});
});