import {drawMenu, initDrawMenu, initPlayAnimation, startPlayAnimation} from "./menuScene.js";

export const baseStateEnum = {
    "menu": {
        "value": "menu",
        "callback": drawMenu,
        "initFunc": initDrawMenu,
        "needClearSprites": true,
    },
    "play_animation": {
        "needClearSprites": false,
        "value": "play_animation",
        "callback": startPlayAnimation,
        "initFunc": initPlayAnimation
    }

}
export const appState = {
    "ctx": null,
    "canvas": null,
    "bufferCanvas": null,
    "bufferCtx": null,
    "score": 0,
    "isInitial": true,
    "baseState": baseStateEnum.menu,
    "sprites": {},
    "resources": null
}
