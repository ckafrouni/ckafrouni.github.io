import { appleType, poisonType, reverseType, makeFood } from './food.js'

/** @type {Array<GameLevel>} */
export const levels = [
    {
        name: 'Easy',
        walls: false,
        speed: 8,
        foods: [
            makeFood(appleType, 8, 8),
            makeFood(appleType, 3, 5),
            makeFood(poisonType, 4, 4),
            makeFood(reverseType, 13, 13),
        ],
        isComplete: function (gameState) {
            return gameState.snake.body.length >= 6
        }
    },
    {
        name: 'Easy[Walls]',
        walls: true,
        speed: 8,
        foods: [
            makeFood(appleType, 8, 8),
            makeFood(appleType, 3, 5),
            makeFood(poisonType, 4, 4),
            makeFood(reverseType, 13, 13),
        ],
        isComplete: function (gameState) {
            return gameState.snake.body.length >= 12
        }
    },
    {
        name: 'Medium',
        walls: false,
        speed: 8,
        foods: [
            makeFood(appleType, 8, 8),
            makeFood(appleType, 10, 2),
            makeFood(appleType, 3, 5),
            makeFood(poisonType, 4, 4),
            makeFood(poisonType, 3, 8),
            makeFood(reverseType, 13, 13),
        ],
        isComplete: function (gameState) {
            return gameState.snake.body.length >= 18
        }
    },
    {
        name: 'Medium[Walls]',
        walls: true,
        speed: 8,
        foods: [
            makeFood(appleType, 8, 8),
            makeFood(appleType, 10, 2),
            makeFood(appleType, 3, 5),
            makeFood(poisonType, 4, 4),
            makeFood(poisonType, 3, 8),
            makeFood(reverseType, 13, 13),
        ],
        isComplete: function (gameState) {
            return gameState.snake.body.length >= 24
        }
    },
    {
        name: 'Hard',
        walls: false,
        speed: 12,
        foods: [
            makeFood(appleType, 8, 8),
            makeFood(appleType, 10, 2),
            makeFood(appleType, 3, 5),
            makeFood(poisonType, 4, 4),
            makeFood(poisonType, 3, 8),
            makeFood(reverseType, 6, 1),
            makeFood(reverseType, 13, 13),
        ],
        isComplete: function (gameState) {
            return gameState.snake.body.length >= 30
        }
    },
    {
        name: 'Hard[Walls]',
        walls: true,
        speed: 12,
        foods: [
            makeFood(appleType, 8, 8),
            makeFood(appleType, 10, 2),
            makeFood(appleType, 3, 5),
            makeFood(poisonType, 4, 4),
            makeFood(poisonType, 3, 8),
            makeFood(reverseType, 6, 1),
            makeFood(reverseType, 13, 13),
        ],
        isComplete: function (gameState) {
            return false
        }
    },

]
