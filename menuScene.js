import {Sprite} from "./sprite.js";
import {appState} from "./state.js";
import {getImageSrc} from "./main.js";
import {countCloudMenu, groundImageScale} from "./const.js";
import {randomInteger} from "./utils.js";


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
        image: spriteImage,
        numberOfFrames: 4,
        ticksPerFrame: 20,
        imgScale: 3,
        xPos: 0,
        yPos: groundYCor - (spriteImage.height* 2.5)
    })
}

const initCloud = () => {
    let cloudImageSrc =  getImageSrc(`cloud/all_cloud.png`)
    let spriteImage = appState.resources.get(cloudImageSrc)
    let cloudScale = 0.5
    appState.sprites[cloudImageSrc] =new Sprite({
            ctx: appState.ctx,
            image: spriteImage,
            imgScale: cloudScale,
            xPos: -1200,
            yPos: 1,
        })
    // let cloudSprite
    // let cloudImage
    // let cloudImageSrc
    // let countCloud = countCloudMenu
    // let imgScale = 1
    // while (countCloud !== 0) {
    //     cloudImageSrc =  getImageSrc(`cloud/cloud_${randomInteger(1, 6)}.png`)
    //     cloudImage = appState.resources.get(cloudImageSrc)
    //     cloudSprite= new Sprite({
    //         ctx: appState.ctx,
    //         image: cloudImage,
    //         imgScale: imgScale,
    //         xPos: -cloudImage.width,
    //         yPos: randomInteger(1, 600),
    //     })
    //     appState.sprites[`cloud_${countCloud}`] = cloudSprite
    //     countCloud--
    // }
}

const changeCloud = () => {
    let cloudImageSrc =  getImageSrc(`cloud/all_cloud.png`)
    let cloudMenuSpeed = 0.2
    appState.sprites[cloudImageSrc].changeCor({"changeX":cloudMenuSpeed})
    // let cloudSprite
    // let cloudImage
    // let cloudSpriteKey
    // let countCloud = countCloudMenu
    // let imgScale = 1
    // while (countCloud !== 0) {
    //     cloudSpriteKey = `cloud_${countCloud}`
    //     cloudSprite = appState.sprites[cloudSpriteKey]
    //     cloudSprite.changeCor({"changeX":0.1})
    //     appState.sprites[cloudSpriteKey] = cloudSprite
    //     countCloud--
    // }
}
export const drawMenu = () => {
    if (appState.isInitial) {
        console.log(44444444444444444444444444)
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
