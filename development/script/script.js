let game = [[],[],[]];
let currSymUser;
let currSymComp;
let singlePlayer = true;
let player1Score = 0;
let player2Score = 0;
let computerScore = 0;
let buttonIds = {0:"zero",1:"first",2:"second",3:"third",4:"fourth",5:"fifth",6:"sixth",7:"seventh",8:"eighth"}
let winnerPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let drawPattern = [0,1,2,3,4,5,6,7,8];
let X = ".X";
let O = ".O";
var gameObj = {0:"",
				1:"",
				2:"",
				3:"",
				4:"",
				5:"",
				6:"",
				7:"",
				8:""
			}
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
	$("h1").text("You win " + winner).animate({top:'500'},1000);
	$('.ticTacToeArea').prop("disabled",true);
	setTimeout(function() {
		$("h1").animate({top:'-500'},500);
		$('.ticTacToeArea').text("");
		// $('.ticTacToeArea').prop("disabled",false);
		// fadeIn('.X');
		// fadeIn('.O');
		showMe(X);
		showMe(O);
		// return;
	}, 2000);
	gameObj ={0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
	currSymUser = undefined;
}
function itWasADraw(){
	$("h1").text("Its a Draw").animate({top:'500'},1000);
	$('.ticTacToeArea').prop("disabled",true);
	setTimeout(function() {
		$("h1").animate({top:'-500'},500);
		$('.ticTacToeArea').text("");
		// $('.ticTacToeArea').prop("disabled",false);
		// fadeIn('.X');
		// fadeIn('.O');
		showMe(X);
		showMe(O);
	}, 2000);
	gameObj ={0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
	currSymUser = undefined;
	// return;
}
function playCenter(gameObject){

}
function checkIfWonOrDraw2(gameObject){
	let X = "X";
	let O = "O";
	if(gameObject[0] !== "" && gameObject[1] !== "" && gameObject[2] !== "" && gameObject[3] !== "" && gameObject[4] !== "" && gameObject[5] !== "" && gameObject[6] !== "" && gameObject[7] !== "" && gameObject[8] !== ""){
			itWasADraw();
			return;
	}
	for(var i = 0; i < winnerPatterns.length; i+=1){
		// get the winnerPatterns array and check if there are 2 values similar in every pattern and return winner
		if(gameObject[winnerPatterns[i][0]] === X && gameObject[winnerPatterns[i][1]] === X  && gameObject[winnerPatterns[i][2]] === X){
			weHaveWinner("X");
			return;
		}else if (gameObject[winnerPatterns[i][0]] === O && gameObject[winnerPatterns[i][1]] === O  && gameObject[winnerPatterns[i][2]] === O) {
			weHaveWinner("O");
			return;
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
		let count = 0;
		// this will look for an empty random place and return that place or else will keep looping thru
		// while (count === 0) {
		// 	let randomInt = getRandomInt(0,8);
		// 	if(gameObj[randomInt] === ""){
		// 		idToReturn = buttonIds[randomInt];
		// 		count += 1;
		// 	}
		// }
		let numsLeft = drawPattern.reverse();
		for(var i = 0; i < numsLeft.length; i+=1){
			if(gameObj[drawPattern[i]] === ""){
				idToReturn = buttonIds[numsLeft[i]];
				break;
				// count += 1;
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
	return computerMoveDecided(random);
}
$(document).ready(function(){

// console.log(buttonIds[winnerPatterns[0][2]]);
// console.log(gameObj[winnerPatterns[0][0]]);
$('.ticTacToeArea').prop("disabled",true);
let X = 'X';
let O = 'O';
		$('.X').on('click',function(){
			if(!currSymUser){
				currSymUser = $(this).text();
				currSymComp = $('.O').text();
				fadeOut(this);
				fadeOut('.O');
				$('.ticTacToeArea').prop("disabled",false);
			}
		});
		$('.O').on('click',function(){
			if(!currSymUser){
				currSymUser = $(this).text();
				currSymComp = $('.X').text();
				fadeOut(this);
				fadeOut('.X');
				$('.ticTacToeArea').prop("disabled",false);
			}
		});
	// On each button click get data-object will have gameObj prop and enter currValue into gameObj
	$('.ticTacToeArea').on('click',function(){
		if (singlePlayer) {

			if($(this).text() !== X && $(this).text() !== O){

				// get the current button id so it can be deleted from the compRandom object so the computer doesnt insert its value on which the user just clicked
				$(this).text(currSymUser);
				//get the data-object attribute number so we can insert the user symbol into the gameObj
				var objProp = $(this).data('object');
				gameObj[objProp] = currSymUser;
				//to set the computer move
				let idToDisplay = "#";
				idToDisplay += computerMove(objProp);
				$(idToDisplay).text(currSymComp);
				checkIfWonOrDraw2(gameObj);
			}
		}else {
			if($(this).text() !== X && $(this).text() !== O){

				// get the current button id so it can be deleted from the compRandom object so the computer doesnt insert its value on which the user just clicked
				$(this).text(currSymUser);
				//get the data-object attribute number so we can insert the user symbol into the gameObj
				var objProp = $(this).data('object');
				gameObj[objProp] = currSymUser;
				checkIfWonOrDraw2(gameObj);
				if(currSymUser === "X"){
					currSymUser = "O";
				} else if(currSymUser === "O"){
					currSymUser = "X";	
				}
			}
		}
	});
});