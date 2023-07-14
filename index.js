const cells = document.querySelectorAll('[data-key]');
const startButton = document.querySelector('.start');
const rounds = document.querySelectorAll('.rounds');

let roundsCount = 0;
let lastRandomNumber;
let computerChoice;
let playerChoice;
let winner = null;
let selectedCells = [0,0,0,0,0,0,0,0,0];
let playerSelectedChoices = [0,0,0,0,0,0,0,0,0];
let computerSelectedChoices = [0,0,0,0,0,0,0,0,0];

startButton.addEventListener('click',game);

function getComputerChoice(playerDataKey){

    if(selectedCells.every(cell => {return cell == 1})) return;
    const randomNumber = Math.floor(Math.random() * cells.length);

    if(lastRandomNumber === randomNumber
        || playerDataKey === randomNumber
        || selectedCells[randomNumber] == 1) return getComputerChoice(playerDataKey);

    lastRandomNumber = randomNumber;
    return cells[randomNumber];
}

function setChoices(playerChoice){
    //  playerChoice = prompt('choose X or O:');
    if(playerChoice === 'x'){
        computerChoice = 'o'
    }else if(playerChoice === 'o'){
        computerChoice = 'x';
    }
}

function playRound(){
    setChoices();
    cells.forEach(cell => {
        cell.addEventListener('click', setMarks);
    })
}

function game(){
    startButton.style.display = 'none';
    playRound();
}

function setMarks(e){
    if(selectedCells[this.dataset.key - 1] == 1){
        return
    }else{
        selectedCells[this.dataset.key - 1] = 1;
        playerSelectedChoices[this.dataset.key - 1] = 1;
        this.classList.add(playerChoice);
    }

    let com = getComputerChoice(e.target.dataset.key - 1);
    if(com !== undefined){
        if(selectedCells[com.dataset.key - 1] == 1){
            return
        }else{
            selectedCells[com.dataset.key - 1] = 1;
            computerSelectedChoices[com.dataset.key - 1] = 1;
            com.classList.add(computerChoice);
        }
    }
    winnerCheck(playerSelectedChoices, playerChoice);
    winnerCheck(computerSelectedChoices, computerChoice);
    const checkend = selectedCells.every(cell => {
        return cell === 1;
    })
    if(checkend && winner == null){
        alert('game end with equality');
        gameEnd();
    }else if(winner){
        alert(`${winner == playerChoice? 'YOU':'Computer'} wins`);
        gameEnd();
    }
}

function gameEnd(){
    winner = null;
    selectedCells = [0,0,0,0,0,0,0,0,0];
    playerSelectedChoices = [0,0,0,0,0,0,0,0,0];
    computerSelectedChoices = [0,0,0,0,0,0,0,0,0];
    cells.forEach(cell => {
        cell.removeEventListener("click", setMarks)
        cell.classList.remove('x');
        cell.classList.remove('o');
    })
    startButton.innerHTML = 'Restart game';
    startButton.style.display = 'block';
}

function winnerCheck(array, player){
    if((array[0] == 1 && array[1] == 1 && array[2] == 1)
    || (array[3] == 1 && array[4] == 1 && array[5] == 1)
    || (array[6] == 1 && array[7] == 1 && array[8] == 1)
    || (array[0] == 1 && array[3] == 1 && array[6] == 1)
    || (array[1] == 1 && array[4] == 1 && array[7] == 1)
    || (array[2] == 1 && array[5] == 1 && array[8] == 1)
    || (array[0] == 1 && array[4] == 1 && array[8] == 1)
    || (array[2] == 1 && array[4] == 1 && array[6] == 1)){
        winner = player;
    }
}