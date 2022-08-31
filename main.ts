function drawField() {
    sp = []
    for( let i = 0; i < field.length; i++) {
        let y = 4 + i * 12
        let bufer: TextSprite[] = []
        for( let j = 0; j < field[0].length; j++) {
            let x = 24 + j * 12
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

function makeTile(sp1: TextSprite, sp2: TextSprite, dir: string){
    let my: Sprite
    if (dir == "left" || dir == "right") {
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
        `, SpriteKind.Player)
    } else {
        my = sprites.create(img`
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
            f f f f f f f f f f
        `, SpriteKind.Player)
    }
    my.z = -1
    if (dir == "right") my.setPosition(sp1.x + 6, sp1.y)
    if (dir == "left") my.setPosition(sp2.x + 6, sp1.y)
    if (dir == "down") my.setPosition(sp1.x, sp1.y + 6)
    if (dir == "up") my.setPosition(sp1.x, sp2.y + 6)
    sp1.setOutline(1, 6)
    sp2.setOutline(1, 6)
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    if( myCursor.x > 30) myCursor.x -= 12
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (myCursor.x < 130) myCursor.x += 12
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (myCursor.y > 10) myCursor.y -= 12
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if(myCursor.y < 110) myCursor.y += 12
})

scene.setBackgroundColor(1)
const field = ["....45....", "...3416...", "...4364...", ".33050626.", "1064204061", 
    "0154232351", ".35122600.", "...1314...", "...5655...", "....22...."]
let sp: TextSprite[][]
drawField()
const myCursor = sprites.create(img`
    5 a a a . . . . . . . . a a a 5
    a a a a . . . . . . . . a a a a
    a a . . . . . . . . . . . . a a
    a a . . . . . . . . . . . . a a
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    a a . . . . . . . . . . . . a a
    a a . . . . . . . . . . . . a a
    a a a a . . . . . . . . a a a a
    5 a a a . . . . . . . . a a a 5
`, SpriteKind.Player)
myCursor.setPosition(25, 101)

makeTile( sp[1][4], sp[1][5], "right")
makeTile(sp[3][5], sp[3][4], "left")
makeTile(sp[3][2], sp[3][3], "right")
makeTile(sp[8][4], sp[9][4], "down")
makeTile(sp[5][7], sp[4][7], "up")
