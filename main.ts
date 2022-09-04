function drawField() {
    sp = []
    for( let i = 0; i < field.length; i++) {
        let y = xys.y + i * xys.s
        let bufer: TextSprite[] = []
        for( let j = 0; j < field[0].length; j++) {
            let x = xys.x + j * xys.s
            let c = field[i][j] == "." ? "" : field[i][j]
            let textSprite = textsprite.create(c)
            textSprite.setPosition(x, y)
            textSprite.setMaxFontHeight(8)
            textSprite.setOutline(1,2)
            bufer.push(textSprite)
        }
        sp.push(bufer)
    }
}

function makeTile(row: number, col: number, dir: string){
    const x = xys.x + xys.s * col
    const y = xys.y + xys.s * row
    let my: Sprite
    let dx = 0
    let dy = 0
    switch(dir){
        case "left":
            my = sprites.create(img`
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
            `, SpriteKind.Player)
            my.setPosition(x - xys.s - xys.s / 2 + 1, y + 2)
            dx--
            break
        case "right":
            my = sprites.create(img`
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f f f f f f
            `, SpriteKind.Player)
            my.setPosition(x + xys.s /2, y + 2)
            dx++
            break
        case "up":
            my = sprites.create(img`
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
            `, SpriteKind.Player)
            my.setPosition(x + 1, y - xys.s / 2 + 1)
            dy--
            break
        case "down":
            my = sprites.create(img`
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
                f f f f f f f f f f f
            `, SpriteKind.Player)
            my.setPosition(x + 1, y + xys.s / 2 + 1)
            dy++
            break
        default:
    }
    my.z = -1
    my.data = { value1: sp[col][row].text, value2: sp[col + dx][row + dy].text, count: countTail}
    countTail++
    lastTail = my
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    if( xMark == null)
        if( myCursor.x > xys.x + xys.s) myCursor.x -= xys.s
    else keys("left")
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (xMark == null)
        if (myCursor.x < xys.x + xys.s * 9) myCursor.x += xys.s
    else keys("right")
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (xMark == null)
        if (myCursor.y > xys.y + xys.s ) myCursor.y -= xys.s
    else keys("up")
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (xMark == null)
        if (myCursor.y < xys.y + xys.s * 9) myCursor.y += xys.s
    else keys("down")
})

function keys(dir: string) {

}

scene.setBackgroundColor(1)
const field = ["....45....", "...3416...", "...4364...", ".33050626.", "1064204061", 
    "0154232351", ".35122600.", "...1314...", "...5655...", "....22...."]
const xys = {x: 12, y: 5, s: 12}
let sp: TextSprite[][]
drawField()
const myCursor = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . 1 8 8 1 . . . . . .
    . . . . . . 1 8 8 1 . . . . . .
    . . . . . . 1 8 8 1 . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . 1 1 1 . . . . . . . . 1 1 1 .
    . 8 8 8 . . . . . . . . 8 8 8 .
    . 8 8 8 . . . . . . . . 8 8 8 .
    . 1 1 1 . . . . . . . . 1 1 1 .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . 1 8 8 1 . . . . . .
    . . . . . . 1 8 8 1 . . . . . .
    . . . . . . 1 8 8 1 . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
myCursor.setPosition(xys.x + xys.s * 4 + 1, xys.y + xys.s * 3 + 1)
let lastTail: Sprite
let countTail = 0
let xMark: number = null
let yMark: number = null
