const board = document.querySelector(".board")
const startButton = document.querySelector(".btn-start")
const restartBUtton = document.querySelector(".btn-game-over")
const modal = document.querySelector(".modal")
const modalOver = document.querySelector(".modal-over")
const finalScore = document.querySelector(".final-score")
const highScoreElement = document.querySelector("#high-score")
const scoreElement = document.querySelector("#score")
const timeElement = document.querySelector("#time")


const blockHeight = 50
const blockWidth = 50

let highScore = 0
let score = 0
let time =`00-00`


let intervalId = null;
const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)
let setIntervalId = null;
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }



const blocks = []
let snake = [
    {
        x: 1, y: 3
    }
]



let direction = 'right'

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        // block.innerText = `${row}-${col}` 
        blocks[`${row} - ${col}`] = block

    }

}

function render() {


    blocks[`${food.x} - ${food.y}`].classList.add("food")

    let head = null
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }
    else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }

    }
    else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }

    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }

    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        
        finalScore.innerText = score.innerText
        clearInterval(intervalId)
        modalOver.style.display = "flex"
        
        return;
        // window.location.reload()

    }

    snake.forEach((segment) => {
        blocks[`${segment.x} - ${segment.y}`].classList.remove("fill")
    })

    snake.unshift(head)
    snake.pop()

    snake.forEach((segment) => {
        blocks[`${segment.x} - ${segment.y}`].classList.add("fill")

    })

    
    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x} - ${food.y}`].classList.remove("food")
        food = { 
            x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) 
        }
        blocks[`${food.x} - ${food.y}`].classList.add("food")   
        snake.push(head)

        score += 10
        scoreElement.innerText = score

        if(score > highScore){
            highScore = score
            localStorage.setItem("highScore", highScore.toString())
        }

    }

}


// let intervalId = setInterval(() => {


//     render()

// }, 300)

startButton.addEventListener('click', () => {
    modal.style.display = "none"
    intervalId = setInterval(() => {
        render()
    }, 300)
})

restartBUtton.addEventListener('click', () => {
    restartGame()
})

function restartGame() {

    blocks[`${food.x} - ${food.y}`].classList.remove("food")
    snake.forEach((segment) => {
        blocks[`${segment.x} - ${segment.y}`].classList.remove("fill")

    })

    score = 0
    time = `00-00`
    scoreElement.innerText = score

    modalOver.style.display = "none"
    snake = [ { x: 1, y: 3 } ]
    direction = "right"
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    
    intervalId = setInterval(() => {
        render()
    }, 300)

    


}



addEventListener('keydown', (e) => {

    if (e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
        direction = "up"
    }
    else if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        direction = "right"
    }
    else if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        direction = "left"

    }
    else if (e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
        direction = "down"

    }

})

