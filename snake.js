import { levels } from './levels.js';
import { drawBlock, drawSnake } from './draw.js';

/** @type {HTMLCanvasElement} */
const c = document.getElementById("canvas")

const status = document.getElementById("status")
const level = document.getElementById("level")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore")
highscore.textContent = localStorage.getItem('highscore') || 0

/** @type {CanvasRenderingContext2D} */
const ctx = c.getContext('2d')

c.width = 600
c.height = 600

const canvasStyles = getComputedStyle(c)
const NBLOCKS = parseInt(canvasStyles.getPropertyValue('--n-blocks'))
const BLOCK_WIDTH = c.width / NBLOCKS - 1
const BLOCK_HEIGHT = c.height / NBLOCKS - 1
const BLOCK_RADIUS = parseInt(canvasStyles.getPropertyValue('--border-radius'))

ctx.BLOCK_HEIGHT = BLOCK_HEIGHT
ctx.BLOCK_WIDTH = BLOCK_WIDTH
ctx.BLOCK_RADIUS = BLOCK_RADIUS

// Game Objects and Drawing

/** 
 * @typedef Snake
 * @property {Array<{x: number, y: number}>} body
 * @property {string} direction
 * @property {Array<string>} nextDirection
 * @property {function} draw
 * @property {function(GameLevel): void} update
 */

/**
 * @typedef FoodType
 * @property {string} color
 * @property {function} shape
 * @property {function(GameState): void} power
 */

/**
 * @typedef Food
 * @property {FoodType} type
 * @property {{x: number, y: number}} position
 * @property {function} draw
 */

/**
 * @typedef GameLevel
 * @property {string} name
 * @property {boolean} walls
 * @property {Array<Food>} foods
 * @property {number} speed
 * @property {function(GameState): boolean} isComplete
 */

/**
 * @typedef GameState
 * @property {'running' | 'paused' | 'game-over' | 'not-started'} status
 * @property {GameLevel} level
 * @property {Snake} snake
 * @property {Array<Food>} apples
 * @property {Array<Food>} poisons
 * @property {function} draw
 * @property {function} update
 * @property {function} reset
 */



/** @returns {Snake} */
const makeSnake = () => ({
    direction: 'right',
    nextDirection: [],
    body: [
        { x: 5, y: 2 },
        { x: 4, y: 2 },
        { x: 3, y: 2 },
    ],
    draw: function () {
        drawSnake(this.body)
    },
    update: function (level) {
        while (this.nextDirection.length > 0) {
            const next = this.nextDirection.shift()
            if (this.direction === 'up' && next === 'down') continue
            if (this.direction === 'down' && next === 'up') continue
            if (this.direction === 'left' && next === 'right') continue
            if (this.direction === 'right' && next === 'left') continue
            this.direction = next
            break
        }
        switch (this.direction) {
            case 'up':
                this.body.unshift({ x: this.body[0].x, y: this.body[0].y - 1 })
                if (this.body[0].y < 0 && !level.walls) {
                    this.body[0].y = NBLOCKS - 1
                } else if (this.body[0].y < 0 && level.walls) {
                    gameState.status = 'game-over'
                }
                break
            case 'down':
                this.body.unshift({ x: this.body[0].x, y: this.body[0].y + 1 })
                if (this.body[0].y === NBLOCKS && !level.walls) {
                    this.body[0].y = 0
                } else if (this.body[0].y === NBLOCKS && level.walls) {
                    gameState.status = 'game-over'
                }
                break
            case 'left':
                this.body.unshift({ x: this.body[0].x - 1, y: this.body[0].y })
                if (this.body[0].x < 0 && !level.walls) {
                    this.body[0].x = NBLOCKS - 1
                } else if (this.body[0].x < 0 && level.walls) {
                    gameState.status = 'game-over'
                }
                break
            case 'right':
                this.body.unshift({ x: this.body[0].x + 1, y: this.body[0].y })
                if (this.body[0].x === NBLOCKS && !level.walls) {
                    this.body[0].x = 0
                } else if (this.body[0].x === NBLOCKS && level.walls) {
                    gameState.status = 'game-over'
                }
                break
        }
        this.body.pop()
    }
})



/** 
 * @param {GameLevel} level
 * @returns {GameState} 
 */
const makeGameState = (level) => ({
    status: 'not-started',
    level,
    snake: makeSnake(),
    foods: [...level.foods],
    draw: function () {
        ctx.clearRect(0, 0, c.width, c.height)
        this.snake.draw()
        this.foods.forEach(food => food.draw())
    },
    update: function () {
        this.snake.update(this.level)
        if (this.snake.body.slice(1).some(segment => segment.x === this.snake.body[0].x && segment.y === this.snake.body[0].y)) {
            this.status = 'game-over'
            return
        }
        this.foods.forEach(food => {
            if (this.status !== 'game-over' && food.position.x === this.snake.body[0].x && food.position.y === this.snake.body[0].y) {
                food.position = {
                    x: Math.floor(Math.random() * NBLOCKS),
                    y: Math.floor(Math.random() * NBLOCKS),
                }
                food.type.power(this)
            }
        })
        if (this.level.isComplete(this)) {
            this.level = levels[levels.indexOf(this.level) + 1]
            this.foods = [...this.level.foods]
        }
    },
    reset: function () {
        this.snake = makeSnake()
        this.foods = [...this.level.foods]
    }
})


// Game Loop

/** @type {GameState} */
const gameState = makeGameState(levels[0])

document.addEventListener('keydown', (e) => {
    if (gameState.status !== 'running') return
    switch (e.key) {
        case 'ArrowUp':
            gameState.snake.nextDirection.push('up')
            break
        case 'ArrowDown':
            gameState.snake.nextDirection.push('down')
            break
        case 'ArrowLeft':
            gameState.snake.nextDirection.push('left')
            break
        case 'ArrowRight':
            gameState.snake.nextDirection.push('right')
            break
    }
})

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ':
            console.log('Space');
            if (gameState.status === 'running') {
                gameState.status = 'paused'
            } else if (gameState.status === 'paused') {
                gameState.status = 'running'
                window.requestAnimationFrame(loop)
            } else if (gameState.status === 'game-over') {
                gameState.reset()
                gameState.status = 'running'
                window.requestAnimationFrame(loop)
            } else if (gameState.status === 'not-started') {
                gameState.status = 'running'
                window.requestAnimationFrame(loop)
            }
            break
    }
})


const loop = () => {
    gameState.update()

    canvas.setAttribute('status', gameState.status)
    canvas.setAttribute('walls', gameState.level.walls)
    level.textContent = gameState.level.name
    status.textContent = gameState.status
    status.setAttribute('status', gameState.status)
    score.textContent = gameState.snake.body.length
    highscore.textContent = Math.max(parseInt(highscore.textContent), gameState.snake.body.length)
    localStorage.setItem('highscore', highscore.textContent)
    if (gameState.status !== 'running') {
        return
    }
    gameState.draw()
    // Call the next frame
    setTimeout(() => {
        window.requestAnimationFrame(loop)
    }, 1000 / gameState.level.speed)
}
gameState.foods.forEach(food => food.draw())
// gameState.status = 'running'
// window.requestAnimationFrame(loop)
