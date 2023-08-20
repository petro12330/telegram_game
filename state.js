import {drawMenu, initDrawMenu} from "./menuScene.js";

const baseStateEnum = {
    "menu": {
        "value": "menu",
        "callback": drawMenu,
        "initFunc": initDrawMenu
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
