namespace SpriteKind {
    export const treat = SpriteKind.create()
    export const floer = SpriteKind.create()
    export const Firebioll = SpriteKind.create()
    export const healer = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.over(false, effects.dissolve)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    current_level += 1
    Startlevel()
    music.playMelody("C E G B C5 B C5 C5 ", 220)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . c c c c c c c . . . . . 
        . . . c c c b b b b b c . . . . 
        . . . c c c c c c c c c . . . . 
        . . . c b c c c c c c c . . . . 
        . . . c b c c c c c c c . . . . 
        . . . c b c c c c c c c . . . . 
        . . . c c c c c c c c c . . . . 
        . . . c c c c c b b c c . . . . 
        . . . . c c c c c c c . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, doge_the_doge, 200, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Firebioll, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy()
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 2335, 1, 255, 0, 526, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (doge_the_doge.vy == 0) {
        doge_the_doge.vy = -175
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.treat, function (sprite, otherSprite) {
    info.changeScoreBy(3)
    otherSprite.destroy()
    music.baDing.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.healer, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    heal.destroy()
})
function Startlevel () {
    if (current_level == 0) {
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (current_level == 1) {
        tiles.setCurrentTilemap(tilemap`level2`)
    } else if (current_level == 2) {
        tiles.setCurrentTilemap(tilemap`level3`)
    } else if (current_level == 3) {
        tiles.setCurrentTilemap(tilemap`level4`)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(doge_the_doge, assets.tile`myTile4`)
    doge_the_doge.ay = 350
    scene.cameraFollowSprite(doge_the_doge)
    for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    info.setLife(5)
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.treat)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.floer)) {
        value.destroy()
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        treat = sprites.create(img`
            . . . 5 5 . . . . . . . . . . 5 
            . . . . 5 . . . 5 5 5 5 . . 5 5 
            5 . . . . 5 5 5 5 e e 5 5 5 . . 
            5 5 . 5 5 5 e e e e e e e 5 5 . 
            . . . 5 e e e e e e e e e e 5 5 
            . . . 5 e 4 e e 4 e e e e e e 5 
            . . . 5 e 4 4 4 4 4 4 e e e 5 5 
            . . . 5 e 4 d d d 4 e e e e 5 . 
            5 5 . 5 e e e e e e e e e 5 5 . 
            . . . 5 5 5 5 5 5 5 5 5 5 5 . . 
            . . . . . . . . . . . . . . 5 5 
            . . . . . 5 . . . . . . . . . . 
            . . . . . 5 . . . . 5 5 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.treat)
        animation.runImageAnimation(
        treat,
        [img`
            . . . . . . . 5 5 5 5 5 5 . . . 
            . . 5 . 5 5 5 5 e e e e 5 5 . . 
            . . . . 5 e e e e e e e e 5 . 5 
            5 . . 5 5 e e e e e e e e 5 . . 
            . . 5 5 e e e e e e e e e 5 . . 
            . . 5 e e e e e e e e e e 5 . . 
            . 5 5 e 4 4 4 4 4 e e e e 5 . 5 
            . 5 e e 4 4 4 4 4 4 e e e 5 . . 
            . 5 5 e 4 d d d 4 4 e e e 5 . . 
            . . 5 5 e e e e e 5 5 5 5 5 . 5 
            . . . 5 5 5 5 5 5 5 . 5 5 . . 5 
            . 5 5 . . . . . . . . . . . . . 
            . . . . . 5 5 . . . 5 . . . . . 
            . . . 5 . . 5 . 5 5 5 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 5 5 5 5 5 . . . . 
            . . . 5 . 5 5 5 e e e 5 5 . . . 
            . . . . . 5 e e e e e e 5 . 5 . 
            . 5 . . 5 5 e e e e e e 5 . . . 
            . . . 5 5 e e e e e e e 5 . . . 
            . . . 5 e e e e e e e e 5 . . . 
            . . 5 5 e 4 4 4 e e e e 5 . 5 . 
            . . 5 e e 4 4 4 4 e e e 5 . . . 
            . . 5 5 e 4 d d 4 e e e 5 . . . 
            . . . 5 5 e e e 5 5 5 5 5 . 5 . 
            . . . . 5 5 5 5 5 . 5 5 . . 5 . 
            . . 5 5 . . . . . . . . . . . . 
            . . . . . . 5 5 . 5 . . . . . . 
            . . . . 5 . . 5 5 5 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 5 . . . . . . . . 
            . . . . 5 . 5 5 5 5 5 . . . . . 
            . . . . . . 5 e e e 5 5 . . . . 
            . . 5 . . 5 5 e e e e 5 . 5 . . 
            . . . . 5 5 e e e e e 5 . . . . 
            . . . . 5 e e e e e e 5 . . . . 
            . . . 5 5 e 4 e e e e 5 . . . . 
            . . . 5 e e 4 e e e e 5 . 5 . . 
            . . . 5 5 e 4 4 e e e 5 . . . . 
            . . . . 5 5 e 4 e e e 5 . . . . 
            . . . . . 5 5 5 5 5 5 5 . 5 . . 
            . . . 5 5 . . 5 . 5 5 . . 5 . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . 5 . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . 5 . . . . . . . 
            . . . . . 5 . 5 5 5 . . . . . . 
            . . . . . . . 5 e 5 5 . . . . . 
            . . . 5 . . 5 5 e e 5 . 5 . . . 
            . . . . . 5 5 e e e 5 . . . . . 
            . . . . . 5 e e e e 5 . . . . . 
            . . . . 5 5 e 4 e e 5 . . . . . 
            . . . . 5 e e 4 e e 5 . 5 . . . 
            . . . . 5 5 e 4 e e 5 . . . . . 
            . . . . . 5 5 e e e 5 . . . . . 
            . . . . . . 5 5 5 5 5 . 5 . . . 
            . . . . 5 5 . . 5 5 . . 5 . . . 
            . . . . . . . . 5 . . . . . . . 
            . . . . . . 5 . 5 . . . . . . . 
            . . . . . . . . 5 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 5 . . . . . . . . 
            . . . . 5 . 5 5 5 5 5 . . . . . 
            . . . . . . 5 e e e 5 5 . . . . 
            . . 5 . . 5 5 e e e e 5 . 5 . . 
            . . . . 5 5 e e e e e 5 . . . . 
            . . . . 5 e e e e e e 5 . . . . 
            . . . 5 5 e 4 e e e e 5 . . . . 
            . . . 5 e e 4 e e e e 5 . 5 . . 
            . . . 5 5 e 4 4 e e e 5 . . . . 
            . . . . 5 5 e 4 e e e 5 . . . . 
            . . . . . 5 5 5 5 5 5 5 . 5 . . 
            . . . 5 5 . . 5 . 5 5 . . 5 . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . 5 . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 5 5 5 5 5 . . . . 
            . . . 5 . 5 5 5 e e e 5 5 . . . 
            . . . . . 5 e e e e e e 5 . 5 . 
            . 5 . . 5 5 e e e e e e 5 . . . 
            . . . 5 5 e e e e e e e 5 . . . 
            . . . 5 e e e e e e e e 5 . . . 
            . . 5 5 e 4 4 4 e e e e 5 . 5 . 
            . . 5 e e 4 4 4 4 e e e 5 . . . 
            . . 5 5 e 4 d d 4 e e e 5 . . . 
            . . . 5 5 e e e 5 5 5 5 5 . 5 . 
            . . . . 5 5 5 5 5 . 5 5 . . 5 . 
            . . 5 5 . . . . . . . . . . . . 
            . . . . . . 5 5 . 5 . . . . . . 
            . . . . 5 . . 5 5 5 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        tiles.placeOnTile(treat, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        floer = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 2 2 2 2 2 2 2 . . . 
            . . . 3 3 2 2 2 2 2 2 2 3 3 . . 
            . . . . 3 3 3 3 3 3 3 3 3 . . . 
            . . . . 4 4 4 3 4 3 4 4 4 . . . 
            . . . . . . 4 4 4 4 4 . . . . . 
            . . . . . . . . 7 . . . . . . . 
            . . . . . . . . 7 . . . . . . . 
            . . 7 7 . . . . 7 . . . . 7 7 . 
            . . 6 7 7 . . . 7 . . . 7 7 7 . 
            . . . 6 7 7 . . 7 . . 7 7 4 . . 
            . . . . 7 7 . . 7 . 7 7 6 . . . 
            . . . . 7 7 7 . 7 7 7 7 . . . . 
            . . . . . 7 7 7 7 7 . . . . . . 
            . . . . . . . 7 7 6 . . . . . . 
            . . . . . . . . 7 . . . . . . . 
            `, SpriteKind.floer)
        tiles.placeOnTile(floer, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile8`)) {
        firer_boll = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 2 2 4 4 5 . 2 2 . . . . 
            . . . . 5 2 4 . 4 4 4 4 4 . . . 
            . . . . . 4 4 4 . . . 2 2 . . . 
            . . 2 2 . 4 4 4 4 4 4 4 4 . 2 . 
            . . . 4 4 4 4 5 5 1 4 4 4 . 2 . 
            . . 5 4 4 5 5 5 5 5 4 . 4 4 2 . 
            . . 4 4 5 5 1 1 5 4 4 4 4 2 . . 
            2 . . 4 4 4 4 1 5 1 4 5 4 . . . 
            2 . 5 . . . 4 4 4 4 4 4 2 2 . . 
            . . 2 . 4 4 . . 4 4 . 4 . . . . 
            . . 2 2 . . 5 5 2 2 4 5 . . . . 
            . 2 . . 5 2 2 2 4 2 2 2 2 . . . 
            . 2 2 . . . . . . . . 2 . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Firebioll)
        tiles.placeOnTile(firer_boll, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        animation.runMovementAnimation(
        firer_boll,
        "c 0 -100 0 100 0 0",
        2000,
        true
        )
        firer_boll.startEffect(effects.fire)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile16`)) {
        heal = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . 6 
            . . . . . . . . . . . . . . 6 7 
            . . . . 6 6 6 6 6 6 6 6 . 6 7 6 
            . . . 6 6 7 7 7 7 7 7 7 6 7 6 7 
            . . f 7 7 f 7 7 2 7 7 7 6 6 7 6 
            . . f 7 7 7 7 2 2 2 7 7 6 7 6 7 
            . . f 7 7 7 7 7 2 7 7 7 6 6 7 6 
            . . . 6 7 7 7 7 7 7 7 7 6 7 6 7 
            . . . . 6 6 6 6 6 6 6 6 6 6 7 6 
            . . . . . . . . . . . . . 6 6 6 
            . . . . . . . . . . . . . . . 6 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.healer)
        animation.runImageAnimation(
        heal,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . 6 
            . . . . . . . . . . . . . . 6 6 
            . . . 6 6 6 6 6 6 6 6 6 . 6 6 7 
            . . 6 7 7 7 7 7 7 7 7 7 6 6 7 6 
            . f 7 7 f 7 7 2 7 7 7 7 6 7 6 7 
            . f 7 7 7 7 2 2 2 7 7 7 6 6 7 6 
            . f 7 7 7 7 7 2 7 7 7 7 6 7 6 7 
            . . 6 7 7 7 7 7 7 7 7 7 6 6 7 6 
            . . 6 7 7 7 7 7 7 7 7 7 6 7 6 7 
            . . . 6 6 6 6 6 6 7 6 6 6 6 7 6 
            . . . . . . . . 6 6 6 . . 6 6 7 
            . . . . . . . . . . . . . . 6 6 
            . . . . . . . . . . . . . . . 6 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 7 . . . . . . . 
            . . . . 7 . . 7 . . . . . . . . 
            . . 7 . . . . . . . 7 7 . . . 6 
            . . . . . . . . . . . . . . 6 6 
            . . . 6 6 6 6 6 6 6 6 6 . 6 6 7 
            . . 6 7 7 7 7 7 7 7 7 7 6 6 7 6 
            . f 7 7 f 7 7 2 7 7 7 7 6 7 6 7 
            . f 7 7 7 7 2 2 2 7 7 7 6 6 7 6 
            . . 6 7 7 7 7 7 7 7 7 7 6 6 7 6 
            . . 6 7 7 7 7 7 7 7 7 7 6 7 6 7 
            . . . 6 6 6 6 6 6 7 6 6 6 6 7 6 
            . . 7 . . . . . 6 6 6 . . 6 6 7 
            . . . . 7 . . 7 . . . 7 . . 6 6 
            . . . . . . . . . 7 . . . 7 . 6 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . 6 
            . . . . . . . . . . . . . . 6 6 
            . . . 6 6 6 6 6 6 6 6 6 . 6 6 7 
            . . 6 7 7 7 7 7 7 7 7 7 6 6 7 6 
            . f 7 7 f 7 7 2 7 7 7 7 6 7 6 7 
            . f 7 7 7 7 2 2 2 7 7 7 6 6 7 6 
            . f 7 7 7 7 7 2 7 7 7 7 6 7 6 7 
            . . 6 7 7 7 7 7 7 7 7 7 6 7 6 7 
            . . . 6 6 6 6 6 6 7 6 6 6 6 7 6 
            . . . . . . . . 6 6 6 . . 6 6 7 
            . . . . . . . . . . . . . . 6 6 
            . . . . . . . . . . . . . . . 6 
            . . . . . . . . . . . . . . . . 
            `],
        200,
        true
        )
        tiles.placeOnTile(heal, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.floer, function (sprite, otherSprite) {
    otherSprite.destroy()
    bea = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 1132, 598, 232, 0, 512, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.UntilDone)
    animation.runImageAnimation(
    bea,
    [img`
        ....................
        ............99......
        .........999119.....
        ........9111119.....
        .......91111919.....
        .......91119119.....
        .....fff1191119.....
        ..ffff5ffffff19.....
        .ff555555f55fff.....
        .f555f55ff55f5f.....
        .f55f555f55ff5f.....
        .f555f55f55f55ff....
        .f555555f55f55fff...
        .f55ff55f55f55ff....
        .f5f55f5f55f55f.....
        .f555555f55f5ff.....
        .f555555f55f5f......
        .ffffff5f55ff.......
        .......fffff........
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .....fff............
        ..ffff5ffffff.......
        .ff555555f55fff.....
        .f555f55ff55f5f.....
        .f55f555f55ff5f.....
        .f555f55f55f55ff....
        .f555555f55f55fff...
        .f55ff55f55f55ff....
        .f5f55f5f55f55f.....
        .f555555f55f5ff.....
        .f555555f55f5f......
        .ffffff5f55ff.......
        .......fffff........
        ....................
        `],
    100,
    true
    )
    bea.setPosition(doge_the_doge.x + 80, doge_the_doge.y - 80)
    bea.follow(doge_the_doge)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (doge_the_doge.y < otherSprite.y) {
        info.changeScoreBy(5)
        music.playMelody("G C5 G C C - - - ", 400)
    } else {
        info.changeLifeBy(-1)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 553, 1, 255, 0, 400, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
let bea: Sprite = null
let firer_boll: Sprite = null
let floer: Sprite = null
let treat: Sprite = null
let heal: Sprite = null
let projectile: Sprite = null
let doge_the_doge: Sprite = null
let current_level = 0
scene.setBackgroundColor(9)
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999d99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999999dd999999d9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999999ddd99999d999999999999d999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999999ddddd9999dd9999999999ddd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999ddddddd999dd9999999999ddd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999d9dddd999ddd999999999ddddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999999ddddd999dddd99999999dddddd999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999ddddddd999dd9999999999dddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999999dddd9dd99ddd9999999dddddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999dddddd999ddd999999999dddddd999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999dd9ddddd99dddd9999999ddddd9dd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99999999999999999999999999dddddddddddd999999ddddddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999ddddddddddddddddddd99dddddd999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999d9999999999ddddddddddddddddddddd99dddddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999d999999999999999999
    999999999999ddd99999999999ddddddddddddddddddddddd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999d9999dd999999999999999999
    999999999999dd9999999999dddddddddddddddddddddddddd9999999999999999999999999999999999d99999999999999999999999999999999999999999999999999dd999dd999999999999999999
    99999999999ddd999999999dddddddddddddddddddddddddddd999999999999999999999999999999999dd9999999999999999999999999999999999999999999999999dd99ddd999999999999999999
    9999999999ddddd999999ddddddddddddddddddddddddddddddd99999999999999999999999999999999dd99999999999999999999999999999999999999999999d999dddd9ddddd9999999999999999
    99999999999ddd99999dddddddddddddddddddddddddddddddddd999999999999999999999999999999dddd999999999999999999999999999999999999999999ddd99dddd99dd999999999999999999
    999999999999ddd999dddddddddddddddddddddddddddddddddddd99999999999999999999999999999dddd9999d9999999999999999999999999999999999999ddd999dd99dddddd999999999999999
    9999999999dddd99dddddddddddbbdddddbbddddddddddddddddddd999999999999999999999dd999999dd99999d999999999999999999999999999999999999dddd9ddddddddd999999999d99999999
    99999999999dddddddddddddddd444444444dddddddddddddddddddd9999999999999999999ddd9999dddddd999dd9999999999999999999999999999999999999ddd9dddd999dd99999999d99999999
    999999999999ddddddddddddddd444444444ddddddddddddddddddddd99999999999999999dddd99999dddd9999dd999999999999999999999999999999999999ddd99ddddd99d99999999dddd999999
    999999999999ddddddddddddddd44f444f44dddddddddddddddddddddd999999999999999999ddd9999ddddd99ddd9999999999999d99999999999999999999ddddddddddddd9d999999999d99999999
    99999999999dddddddddddddddd444444444dddddddddddddddddddddd9999999999999999dddddd9dddddddd9dddd99999999999dd999999999999999999999ddddddddddddddddd9999dddd9999999
    9999999999ddddddddddddddddd444fff444ddddddddddddddddddddddd99999999999999dddddd9dddddddddd9dd999999999999ddd9999999999999d99999ddddd99ddddddddddddd999ddd9999999
    99999999ddddddddddddddddddd4f44f44f4dddddddddddddddddddddddd999999999999999dddddd99dddd9999ddd9999999999ddddd999999999999d9999dddddddddddddddddddddd99ddddd99999
    9999999dddddddddddddddddddd44fffff44ddddddddddddddddddddddddd9999999999999dddddd99dddddd99ddd9999999999ddddddd99999999999dd99999dddddddddddddddddddddddddd999999
    999999ddddddddddddddddddddd444444444dddddddddddddddddddddddddd99999999999ddddddddddddddddddddddd9999999d9dddd999999999999dd9999dddddddddddddddddddddddddd9999999
    99999dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd9999999999999ddddddddddddddddddddddd99999ddddd99999999999ddd9999dddddddddddddddddddddddddd9999999
    999ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd99999999999dddddddddddddddddddddddddd99ddddddd99999999999d9999dddddddddddddddddddddddddddd999999
    99ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd99999999dddddddddddddddddddddddddddddd9dddd9d9999999999dddd99dddddddddddddddddddddddddddddd9999
    9dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd99999ddddddddddddddddddddddddddddddddddddd999999999999dd99ddddddddddddddddddddddddddddddddd99
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd999ddddddddddddddddddddddddddddddddddddddd999999999ddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd9999999999dddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd9999999999ddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd9999999ddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd9999dddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    `)
current_level = 0
doge_the_doge = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 5 5 . . . . . . . . . . . . 
    . . 4 4 . . . . . . . d . d . . 
    . . 4 4 . . . . . . . 4 . 4 . . 
    . . 4 4 . . . . . . 4 4 4 4 4 . 
    . . 4 4 . . . . . . 4 4 4 4 f . 
    . . 4 4 . . . . . . 4 4 f 4 d . 
    . . 4 4 . . . . . . 4 4 4 f f . 
    . . 4 4 . . . . . . 4 4 4 4 4 . 
    . . d 4 4 4 4 4 4 4 4 4 4 4 . . 
    . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
    . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
    . . 4 . . 4 4 4 4 4 4 . . 4 . . 
    . . 4 . . 4 . . . . 4 . . 4 . . 
    . . e e . e e . . . e e . e e . 
    `, SpriteKind.Player)
controller.moveSprite(doge_the_doge, 100, 0)
doge_the_doge.setBounceOnWall(false)
Startlevel()
game.onUpdate(function () {
    doge_the_doge.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 5 5 . . . . . . . . . . . . 
        . . 4 4 . . . . . . . b . b . . 
        . . 4 4 . . . . . . . 4 . 4 . . 
        . . 4 4 . . . . . . 4 4 4 4 4 . 
        . . 4 4 . . . . . . 4 4 4 4 f . 
        . . 4 4 . . . . . . 4 4 f 4 d . 
        . . 4 4 . . . . . . 4 4 4 f f . 
        . . 4 4 . . . . . . 4 4 4 4 4 . 
        . . b 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . 4 . . 4 4 4 4 4 4 . . 4 . . 
        . . 4 . . 4 . . . . 4 . . 4 . . 
        . . e e . e e . . . e e . e e . 
        `)
    if (doge_the_doge.vy < 0) {
        doge_the_doge.setImage(img`
            ....................
            ....................
            ....................
            ............b..b....
            ............4444....
            ...........4444f....
            ..........4444f4....
            .........444444f....
            ........444444......
            .......4444444......
            ......444444.4......
            .....4444444.4e.....
            ....444444.4........
            ..4444444..4e.......
            .444444.4...........
            d444.4..4e..........
            .....4..............
            .....4e.............
            ....................
            ....................
            `)
    } else if (doge_the_doge.vy > 0) {
        doge_the_doge.setImage(img`
            ....d...............
            ....44..............
            ....444.............
            ....444.............
            .....444............
            ..4444444...........
            ..e..44444..........
            ......44444.........
            ....44444444........
            ....e..444444.......
            ........444444......
            ......444444444.....
            ......e...444444b...
            ........44444444....
            ........e...4f44....
            ............f4f4b...
            ....................
            ....................
            ....................
            ....................
            `)
    } else if (doge_the_doge.x % 2 == 0) {
        doge_the_doge.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 5 5 . . . . . . . . . . . . 
            . . 4 4 . . . . . . . b . b . . 
            . . 4 4 . . . . . . . 4 . 4 . . 
            . . 4 4 . . . . . . 4 4 4 4 4 . 
            . . 4 4 . . . . . . 4 4 4 4 f . 
            . . 4 4 . . . . . . 4 4 f 4 d . 
            . . 4 4 . . . . . . 4 4 4 f f . 
            . . 4 4 . . . . . . 4 4 4 4 4 . 
            . . b 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . 4 4 4 4 4 4 4 4 4 4 4 4 . . 
            . . 4 4 4 4 4 4 4 4 4 4 4 4 4 . 
            . . . 4 . . 4 4 4 . 4 4 . . 4 . 
            . . . 4 . . 4 . . . . 4 . . 4 . 
            . . . e e . e e . . . e e . e e 
            `)
    } else {
    	
    }
    if ((doge_the_doge.isHittingTile(CollisionDirection.Left) || doge_the_doge.isHittingTile(CollisionDirection.Right)) && doge_the_doge.vy >= 0) {
        doge_the_doge.vy = 0
        doge_the_doge.ay = 0
        doge_the_doge.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 4 f d f 4 . . . . . e 
            . . . d 4 4 4 4 f 4 4 4 4 4 4 e 
            . . . . . 4 4 f 4 4 4 4 4 . . . 
            . . . d 4 4 4 4 4 4 4 4 4 . . e 
            . . . . . 4 4 4 4 4 4 4 4 4 4 e 
            . . . . . . . . . . 4 4 4 4 . . 
            . . . . . . . . . . 4 4 4 4 . . 
            . . . . . . . . . . 4 4 4 4 . . 
            . . . . . . . . . . 4 4 4 4 . e 
            . . . . . . . . . . 4 4 4 4 4 e 
            . . . . . . . . . . 4 4 4 . . . 
            . . 5 4 4 4 4 4 4 4 4 4 4 . . e 
            . . 5 4 4 4 4 4 4 4 d 4 4 4 4 e 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
        doge_the_doge.ay = 350
    }
    if (doge_the_doge.vx < 0 || doge_the_doge.isHittingTile(CollisionDirection.Left)) {
        doge_the_doge.image.flipX()
        doge_the_doge.setImage(doge_the_doge.image)
    }
})
