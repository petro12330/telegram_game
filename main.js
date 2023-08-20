import {appState} from "./state.js";

let imgPath = 'imgs/'
export const getImageSrc = (imgName) => {
    return `${imgPath}${imgName}`
}
let canvas
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
]);


const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const main = () => {
    clearCanvas()
    appState.baseState.callback()
    for (var numSprite in appState.sprites) {
        appState.sprites[numSprite].start()
    }
}
const mainLoop = () => {
    if (appState.isInitial) {
        appState.sprites = []
    }
    main()
    if (appState.isInitial){
        appState.isInitial = false
    }

    requestAnimationFrame(mainLoop)
}

const setCanvasSize = () => {
    console.log(1)
    let canvasOldWidth = canvas.width
    let canvasOldHeight = canvas.height
    canvas.height = window.innerHeight * 0.8

    if (window.innerWidth > 600) {
        // For laptop
        canvas.width = 600
    } else {
        canvas.width = window.innerWidth;
        // canvas.height = 700;
    }
    if (canvas.width !== canvasOldWidth || canvas.height !== canvasOldHeight){
        appState.isInitial = true
    }

}
const init = () => {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    setCanvasSize()

    appState.ctx = ctx
    appState.canvas = canvas
    appState.resources = resources

    mainLoop()
}

window.onload = function () {
    init();
};
window.addEventListener('resize', setCanvasSize);
