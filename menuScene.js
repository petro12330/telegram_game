import {Sprite} from "./sprite.js";
import {appState} from "./state.js";
import {getImageSrc} from "./main.js";

let n = 0
const drawGround = () => {
    let imgScale =  appState.canvas.width /1166
    let leftGround = appState.resources.get(getImageSrc("ground_left.svg"),)
    let rightGround = appState.resources.get(getImageSrc("ground_right.svg"),)
    let centralGround = appState.resources.get(getImageSrc("ground_bg.svg"),)
    let marginGroundSprite = 0
    let leftGroundSprite = new Sprite({
        ctx: appState.ctx,
        image: leftGround,
        width: leftGround.width,
        height: leftGround.height,
        numberOfFrames: 0,
        ticksPerFrame: 0,
        imgScale: imgScale,
        xPos: marginGroundSprite,
        yPos: appState.canvas.height / 1.1
    })
    appState.sprites["ground_left"]= leftGroundSprite
    // let spaceBetweenGround = appState.canvas.width - leftGroundSprite.width - (marginGroundSprite * 2) - rightGround.width
    // console.log(spaceBetweenGround)
    // console.log(centralGround.width)
    // if (spaceBetweenGround > 0) {
    //     let i = spaceBetweenGround;
    //     while (i) { // когда i будет равно 0, условие станет ложным, и цикл остановится
    //         let centralGroundSprite = new Sprite({
    //             ctx: appState.ctx,
    //             image: centralGround,
    //             width: 280,
    //             height: 190,
    //             numberOfFrames: 0,
    //             ticksPerFrame: 0,
    //             imgScale: 1,
    //             xPos: marginGroundSprite + leftGroundSprite.width + i,
    //             yPos: leftGroundSprite.yPos
    //         })
    //         appState.sprites.push(centralGroundSprite)
    //         i--
    //     }
    //
    // }
    // let rightGroundSprite = new Sprite({
    //     ctx: appState.ctx,
    //     image: rightGround,
    //     width: 390,
    //     height: 190,
    //     numberOfFrames: 0,
    //     ticksPerFrame: 0,
    //     imgScale: 1,
    //     xPos: appState.canvas.width - marginGroundSprite - rightGround.width,
    //     yPos: leftGroundSprite.yPos
    // })
    // appState.sprites.push(rightGroundSprite)


}
export const drawMenu = () => {
    if (appState.isInitial) {
        drawGround()
        initDrawMenu()
        appState.isInitial = false
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
