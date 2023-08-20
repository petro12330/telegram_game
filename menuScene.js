import {Sprite} from "./sprite.js";
import {appState} from "./state.js";
import {getImageSrc} from "./main.js";

const drawGround = () => {
    let imgScale = 0.5
    console.log(window.innerWidth)
    let leftGround = appState.resources.get(getImageSrc("ground_left.svg"),)
    let rightGround = appState.resources.get(getImageSrc("ground_right.svg"),)
    let centralGround = appState.resources.get(getImageSrc("ground_bg.svg"),)
    let marginGroundSprite = 0
    let leftGroundSprite = new Sprite({
        ctx: appState.ctx,
        image: leftGround,
        imgScale: imgScale,
        xPos: marginGroundSprite,
        yPos: appState.canvas.height - (imgScale * leftGround.height)
    })
    appState.sprites["ground_left"] = leftGroundSprite
    console.log(appState.canvas.width)

    let spaceBetweenGround = appState.canvas.width - (leftGroundSprite.width*imgScale) - (marginGroundSprite * 2) - (rightGround.width* imgScale)
    console.log("spaceBetweenGround", spaceBetweenGround)
    if (spaceBetweenGround > 0) {
        let i = spaceBetweenGround/(centralGround.width*imgScale);
        while (i !== -1) { // когда i будет равно 0, условие станет ложным, и цикл остановится
            let centralGroundSprite = new Sprite({
                ctx: appState.ctx,
                image: centralGround,
                imgScale: imgScale,
                xPos: leftGroundSprite.getRealWidth()+(centralGround.width*imgScale*i),
                yPos: leftGroundSprite.yPos
            })
            appState.sprites[`central_ground${i}`] = centralGroundSprite
            i--
        }
    }
    // console.log(appState.canvas.width)
    // console.log(rightGround.width*imgScale)
    let rightGroundSprite = new Sprite({
        ctx: appState.ctx,
        image: rightGround,
        imgScale: imgScale,
        xPos: appState.canvas.width - marginGroundSprite - (rightGround.width*imgScale),
        yPos: leftGroundSprite.yPos
    })
    appState.sprites["ground_right"] = rightGroundSprite


}
export const drawMenu = () => {
    if (appState.isInitial) {
        drawGround()
        initDrawMenu()
    }
}


export const initDrawMenu = () => {
    let coinImage = new Image();
    coinImage.src = getImageSrc("pink_monster_1/pink_monster_jump_8.png")
    // let sprite = new Sprite({
    //     ctx: appState.ctx,
    //     image: coinImage,
    //     width: 256,
    //     height: 32,
    //     numberOfFrames: 8,
    //     ticksPerFrame: 10,
    //     imgScale: 10,
    //     xPos: 0,
    //     yPos:0
    // })
    // appState.sprites.push(sprite)
}
