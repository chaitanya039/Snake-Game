// snake game constants and variables are here...

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let congratsSound = new Audio('music/congrats.mp3');
let inputDir = { x: 0, y: 0 };
let snakeArray = [
    { x: 11, y: 16 }
];

let food = { x: 5, y: 10 };


let speed = 3;
let lastPaintTime = 0;
let score = 0;






// game function...
function main(currentTime) {
    window.requestAnimationFrame(main);
    // this is act as a game loop and giving us or update the current time
    // console.log(currentTime);

    // we are converting the miliseconds into the seconds here...
    // and when this seconds is less than our speed then it return...
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    // and we are giving the value of currenttime to the lastpainttime when conditions becomes false....
    lastPaintTime = currentTime;

    // and we are also running our game engine here...
    gameEngine();
}

function isCollide(snake) {
    // if you bump into yourself...
    for (let i = 1; i < snake.length; i++) {
        // if the array head's x and y value will be equal to the any element x and y value...
        // then it bump into itself...
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if you bump to the wall
    if (snake[0].x <= 0 || snake[0].x >= 20 || snake[0].y <= 0 || snake[0].y >= 20) {
        return true;
    }

    return false;
}



function gameEngine() {
    
    // Part1 : Updating snake array and food...
    // when the snake is collide
    if (isCollide(snakeArray)) {
        let loose = document.getElementById('loose');
        loose.style.display = "block";
        // when the window is reload then also display the none
        setTimeout(() => {
            loose.style.display = "none";
        }, 2800);
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 }; 

        setTimeout(() => {
            alert("Game Over, Press any key to play Again...");
        }, 1000);
        snakeArray = [{ x: 11, y: 16 }];
        
        if (score >= highscoreValue) {
            let congrats = document.getElementById('congrats');
            congrats.style.display = "block";
            congratsSound.play();
            setTimeout(() => {
                window.location.reload();
            }, 2800);
        }
        musicSound.load();
        score = 0;
        scoreBox.innerHTML = ` <i class="fa fa-user-circle-o"> Score: ` + score;
       
    }


    // if snake eaten the food , increment the score and also regenerate the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {

        // updating the speed...
        speed += 0.15;
        console.log(speed);
        // normal speed and 1+ score...
        if (speed < 6) {
            score += 1;
        }
        // fast speed and 2+ score...
        else if(speed <= 15 && speed > 6){
            score += 2;
        }
        // very fast speed and 5+ score...
        else{
            score += 5;
        }

        foodSound.play();
        

        let scoreBox = document.getElementById('scoreBox');
        let highScoreBox = document.getElementById('highScoreBox');
        // if the score is greater than high score then....highscore becomes the score....
        if (score > highscoreValue) {
            highscoreValue = score;
            // set into the local storage also
            localStorage.setItem('highscore', highscoreValue);
            highScoreBox.innerHTML = ` <i class="fa fa-graduation-cap"> New High Score: ` + highscoreValue; 
        }
       
        

        scoreBox.innerHTML = ` <i class="fa fa-user-circle-o"> Score: ` + score;

        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 3;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    }

    // moving the snake...
    // i is a second last element...
    for (let i = (snakeArray.length - 2); i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
        // here i+1 is last element of the snake array and and the last value of the array becomes 
        // the second last value as an object so that sanke is able to move on the board
        // hence there were no possibilllity of reference error....
    }


    // we are intiallizing the location of first element, that is head of the array as 
    // it's intial position and its input direction....
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // part 2: displaying the snake and the food now...

    //display the snake
    // we have to clear the innerhtml of the board first
    let board = document.getElementById('board');
    if (board.innerHTML !== "") {
        board.innerHTML = "";
    }
    snakeArray.forEach((element, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the food 
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}





// Actual game logic starts here...
let highscore = localStorage.getItem('highscore');
let highScoreBox = document.getElementById('highScoreBox');
if (highscore === null) {
    let highscoreValue = 0;
    localStorage.setItem('highscore', highscoreValue);
}
else {
    highscoreValue = JSON.parse(highscore);
    highScoreBox.innerHTML = ` <i class="fa fa-graduation-cap"> High Score: ` + highscoreValue;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    musicSound.play();
    // start the game move it up....
    
    inputDir = { x: 0, y: -1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
// window.location.reload();