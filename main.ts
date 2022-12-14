namespace SpriteKind {
    export const Brick = SpriteKind.create()
    export const Cursor = SpriteKind.create()
}

function drawField() {
    sp = []
    for( let i = 0; i < field.length; i++) {
        let y = xys.y + i * xys.s
        let bufer: TextSprite[] = []
        for( let j = 0; j < field[0].length; j++) {
            let x = xys.x + j * xys.s
            let c = ''
            if (field[i][j] != ".") {
                c = field[i][j]
            }
            let textSprite = textsprite.create(c)
            textSprite.setPosition(x, y)
            textSprite.setMaxFontHeight(8)
            textSprite.setOutline(1,2)
            bufer.push(textSprite)
        }
        sp.push(bufer)
    }
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    keys(0, 0, "A")
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    if( !mark) {
        if( cur.x > xys.x + xys.s) cur.x -= xys.s
    } else keys(-1, 0, "left")
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if ( !mark) {
        if (cur.x < xys.x + xys.s * 9) cur.x += xys.s
    } else keys(1, 0, "right")
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if ( !mark) {
        if (cur.y > xys.y + xys.s ) cur.y -= xys.s
    } else keys(0, -1, "up")
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if ( !mark) {
        if (cur.y < xys.y + xys.s * 9) cur.y += xys.s
    } else keys(0, 1, "down")
})

function keys(dx: number, dy: number, dir: string) {
    let pos = cr(cur.x, cur.y)
    if( last != null) last.destroy()
    mark = false
    if (dir == "A") {
        let u: Sprite = check(0, 0)
        if( u != null) {
            if( u.data.count < 2) return
            u.destroy()
            return
        }
    } 
    if (check(dx, dy) == null && (dir == 'A' || !checkUsed(dx, dy))) {
        makeTile(pos.row, pos.col, dir)
        if( dir == 'A') mark = true
        else {
        
            if (sprites.allOfKind(SpriteKind.Brick).length == 28) {
                pause(2000)
                game.over(true)
            }
        }
    }
}

function checkUsed(dx: number, dy: number) {
    dx *= xys.s
    dy *= xys.s
    let pos = cr(cur.x + dx, cur.y + dy)
    let posCur = cr(cur.x, cur.y)
    let value1 = sp[posCur.row][posCur.col].text
    let value2 = sp[pos.row][pos.col].text
    for (let u of sprites.allOfKind(SpriteKind.Brick)) {
        let v1 = u.data.value1
        let v2 = u.data.value2
        if( v1 == v2 )
          if( v1 == value1 && v1 == value2) return true
        
        if ((v1 == value1 || v1 == value2) &&
            (v2 == value1 || v2 == value2) &&
            (v1 != v2) && (value1 != value2)) return true
    }
    return false       
}


function check(dx: number, dy: number){
    dx *= xys.s
    dy *= xys.s
    let pos = cr(cur.x + dx, cur.y + dy)
    if (sp[pos.row][pos.col].text == "") return last
    for (let u of sprites.allOfKind(SpriteKind.Brick)) {
        if (u.top < cur.y + dy && u.bottom > cur.y +dy 
         && u.left < cur.x + dx && u.right > cur.x + dx) 
            return u
    }
    return null
}

/////////////

scene.setBackgroundColor(1)
const field = ["....45....", "...3416...", "...4364...", ".33050626.", "1064204061", 
    "0154232351", ".35122600.", "...1314...", "...5655...", "....22...."]
const xys = {x: 24, y: 5, s: 12}
let sp: TextSprite[][]
drawField()
let countTail = 0
let mark = false
let last: Sprite = null
const cur = sprites.create(img`
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
cur.setPosition(xy(4, 3).x + 1, xy(4,3).y + 1)
keys(0, 0, 'A')
keys(0, 1, "down")
cur.setPosition(xy(2, 3).x + 1, xy(2, 3).y + 1)

function xy(col: number, row: number) {
    return { x: xys.x + xys.s * col, y: xys.y + xys.s * row}
}

function cr(x: number, y: number) {
    return {
        col: Math.floor((x - xys.x) / xys.s),
        row: Math.floor((y - xys.y) / xys.s)
    }
}
function makeTile(row: number, col: number, dir?: string) {
    const x = xys.x + xys.s * col
    const y = xys.y + xys.s * row
    let my: Sprite
    let dx = 0
    let dy = 0
    switch (dir) {
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
            my.setPosition(x - xys.s / 2 + 1, y + 2)
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
            my.setPosition(x + xys.s / 2, y + 2)
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
            `, SpriteKind.Player)
            my.setPosition(x + 1, y + xys.s / 2 + 1)
            dy++
            break
        default:
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
            `, SpriteKind.Player)
            my.setPosition(x + 1, y + 2)
            last = my
    }
    my.z = -1
    my.setKind(SpriteKind.Brick)
    my.data = { value1: sp[row][col].text, value2: sp[row + dy][col + dx].text, count: countTail }
    countTail++
}