import { drawApple, drawPoison, drawReverse } from './draw.js'

/** @type {FoodType} */
export const appleType = {
    color: 'red',
    shape: drawApple,
    /** @param {GameState} gameState */
    power: function (gameState) {
        console.log('Apple eaten')
        gameState.snake.body.push({ x: gameState.snake.body[gameState.snake.body.length - 1].x, y: gameState.snake.body[gameState.snake.body.length - 1].y })
    },
}

/** @type {FoodType} */
export const poisonType = {
    color: 'purple',
    shape: drawPoison,
    /** @param {GameState} gameState */
    power: function (gameState) {
        console.log('Poison eaten')
        gameState.snake.body.pop()
        gameState.snake.body.pop()
        if (gameState.snake.body.length === 0) {
            gameState.status = 'game-over'
        }
    },
}

/** @type {FoodType} */
export const reverseType = {
    color: 'blue',
    shape: drawReverse,
    /** @param {GameState} gameState */
    power: function (gameState) {
        console.log('Reverse eaten')
        gameState.snake.body.reverse()
        if (gameState.snake.body.length == 1) {
            gameState.snake.nextDirection = [{
                'up': 'down',
                'down': 'up',
                'left': 'right',
                'right': 'left',
            }[gameState.snake.direction]]
        } else {
            const dx = gameState.snake.body[0].x - gameState.snake.body[1].x
            const dy = gameState.snake.body[0].y - gameState.snake.body[1].y
            if (dx !== 0) {
                gameState.snake.nextDirection = dx > 0 ? ['right'] : ['left']
            } else {
                gameState.snake.nextDirection = dy > 0 ? ['down'] : ['up']
            }
        }
        gameState.snake.direction = gameState.snake.nextDirection[0]
    },
}


/**
 * @param {FoodType} type
 * @param {number} x
 * @param {number} y
 * @returns {Food}
 */
export const makeFood = (type, x, y) => ({
    type,
    position: { x, y },
    draw: function () {
        this.type.shape(this.position.x, this.position.y, this.type.color)
    }
})
