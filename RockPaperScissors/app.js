let userScore = 0;
let computerScore = 0;
let endScore = null;
let curHighScore = 0;
let curWinner = null;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('sc');
const lizard_div = document.getElementById('l');
const spock_div = document.getElementById('sp');
const smallUserWord = "user".fontsize(3).sub();
const smallCompWord = "comp".fontsize(3).sub();

function toggleRules(){
    var x = document.querySelector(".rules-image");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function getComputerChoice() {
    const choices = ['r', 'p', 'sc', 'l', 'sp'];
    const randomIndex = Math.floor(Math.random() * 5);
    return choices[randomIndex];
}

function convertToWord(letter){
    switch (letter) {
        case 'r': return 'Rock';
        case 'sc': return 'Scissors';
        case 'p': return 'Paper';
        case 'l': return 'Lizard';
        case 'sp': return 'Spock';
        default: return 'Some error';
    }
}

function getCurHighScore(userScore, compScore) {
    if (userScore > compScore) {
        return [userScore, 'You'];
    }
    else if (compScore > userScore) {
        return [compScore, 'Computer'];
    }
    return [userScore, null];
}

function checkWinner(curHighScore, curWinner) {
    if (curHighScore === endScore) {
        alert(`Winner is ${curWinner}!`);
        location.reload();
    }
}

function win(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    [curHighScore, curWinner] = getCurHighScore(userScore, computerScore);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You win! 🔥` 
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 300);
    setTimeout(() => checkWinner(curHighScore, curWinner), 200);
}

function lose(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    [curHighScore, curWinner] = getCurHighScore(userScore, computerScore);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallCompWord}. You lost... 😿 ` 
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 300);
    setTimeout(() => checkWinner(curHighScore, curWinner), 200);
}

function draw(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}. It's a draw.` 
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 300);
}


function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case 'rsc':
        case 'rl':
        case 'pr':
        case 'psp':
        case 'scp':
        case 'scl':
        case 'lsp':
        case 'lp':
        case 'spsc':
        case 'spr':
            win(userChoice, computerChoice);
            break;
        case 'scr':
        case 'lr':
        case 'rp':
        case 'spp':
        case 'psc':
        case 'lsc':
        case 'spl':
        case 'pl':
        case 'scsp':
        case 'rsp':
            lose(userChoice, computerChoice);
            break;
        case 'rr':
        case 'pp':
        case 'scsc':
        case 'spsp':
        case 'll':
            draw(userChoice, computerChoice);
            break;
    }
}

function main() {
    rock_div.addEventListener('click', () => game('r'));
    paper_div.addEventListener('click', () => game('p'));
    scissors_div.addEventListener('click', () => game('sc'));
    lizard_div.addEventListener('click', () => game('l'));
    spock_div.addEventListener('click', () => game('sp'));
}

endScore = +prompt('Until what score you want to play', '10');

main();
