controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    dart = sprites.createProjectileFromSprite(assets.image`Projectile`, spacePlane, 300, 0)
    music.pewPew.play()
})
info.onLifeZero(function () {
    if (info.score() > info.highScore()) {
        game.over(true, effects.confetti)
    } else {
        game.over(false, effects.melt)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
    music.smallCrash.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 200)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    music.bigCrash.playUntilDone()
})
let Bogey: Sprite = null
let dart: Sprite = null
let spacePlane: Sprite = null
spacePlane = sprites.create(img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ....82..........................
    ....111....9999.................
    ....2222..999999................
    .444f866666999966...............
    444f666666666666666.............
    .44f6888666666666666............
    ..44f88....88866666.............
    ..........888882................
    ..........88882.................
    .........88882..................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    `, SpriteKind.Player)
spacePlane.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
info.setScore(0)
let lastScore = info.score()
controller.moveSprite(spacePlane, 200, 200)
game.onUpdateInterval(500, function () {
    Bogey = sprites.create(assets.image`Bogey`, SpriteKind.Enemy)
    Bogey.setVelocity(-100, 0)
    Bogey.left = scene.screenWidth()
    Bogey.y = randint(0, scene.screenHeight())
    Bogey.setFlag(SpriteFlag.AutoDestroy, true)
    if (info.score() >= lastScore + 5) {
        info.changeLifeBy(1)
        lastScore = info.score()
    }
})
