import {appState, baseStateEnum} from "./state.js";

let imgPath = 'imgs/'
export const getImageSrc = (imgName) => {
    return `${imgPath}${imgName}`
}
// let canvas
let ctx
(function () {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(function (url) {
                _load(url);
            });
        } else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if (resourceCache[url]) {
            return resourceCache[url];
        } else {
            var img = new Image();
            img.onload = function () {
                resourceCache[url] = img;

                if (isReady()) {
                    readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) &&
                !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
resources.load([
    getImageSrc("ground_bg.svg"),
    getImageSrc("ground_left.svg"),
    getImageSrc("ground_right.svg"),
    getImageSrc("base.png"),
    getImageSrc("rotate_1.png"),
    getImageSrc("rotate_2.png"),
    getImageSrc("rotate_3.png"),
    getImageSrc("rotate_4.png"),
    getImageSrc("rotate_5.png"),
    getImageSrc("rotate_6.png"),
    getImageSrc("rotate_7.png"),
    getImageSrc("pink_monster_1/pink_monster_climb_4.png"),
    getImageSrc("pink_monster_1/pink_monster_run_6.png"),
    getImageSrc("pink_monster_1/pink_monster_jump_8.png"),
    getImageSrc("cloud/cloud_1.png"),
    getImageSrc("cloud/cloud_2.png"),
    getImageSrc("cloud/cloud_3.png"),
    getImageSrc("cloud/cloud_4.png"),
    getImageSrc("cloud/cloud_5.png"),
    getImageSrc("cloud/cloud_6.png"),
    getImageSrc("cloud/all_cloud.png"),
]);


const clearCanvas = () => {
    appState.ctx.clearRect(0, 0, appState.canvas.width, appState.canvas.height);
    appState.bufferCtx.clearRect(0, 0, appState.canvas.width, appState.canvas.height);
}
var fps = 0;
var startTime, endTime;

function updateFPS() {
    appState.ctx.fillStyle = "black";
    appState.ctx.font = "16px Arial";
    appState.ctx.fillText("FPS: " + fps, 10, 20);
}
let intervalID = -1;
const main = () => {
    clearCanvas()
    if (appState.isInitial) {
        appState.baseState.initFunc()
    }
    endTime = performance.now();
    var deltaTime = endTime - startTime;
    fps = Math.round(1000 / deltaTime);
    startTime = endTime;

    // Обновление FPS на экране
    updateFPS();
    appState.baseState.callback()
    for (var numSprite in appState.sprites) {
        appState.sprites[numSprite].start()
    }
    appState.ctx.drawImage(appState.bufferCanvas, 0, 0)
}
const mainLoop = () => {
    if (appState.isInitial && appState.baseState.needClearSprites) {
        appState.sprites = {}
    }

    main()

    if (appState.isInitial){
        appState.isInitial = false
    }
    if (window.requestAnimationFrame)
        window.requestAnimationFrame(mainLoop);
    else if (window.msRequestAnimationFrame)
        window.msRequestAnimationFrame(mainLoop);
    else if (window.webkitRequestAnimationFrame)
        window.webkitRequestAnimationFrame(mainLoop);
    else if (window.mozRequestAnimationFrame)
        window.mozRequestAnimationFrame(mainLoop);
    else if (window.oRequestAnimationFrame)
        window.oRequestAnimationFrame(mainLoop);
    else {
        QueueNewFrame = function () {
        };
        intervalID = window.setInterval(mainLoop, 16.7);
    }
    // requestAnimationFrame(mainLoop)
}

const setCanvasSize = () => {
    console.log(1)
    let canvasOldWidth = appState.canvas.width
    let canvasOldHeight = appState.canvas.height
    appState.canvas.height = window.innerHeight * 0.8

    if (window.innerWidth > 600) {
        // For laptop
        appState.canvas.width = 600
    } else {
        appState.canvas.width = window.innerWidth;
        // canvas.height = 700;
    }
    appState.bufferCanvas.width = appState.canvas.width
    appState.bufferCanvas.height = appState.canvas.height
    // if (canvas.width !== canvasOldWidth || canvas.height !== canvasOldHeight){
    //     appState.isInitial = true
    // }

}
const init = () => {

    appState.canvas = document.getElementById("canvas");
    appState.ctx =  appState.canvas.getContext("2d");
    appState.bufferCanvas = document.createElement('canvas');
    appState.bufferCtx = appState.bufferCanvas.getContext('2d');
    setCanvasSize()

    appState.resources = resources

    mainLoop()
}
const playBtn = document.getElementById('play-btn');
function handlePlay() {
    appState.baseState = baseStateEnum.play_animation
    appState.isInitial = true
}

playBtn.addEventListener('click', handlePlay);
window.onload = function () {
    init();
};
window.addEventListener('resize', setCanvasSize);
