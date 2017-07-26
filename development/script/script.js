let game = [[],[],[]];
let currSymUser;
let currSymComp;
let singlePlayer = true;
let player1Score = 0;
let player2Score = 0;
let computerScore = 0;
let buttonIds = {0:"zero",1:"first",2:"second",3:"third",4:"fourth",5:"fifth",6:"sixth",7:"seventh",8:"eighth"}
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
// let compRandom = [[0,"zero"],[1,"first"],[2,"second"],[3,"third"],[4,"fourth"],[5,"fifth"],[6,"sixth"],[7,"seventh"],[8,"eighth"]];
function fadeOut(element){
	$(element).fadeOut(500);
}
function fadeIn(element){
	$(element).fadeIn(1000)
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//if there is a winner reset all the variable for next game
function weHaveWinner(){	
	$("h1").text("You win " + currSymUser).animate({top:'500'},1000);
	$('.ticTacToeArea').prop("disabled",true);
	setTimeout(function() {
		fadeIn('.X');
		fadeIn('.O');
		$("h1").animate({top:'-500'},500);
		$('.ticTacToeArea').text("");
		$('.ticTacToeArea').prop("disabled",false);
	}, 2000);
	gameObj ={0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
	
	currSymUser = undefined;
	return;
}
function itWasADraw(){
	$("h1").text("Its a Draw").animate({top:'200'});
	gameObj ={0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""}
	$('.ticTacToeArea').text("");
	currSymUser = undefined;
	return;
}
function playCenter(gameObject){

}
// params are gameObj, and the currentSymbol entered
// check if there is a winner and return
function checkIfWonOrDraw(gameObject){
	if(gameObject[0] === "X" && gameObject[1] === "X" && gameObject[2] === "X"){
		weHaveWinner();
	}else if(gameObject[3] === "X" && gameObject[4] === "X" && gameObject[5] === "X"){
		weHaveWinner();
	}else if(gameObject[6] === "X" && gameObject[7] === "X" && gameObject[8] === "X"){
		weHaveWinner();
	}else if(gameObject[0] === "X" && gameObject[4] === "X" && gameObject[8] === "X"){
		weHaveWinner();
	}else if(gameObject[2] === "X" && gameObject[4] === "X" && gameObject[6] === "X"){
		weHaveWinner();
	}else if(gameObject[0] === "X" && gameObject[3] === "X" && gameObject[6] === "X"){
		weHaveWinner();
	}else if(gameObject[1] === "X" && gameObject[4] === "X" && gameObject[7] === "X"){
		weHaveWinner();
	}else if(gameObject[2] === "X" && gameObject[5] === "X" && gameObject[8] === "X"){
		weHaveWinner();
	}else if(gameObject[0] === "O" && gameObject[1] === "O" && gameObject[2] === "O"){
		weHaveWinner();
	}else if(gameObject[3] === "O" && gameObject[4] === "O" && gameObject[5] === "O"){
		weHaveWinner();
	}else if(gameObject[6] === "O" && gameObject[7] === "O" && gameObject[8] === "O"){
		weHaveWinner;
	}else if(gameObject[0] === "O" && gameObject[4] === "O" && gameObject[8] === "O"){
		weHaveWinner();
	}else if(gameObject[2] === "O" && gameObject[4] === "O" && gameObject[6] === "O"){
		weHaveWinner();
	}else if(gameObject[0] === "O" && gameObject[3] === "O" && gameObject[6] === "O"){
		weHaveWinner();
	}else if(gameObject[1] === "O" && gameObject[4] === "O" && gameObject[7] === "O"){
		weHaveWinner();
	}else if(gameObject[2] === "O" && gameObject[5] === "O" && gameObject[8] === "O"){
		weHaveWinner();
	}else if(gameObject[0] !== "" && gameObject[1] !== "" && gameObject[2] !== "" && gameObject[3] !== "" && gameObject[4] !== "" && gameObject[5] !== "" && gameObject[6] !== "" && gameObject[7] !== "" && gameObject[8] !== ""){
		itWasADraw();
	}
}
function computerMove(objectProperty){
	//will return button ID so we can display computer symbol
	return "first";
}
$(document).ready(function(){
let X = 'X';
let O = 'O';
		$('.X').on('click',function(){
			if(!currSymUser){
				currSymUser = $(this).text();
				currSymComp = $('.O').text();
				fadeOut(this);
				fadeOut('.O');
			}
		});
		$('.O').on('click',function(){
			if(!currSymUser){
				currSymUser = $(this).text();
				currSymComp = $('.X').text();
				fadeOut(this);
				fadeOut('.X');
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
				// let idToDisplay = "#";
				// idToDisplay += computerMove(objProp);
				// $(idToDisplay).text(currSymComp);
				checkIfWonOrDraw(gameObj,objProp);
				if(currSymUser === "X"){
					currSymUser = "O";
				} else if(currSymUser === "O"){
					currSymUser = "X";	
				}
			}
		}else {
			if(currSymUser === "X"){
				currSymUser = "O";
			} else if(currSymUser === "O"){
				currSymUser = "X";	
			}
		}
	});
});