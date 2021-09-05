document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');
  const pauseBtn = document.querySelector('.pause');
  const result_p = document.querySelector('.result > p');

  const width = 20;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2,1,0]; 
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 500;
  let interval = 0;


  function startGame() {
    result_p.innerHTML = 'Eat the apple! 🍎'
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    currentSnake = [2,1,0]; 
    direction = 1;
    score = 0;
    speed = 0.9;
    intervalTime = 500;
    interval = 0;
    randomApple();
    scoreDisplay.innerText = score;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  function moveOutcomes() {
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //if hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //if hits right
      (currentSnake[0] % width === 0 && direction === -1) || //if hits left
      (currentSnake[0] - width < 0 && direction === -width) ||  //if hits top
      squares[currentSnake[0] + direction].classList.contains('snake') //if hits itself
    ) {
      result_p.innerHTML = 'You died! 💩'
      return clearInterval(interval);
    }

    const tail = currentSnake.pop(); //removes last item of the array and shows it
    squares[tail].classList.remove('snake');  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction); //direction to the head of the array

    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');
  }

  function resumeGame() {
    result_p.innerHTML = 'Eat the apple! 🍎'
    interval = setInterval(moveOutcomes, intervalTime);
  }

  function pauseGame() {
    result_p.innerHTML = 'Game is paused. 🕗'
    clearInterval(interval);
  }

  //generate new apple
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple');
  }


  function control(e) {
    squares[currentIndex].classList.remove('snake');

    if(e.keyCode === 39) {         //right arrow
      direction = 1;
    } else if (e.keyCode === 38) { //up arrow
      direction = -width; 
    } else if (e.keyCode === 37) { //left arrow
      direction = -1 ;
    } else if (e.keyCode === 40) { //down arrow
      direction = +width ;
    }
  }

  function togglePause() {
    if (pauseBtn.innerHTML === 'Pause') {
      pauseGame();
      pauseBtn.innerHTML = 'Resume';
    } else {
      resumeGame();
      pauseBtn.innerHTML = 'Pause';
    }
  }

  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
  pauseBtn.addEventListener('click', togglePause);
})
