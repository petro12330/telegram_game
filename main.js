import {appState} from "./state.js";
import {Sprite} from "./sprite.js";


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
    '../imgs/ground_bg.svg',
    '../imgs/ground_left.svg',
    '../imgs/ground_right.svg',
    '../imgs/base.png',
    '../imgs/rotate_1.png',
    '../imgs/rotate_2.png',
    '../imgs/rotate_3.png',
    '../imgs/rotate_4.png',
    '../imgs/rotate_5.png',
    '../imgs/rotate_6.png',
    '../imgs/rotate_7.png',
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
    main()
    requestAnimationFrame(mainLoop)
}
const init = () => {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.height = 2000
    canvas.width = 900

    appState.ctx = ctx
    appState.canvas = canvas
    appState.resources = resources

    mainLoop()
}

window.onload = function () {
    init();
};
