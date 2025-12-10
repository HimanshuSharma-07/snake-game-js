const board = document.querySelector(".board")
const blockHeight = 50
const blockWidth = 50

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)
let setIntervalId = null;
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}

let score = document.querySelector("#score")


const blocks = []
const snake = [
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
        alert("Game Over")
        clearInterval(intervalId)
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
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
        blocks[`${food.x} - ${food.y}`].classList.add("food")
        snake.push(head)      
        
    }


}


let intervalId = setInterval(() => {


    render()

}, 300)

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

