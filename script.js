
//**************   state *****************
const state = ["", "", "", "", "", "", "", "", ""]

const resetState = () => {
    state.board = {
  }
  state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
  state.players = ['', ''];
  state.currentPlayerIdx = 0;
  state.play = false;
  state.roundWon = false;
};



// ************   Dom Selector   **************
const board = document.querySelector("#board");
const start = document.querySelector(".start");
const playerTurn = document.querySelector("#player-turn")
const resetButton = document.querySelector("#reset")
const result = document.querySelector(".status")


//************   Change Turn   ************ 
const changeTurn = () => {
    state.currentPlayerIdx = Math.abs(state.currentPlayerIdx -1);
    renderPlayer();
    toggleClass();
}


//************   Reset Button   ************ 

const toggleClass = () => {
    resetButton.classList.toggle("off");
    // board.classList.toggle("off")
}

//Couldn't figure out how to get the board to clear without clearing the board itself, but found reload as a way to reset page to square 1.
const reset = () => {
    location.reload()
    // resetState();
    // renderPlayer();
}


resetButton.addEventListener("click", reset)



//************   Render Player  ************
const renderPlayer = () => {
let text;
    if(!state.players[0] || !state.players[1]){
        text = `
        <input name="player1" class="input" placeholder="Enter Player One"> 
        <input name="player2" class="input" placeholder="Enter Player Two ">
        <button class="start">Start Game</button>
        `;
    }else{
        text= `It's currently <span class="player">${state.getCurrentPlayer()}</span>'s turn!`;
        toggleClass()
    }
    playerTurn.innerHTML = text;
}



playerTurn.addEventListener("click", (event) => {
    if(event.target.className === 'start'){
        const player1Input = document.querySelector('input[name=player1');
        const player1Value = player1Input.value;
        state.players[0] = player1Value;
        const player2Input = document.querySelector('input[name=player2');
        const player2Value = player2Input.value;
        state.players[1] = player2Value;
        renderPlayer();
        state.play= true;
    }
})


//************    Clicking the board   ************ 

function takeTurn(event){
    if(state.play === true){ //need to block play before game has started
        if(event.target.innerHTML === ""){ //need to ensure the cells are empty
            if(state.currentPlayerIdx === 0){ 
                event.target.innerHTML = "X";
                winCondition();
                tieGame();
                changeTurn();
            }else{
                event.target.innerHTML = "O";
                winCondition();
                tieGame();
                changeTurn()};
        }
    }return
}
board.addEventListener("click", takeTurn)


//************** Win Conditions *****************/ 
// (Note: I feel like there HAS to be a simpler method using an array iterator but this worked and I couldn't figure out the other. \_O_/ )

const cellOne = document.querySelector("#cell-one")
const cellTwo = document.getElementById("cell-two")
const cellThree = document.getElementById("cell-three")
const cellFour = document.getElementById("cell-four")
const cellFive = document.getElementById("cell-five")
const cellSix = document.getElementById("cell-six")
const cellSeven = document.getElementById("cell-seven")
const cellEight = document.getElementById("cell-eight")
const cellNine = document.getElementById("cell-nine")


const winCondition = () => {
    if((cellOne.innerHTML !== "" && cellOne.innerHTML === cellTwo.innerHTML && cellTwo.innerHTML === cellThree.innerHTML) ||
        (cellFour.innerHTML !== "" && cellOne.innerHTML === cellFour.innerHTML && cellFour.innerHTML === cellSeven.innerHTML) ||
        (cellNine.innerHTML !== "" && cellOne.innerHTML === cellFive.innerHTML && cellFive.innerHTML === cellNine.innerHTML) ||
        (cellTwo.innerHTML !== "" && cellTwo.innerHTML === cellFive.innerHTML && cellFive.innerHTML === cellEight.innerHTML) ||
        (cellSix.innerHTML !== "" && cellThree.innerHTML === cellSix.innerHTML && cellSix.innerHTML === cellNine.innerHTML) ||
        (cellFive.innerHTML !== "" && cellFour.innerHTML === cellFive.innerHTML && cellFive.innerHTML === cellSix.innerHTML) ||
        (cellSeven.innerHTML !== "" && cellSeven.innerHTML === cellEight.innerHTML && cellEight.innerHTML === cellNine.innerHTML) ||
        (cellThree.innerHTML !== "" && cellThree.innerHTML === cellFive.innerHTML && cellFive.innerHTML === cellSeven.innerHTML)){
        result.innerHTML = youWin();
        state.play = false; 
        playerTurn.classList.add("off")
        changeColors();
    }return;
}

const tieGame = () =>{
    if(cellOne.innerHTML !== "" && cellTwo.innerHTML !== "" && cellThree.innerHTML !== "" && cellFour.innerHTML !== "" &&  cellFive.innerHTML !== "" && cellSix.innerHTML !== "" && cellSeven.innerHTML !== "" && cellEight.innerHTML !== "" && cellNine.innerHTML !== ""){
        result.innerHTML = draw();
        state.play = false; 
        playerTurn.classList.add("off")
    }return;
}

const youWin = () => {return `${state.getCurrentPlayer()} wins!`}
const draw = () => {return "Draw!"}

//********* Just for funsies *******/
let boardback = document.querySelector("#container")
function changeColors(){
    setInterval(() => {
        const arr = ["red", "blue"];
        let choose = arr[Math.floor(Math.random() * arr.length)];
        boardback.style.background = choose;
    }, 100);
}

//Tested an array method here but to no avail... 
// const winConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6], 
//     [1, 4, 7], 
//     [2, 5, 8], 
//     [0, 4, 8], 
//     [2, 4, 6],
// ];




// ******** Steps to success ********
// Type in player names (computer?)
        // Need an input with placeholder
        // Need to make selector that grabs input info 
// click start game (Board is empty and states player names)
        // Need a New Game Button
        // Button clears board
// Player 1 clicks the board 
//      if the board is empty, then mark an X
//      if not, do nothing
// Check to see if 3 in a row? Yes = win. No = change turn (evaluate all possible win options)
// Show player 2 
// Player 2 uses O not X
// Player 2 clicks the board
// Are there 3 in a row? 
// Draw?



resetState();
renderPlayer();