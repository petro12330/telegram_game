import {drawMenu, initDrawMenu} from "./menuScene.js";

const baseStateEnum = {
    "menu": {
        "value": "menu",
        "callback": drawMenu,
        "initFunc": initDrawMenu
    }
}
export const appState = {
    "score": 0,
    "isInitial": true,
    "baseState": baseStateEnum.menu,
    "sprites": [],
    "ctx": null,
    "canvas": null,
    "resources": null
}
