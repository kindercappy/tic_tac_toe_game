let game = [[],[],[]];
let currSymUser;
let currSymComp;
var gameObj = {1:"",
				2:"",
				3:"",
				4:"",
				5:"",
				6:"",
				7:"",
				8:"",
				9:""
			}
let compRandom = {1:"first",
					2:"second",
					3:"third",
					4:"fourth",
					5:"fifth",
					6:"sixth",
					7:"seventh",
					8:"eighth",
					9:"ninth"
				}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//if there is a winner reset all the variable for next game
function weHaveWinner(){
	alert("You win " + currSymUser);
	gameObj ={1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:""}
	$('.ticTacToeArea').text("");
	currSymUser = undefined;
	compRandom = {1:"first",
					2:"second",
					3:"third",
					4:"fourth",
					5:"fifth",
					6:"sixth",
					7:"seventh",
					8:"eighth",
					9:"ninth"
				}
	return;
}
function itWasADraw(){
	alert("Its a draw");
	gameObj ={1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:""}
	$('.ticTacToeArea').text("");
	currSymUser = undefined;
	compRandom = {1:"first",
					2:"second",
					3:"third",
					4:"fourth",
					5:"fifth",
					6:"sixth",
					7:"seventh",
					8:"eighth",
					9:"ninth"
				}
	return;
}
// params are gameObj, and the currentSymbol entered
// check if there is a winner and return
function checkIfWonOrDraw(gameObject,currSymUserbol){
	if(gameObject[1] === "X" && gameObject[2] === "X" && gameObject[3] === "X"){
		weHaveWinner();
	}else if(gameObject[4] === "X" && gameObject[5] === "X" && gameObject[6] === "X"){
		weHaveWinner();
	}else if(gameObject[7] === "X" && gameObject[8] === "X" && gameObject[9] === "X"){
		weHaveWinner();
	}else if(gameObject[1] === "X" && gameObject[5] === "X" && gameObject[9] === "X"){
		weHaveWinner();
	}else if(gameObject[3] === "X" && gameObject[5] === "X" && gameObject[7] === "X"){
		weHaveWinner();
	}else if(gameObject[1] === "X" && gameObject[4] === "X" && gameObject[7] === "X"){
		weHaveWinner();
	}else if(gameObject[2] === "X" && gameObject[5] === "X" && gameObject[8] === "X"){
		weHaveWinner();
	}else if(gameObject[3] === "X" && gameObject[6] === "X" && gameObject[9] === "X"){
		weHaveWinner();
	}else if(gameObject[1] === "O" && gameObject[2] === "O" && gameObject[3] === "O"){
		weHaveWinner();
	}else if(gameObject[4] === "O" && gameObject[5] === "O" && gameObject[6] === "O"){
		weHaveWinner();
	}else if(gameObject[7] === "O" && gameObject[8] === "O" && gameObject[9] === "O"){
		weHaveWinner;
	}else if(gameObject[1] === "O" && gameObject[5] === "O" && gameObject[9] === "O"){
		weHaveWinner();
	}else if(gameObject[3] === "O" && gameObject[5] === "O" && gameObject[7] === "O"){
		weHaveWinner();
	}else if(gameObject[1] === "O" && gameObject[4] === "O" && gameObject[7] === "O"){
		weHaveWinner();
	}else if(gameObject[2] === "O" && gameObject[5] === "O" && gameObject[8] === "O"){
		weHaveWinner();
	}else if(gameObject[3] === "O" && gameObject[6] === "O" && gameObject[9] === "O"){
		weHaveWinner();
	}else if(gameObject[1] !== "" && gameObject[2] !== "" && gameObject[3] !== "" && gameObject[4] !== "" && gameObject[5] !== "" && gameObject[6] !== "" && gameObject[7] !== "" && gameObject[8] !== "" && gameObject[9] !== ""){
		itWasADraw();
	}
}
$(document).ready(function(){
let X = 'X';
let O = 'O';
		$('.X').on('click',function(){
			if(!currSymUser){
				currSymUser = $(this).text();
				currSymComp = $('.O').text();
				console.log(currSymComp);
			}
		});
		$('.O').on('click',function(){
			if(!currSymUser){
				currSymUser = $(this).text();
				currSymComp = $('.X').text();
				// console.log(currSymComp);
			}
		});
	// On each button click get data-object will have gameObj prop and enter currValue into gameObj
	$('.ticTacToeArea').on('click',function(){
		var randomInt = getRandomInt(1,9);
		var currRandomCompId;
		if($(this).text() !== X && $(this).text() !== O){
			// get the current button id so it can be deleted from the compRandom object so the computer doesnt insert its value on which the user just clicked
			// var currentElementId = $(this).attr("id");

			// console.log(currentElementId);

			// console.log(getRandomInt(1,9));
			$(this).text(currSymUser);
			//get the data-object attribute number so we can insert the user symbol into the gameObj
			var objProp = $(this).data('object');
			gameObj[objProp] = currSymUser;
			delete compRandom[objProp];
			if(randomInt === objProp){
				if(randomInt === 9){
					randomInt -= 1;
				}else{
					randomInt += 1;
				}
			}
			currRandomCompId = compRandom[randomInt];
			$("#"+currRandomCompId).text(currSymComp);
			console.log(currRandomCompId);

			// console.log(compRandom);
			// gameObj[randomInt] = currSymComp;

			checkIfWonOrDraw(gameObj,currSymUser);
			// if(currSymUser === "X"){
			// 	currSymUser = "O";
			// } else if(currSymUser === "O"){
			// 	currSymUser = "X";	
			// } 
		}
		
	});
});

// working on the compRandom so that the computer can enter the symbols with the user and play. trying to use an object of prop names similar to button data-object arrtibute. when the user enters, generate a random number between 1-9 and delete and get that number match the compRandom prop so i can use the prop value to enter the symbol on screen