// Helper Drawing functions

/** @type {CanvasRenderingContext2D} */
const ctx = document.getElementById('canvas').getContext('2d')

/** @param {Array<{x: number, y: number}>} body */
export function drawSnake(body) {
    drawBlock(body[0].x, body[0].y, 'darkgreen')
    body.slice(1).forEach(({ x, y }) => drawBlock(x, y, 'green'))
}

/** @param {number} x @param {number} y @param {string} color */
export function drawApple(x, y, _color) {
    const apple_emoji = '🍎'
    ctx.font = ctx.BLOCK_HEIGHT + 'px monospace'
    const textWidth = ctx.measureText(apple_emoji).width
    const textHeight = ctx.BLOCK_HEIGHT
    ctx.fillText(apple_emoji, x * (ctx.BLOCK_WIDTH + 1) + (ctx.BLOCK_WIDTH - textWidth) / 2, y * (ctx.BLOCK_HEIGHT + 1) + (ctx.BLOCK_HEIGHT + textHeight) / 2)
}

/** @param {number} x @param {number} y @param {string} color */
export function drawPoison(x, y, _color) {
    const poison_emoji = '💀'
    ctx.font = ctx.BLOCK_HEIGHT + 'px monospace'
    const textWidth = ctx.measureText(poison_emoji).width
    const textHeight = ctx.BLOCK_HEIGHT
    ctx.fillText(poison_emoji, x * (ctx.BLOCK_WIDTH + 1) + (ctx.BLOCK_WIDTH - textWidth) / 2, y * (ctx.BLOCK_HEIGHT + 1) + (ctx.BLOCK_HEIGHT + textHeight) / 2)
}

/** @param {number} x @param {number} y @param {string} color */
export function drawReverse(x, y, _color) {
    const reverse_emoji = '🔄'
    ctx.font = ctx.BLOCK_HEIGHT + 'px monospace'
    const textWidth = ctx.measureText(reverse_emoji).width
    const textHeight = ctx.BLOCK_HEIGHT
    ctx.fillText(reverse_emoji, x * (ctx.BLOCK_WIDTH + 1) + (ctx.BLOCK_WIDTH - textWidth) / 2, y * (ctx.BLOCK_HEIGHT + 1) + (ctx.BLOCK_HEIGHT + textHeight) / 2)
}

/** @param {number} x @param {number} y @param {string} color */
export function drawBlock(x, y, color) {
    ctx.beginPath()
    ctx.roundRect(x * (ctx.BLOCK_WIDTH + 1), y * (ctx.BLOCK_HEIGHT + 1), ctx.BLOCK_WIDTH, ctx.BLOCK_HEIGHT, ctx.BLOCK_RADIUS)
    ctx.fillStyle = color
    ctx.fill()
}

/** @param {number} x @param {number} y @param {string} color */
export function drawCircle(x, y, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x * (ctx.BLOCK_WIDTH + 1) + ctx.BLOCK_WIDTH / 2, y * (ctx.BLOCK_HEIGHT + 1) + ctx.BLOCK_HEIGHT / 2, ctx.BLOCK_WIDTH / 2, 0, 2 * Math.PI)
    ctx.fill()
}

/** @param {number} x @param {number} y @param {string} color */
export function drawTriangle(x, y, color) {
    let position = { x: x * (ctx.BLOCK_WIDTH + 1), y: y * (ctx.BLOCK_HEIGHT + 1) }
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(position.x, position.y)
    ctx.lineTo(position.x + ctx.BLOCK_WIDTH, position.y)
    ctx.lineTo(position.x + ctx.BLOCK_WIDTH / 2, position.y + ctx.BLOCK_HEIGHT)
    ctx.fill()
}

/** @param {number} x @param {number} y @param {string} color */
export function drawLosange(x, y, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x * (ctx.BLOCK_WIDTH + 1), y * (ctx.BLOCK_HEIGHT + 1) + ctx.BLOCK_HEIGHT / 2)
    ctx.lineTo(x * (ctx.BLOCK_WIDTH + 1) + ctx.BLOCK_WIDTH / 2, y * (ctx.BLOCK_HEIGHT + 1))
    ctx.lineTo(x * (ctx.BLOCK_WIDTH + 1) + ctx.BLOCK_WIDTH, y * (ctx.BLOCK_HEIGHT + 1) + ctx.BLOCK_HEIGHT / 2)
    ctx.lineTo(x * (ctx.BLOCK_WIDTH + 1) + ctx.BLOCK_WIDTH / 2, y * (ctx.BLOCK_HEIGHT + 1) + ctx.BLOCK_HEIGHT)
    ctx.fill()
}

/** @param {number} x @param {number} y @param {string} color */
export function drawStar(x, y, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x * (ctx.BLOCK_WIDTH + 1), y * (ctx.BLOCK_HEIGHT + 1) + ctx.BLOCK_HEIGHT / 2)
    ctx.lineTo(x * (ctx.BLOCK_WIDTH + 1) + ctx.BLOCK_WIDTH / 2, y * (ctx.BLOCK_HEIGHT + 1))
    ctx.lineTo(x * (ctx.BLOCK_WIDTH + 1) + ctx.BLOCK_WIDTH, y * (ctx.BLOCK_HEIGHT + 1) + ctx.BLOCK_HEIGHT / 2)
    ctx.lineTo(x * (ctx.BLOCK_WIDTH + 1) + ctx.BLOCK_WIDTH / 2, y * (ctx.BLOCK_HEIGHT + 1) + ctx.BLOCK_HEIGHT)
    ctx.fill()
}

