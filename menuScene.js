import {Sprite} from "./sprite.js";
import {appState} from "./state.js";
import {getImageSrc} from "./main.js";
import {groundImageScale} from "./const.js";


let groundYCor
const drawGround = () => {
    let imgScale = groundImageScale
    let leftGround = appState.resources.get(getImageSrc("ground_left.svg"),)
    let rightGround = appState.resources.get(getImageSrc("ground_right.svg"),)
    let centralGround = appState.resources.get(getImageSrc("ground_bg.svg"),)
    let marginGroundSprite = 0
    groundYCor = appState.canvas.height - (imgScale * leftGround.height)
    let leftGroundSprite = new Sprite({
        ctx: appState.ctx,
        bufferCtx: appState.bufferCtx,
        image: leftGround,
        imgScale: imgScale,
        xPos: marginGroundSprite,
        yPos: groundYCor
    })
    appState.sprites["ground_left"] = leftGroundSprite
    let spaceBetweenGround = appState.canvas.width - (leftGroundSprite.width * imgScale) - (marginGroundSprite * 2) - (rightGround.width * imgScale)
    if (spaceBetweenGround > 0) {
        let i = spaceBetweenGround / (centralGround.width * imgScale);
        while (i !== -1) { // когда i будет равно 0, условие станет ложным, и цикл остановится
            appState.sprites[`central_ground${i}`] = new Sprite({
                ctx: appState.ctx,
                bufferCtx: appState.bufferCtx,
                image: centralGround,
                imgScale: imgScale,
                xPos: leftGroundSprite.getRealWidth() + (centralGround.width * imgScale * i),
                yPos: groundYCor
            })
            i--
        }
    }
    appState.sprites["ground_right"] = new Sprite({
        ctx: appState.ctx,
        bufferCtx: appState.bufferCtx,
        image: rightGround,
        imgScale: imgScale,
        xPos: appState.canvas.width - marginGroundSprite - (rightGround.width * imgScale),
        yPos: groundYCor
    })
}

const drawBaseSprite = () => {
    let spriteSrc = getImageSrc("pink_monster_1/pink_monster_climb_4.png")
    let spriteImage = appState.resources.get(spriteSrc)
    appState.sprites[spriteSrc] = new Sprite({
        ctx: appState.ctx,
        bufferCtx: appState.bufferCtx,
        image: spriteImage,
        numberOfFrames: 4,
        ticksPerFrame: 20,
        imgScale: 3,
        xPos: 0,
        yPos: groundYCor - (spriteImage.height * 2.5)
    })
}

const initCloud = () => {
    let cloudImageSrc = getImageSrc(`cloud/all_cloud.png`)
    let spriteImage = appState.resources.get(cloudImageSrc)
    let cloudScale = 0.5
    appState.sprites[cloudImageSrc] = new Sprite({
        ctx: appState.ctx,
        bufferCtx: appState.bufferCtx,
        image: spriteImage,
        imgScale: cloudScale,
        xPos: -1200,
        yPos: 1,
    })
}

const changeCloud = () => {
    let cloudImageSrc = getImageSrc(`cloud/all_cloud.png`)
    let cloudMenuSpeed = 1
    appState.sprites[cloudImageSrc].changeCor({"changeX": cloudMenuSpeed})
}
export const drawMenu = () => {
    if (appState.isInitial) {
        drawGround()
        drawBaseSprite()
        initDrawMenu()
        initCloud()
    } else {
        changeCloud()
    }

}


export const initDrawMenu = () => {

}
export const startPlayAnimation = () => {
    // return
    let cloudImageSrc = getImageSrc(`cloud/all_cloud.png`)
    let cloudMenuSpeed = -1
    appState.sprites[cloudImageSrc].changeCor({"changeX": cloudMenuSpeed})

    for (const spriteKey in appState.sprites) {
        if (spriteKey.indexOf('ground') !== -1) {
            appState.sprites[spriteKey].changeCor({"changeX": cloudMenuSpeed})
        }
    }
    let spriteChangePos = {
        "changeX": 4
    }
    let mainSprite = appState.sprites["mainSprite"]
    if (mainSprite.xPos >= appState.bufferCanvas.width * 0.5) {
        spriteChangePos['changeY'] = -2
        let spriteImage = appState.resources.get(getImageSrc("pink_monster_1/pink_monster_jump_8.png"))
        mainSprite.changeImg(
            {
                ctx: appState.ctx,
                bufferCtx: appState.bufferCtx,
                image: spriteImage,
                numberOfFrames: 8,
                ticksPerFrame: 40,
                imgScale: 3,
            }
        )
    }
    mainSprite.changeCor(spriteChangePos)
}

export const initPlayAnimation = () => {
    console.log("delete sprite")
    delete appState.sprites[getImageSrc("pink_monster_1/pink_monster_climb_4.png")];
    let spriteSrc = getImageSrc("pink_monster_1/pink_monster_run_6.png")
    let spriteImage = appState.resources.get(spriteSrc)
    appState.sprites["mainSprite"] = new Sprite({
        ctx: appState.ctx,
        bufferCtx: appState.bufferCtx,
        image: spriteImage,
        numberOfFrames: 6,
        ticksPerFrame: 20,
        imgScale: 3,
        xPos: 0,
        yPos: groundYCor - (spriteImage.height * 2.5)
    })
}
