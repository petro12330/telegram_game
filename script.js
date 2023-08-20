// // var player = {
// //     pos: [0, 0],
// //     sprite: new Sprite('img/sprites.png', [0, 0], [39, 39], 16, [0, 1])
// // };
// const gameState = {
//
// }
// let canvas;
// let ctx;
//
// var bullets = [];
// var enemies = [];
// var explosions = [];
//
// var lastFire = Date.now();
// var gameTime = 0;
// var isGameOver;
// var terrainPattern;
//
// // The score
// var score = 0;
// var scoreEl = document.getElementById('score');
//
// (function () {
//     var resourceCache = {};
//     var loading = [];
//     var readyCallbacks = [];
//
//     // Load an image url or an array of image urls
//     function load(urlOrArr) {
//         if (urlOrArr instanceof Array) {
//             urlOrArr.forEach(function (url) {
//                 _load(url);
//             });
//         } else {
//             _load(urlOrArr);
//         }
//     }
//
//     function _load(url) {
//         if (resourceCache[url]) {
//             return resourceCache[url];
//         } else {
//             var img = new Image();
//             img.onload = function () {
//                 resourceCache[url] = img;
//
//                 if (isReady()) {
//                     readyCallbacks.forEach(function (func) {
//                         func();
//                     });
//                 }
//             };
//             resourceCache[url] = false;
//             img.src = url;
//         }
//     }
//
//     function get(url) {
//         return resourceCache[url];
//     }
//
//     function isReady() {
//         var ready = true;
//         for (var k in resourceCache) {
//             if (resourceCache.hasOwnProperty(k) &&
//                 !resourceCache[k]) {
//                 ready = false;
//             }
//         }
//         return ready;
//     }
//
//     function onReady(func) {
//         readyCallbacks.push(func);
//     }
//
//     window.resources = {
//         load: load,
//         get: get,
//         onReady: onReady,
//         isReady: isReady
//     };
// })();
//
// let speed = 0;
//
// function animate() {
//     // Используйте переменную speed для управления скоростью анимации
//     if (speed > 0) {
//         for (let i = 0; i < speed; i++) {
//             requestAnimationFrame(main);
//         }
//     } else {
//         // Если скорость отрицательная, пропустите несколько кадров
//         main()
//         requestAnimationFrame(animate);
//     }
// }
// import {Sprite} from "./sprite.js";
// let sprites = []
// let sprite
// const init = () => {
//     canvas = document.getElementById("canvas");
//     canvas.height = 2000
//     canvas.width = 900
//     ctx = canvas.getContext("2d");
//     let coinImage = new Image();
//     coinImage.src = '../../imgs/pink_monster_1/pink_monster_jump_8.png';
//     sprite = new Sprite({
//         ctx: ctx,
//         image: coinImage,
//         width: 256,
//         height: 32,
//         numberOfFrames: 8,
//         ticksPerFrame: 10,
//         imgScale: 10,
//         xPos: 0,
//         yPos:0
//     })
//     sprites.push(sprite)
//     let coinImage1 = new Image();
//
//     coinImage1.src = '../../imgs/pink_monster_1/Pink_Monster_Run_6.png';
//     let sprite1 = new Sprite({
//         ctx: ctx,
//         image: coinImage1,
//         width: 192,
//         height: 32,
//         numberOfFrames: 6,
//         ticksPerFrame: 10,
//         imgScale: 10,
//         xPos: 200,
//         yPos:200
//     })
//     sprites.push(sprite1)
//     //
//     animate()
//     main()
// }
//
// var lastTime;
// const drawImage = (imgObj, x, y, dWidth = null, dHeight = null, withSaveProportions = true) => {
//     let height
//     let width
//     if (dWidth === null && dHeight === null) {
//         height = imgObj.height
//         width = imgObj.width
//     } else if (!!dWidth && !dHeight && withSaveProportions) {
//         width = dWidth
//         height = saveProportions(imgObj, width)
//     } else if (!dWidth && !!dHeight && withSaveProportions) {
//         height = dHeight
//         width = saveProportions(imgObj, dHeight, false)
//     } else if (!!dWidth && !dHeight && !withSaveProportions) {
//         height = imgObj.height
//         width = dWidth
//     } else if (!dWidth && !!dHeight && !withSaveProportions) {
//         height = dHeight
//         width = imgObj.width
//     }
//
//     ctx.drawImage(imgObj, x, y, width, height)
//     return {imgObj, x, y, width, height}
// }
//
// const saveProportions = (imgObj, NewSide, isWidth = true) => {
//
//     let defaultWidth = imgObj.width
//     let defaultHeight = imgObj.height
//     let sizeCoefficient = defaultWidth / defaultHeight
//     if (isWidth) {
//         return NewSide / sizeCoefficient
//     }
//     return NewSide * sizeCoefficient
//
// }
//
// const drawGround = () => {
//     let leftGround = resources.get('../../imgs/ground_left.svg')
//     let rightGround = resources.get('../../imgs/ground_right.svg')
//     let centralGround = resources.get('../../imgs/ground_bg.svg')
//     let imgScale = window.innerHeight > 1200 ? 1 : 2
//     let newHeight = leftGround.height / imgScale
//     let baseY = canvas.height / 1.1
//     let leftGroundX = 10
//     let {width} = drawImage(leftGround, leftGroundX, baseY, null, newHeight)
//     let centralGroundX = leftGroundX + width
//     let i = 0;
//     let countCentral = (canvas.width - leftGround.width / imgScale - rightGround.width / imgScale - 20) / 2
//     while (i < countCentral) { // выводит 0, затем 1, затем 2
//         let {width} = drawImage(centralGround, centralGroundX, baseY, null, newHeight)
//         centralGroundX += width
//         i++;
//     }
//     let rightGroundX = centralGroundX
//     drawImage(rightGround, rightGroundX, baseY, null, newHeight)
// }
// let Frame = 0
// let baseSpriteCostumeNum = 0
// let k = 180
// let xCor = 100
// let upX = true
// const drawMenuSprite = () => {
//     Frame += 1
//     const svgImages = [
//         {
//             "src": '../../imgs/base.png',
//             "x_cor": 0,
//             "y_cor": 0
//         },
//         {
//             "src": '../../imgs/rotate_1.png',
//             "x_cor": 0,
//             "y_cor": 0
//         },
//         {
//             "src": '../../imgs/rotate_2.png',
//             "x_cor": 0,
//             "y_cor": 0
//         },
//         {
//             "src": '../../imgs/rotate_3.png',
//             "x_cor": 0,
//             "y_cor": 0
//         },
//         {
//             "src": '../../imgs/rotate_4.png',
//             "x_cor": 0,
//             "y_cor": 0
//         },
//         {
//             "src": '../../imgs/rotate_5.png',
//             "x_cor": 0,
//             "y_cor": 0
//         },
//         {
//             "src": '../../imgs/rotate_6.png',
//             "x_cor": 0,
//             "y_cor": 0
//         },
//         {
//             "src": '../../imgs/rotate_7.png',
//             "x_cor": 0,
//             "y_cor": 0
//         },
//     ]
//     let imgScale = 10
//     baseSpriteCostumeNum = Math.round(Frame / k)
//     if (baseSpriteCostumeNum === svgImages.length - 1) {
//         upX = !upX
//         Frame = 0
//     } else {
//         baseSpriteCostumeNum += 1
//     }
//     let spriteCostume = svgImages[baseSpriteCostumeNum]
//     let spriteImg = resources.get(spriteCostume.src)
//     drawImage(spriteImg, xCor+ spriteCostume.x_cor, 1700+ spriteCostume.y_cor, spriteImg.width*imgScale)
//     if (!!upX) {
//         xCor += 0.5
//     } else {
//         xCor -= 0.5
//     }
//
//
//
// }
//
// function drawMenu() {
//     // TODO добавить комменты, ничего не понятно)
//     drawGround()
//     drawMenuSprite()
//     for (var sprit in sprites) {
//         // console.log(sprites[sprit])
//         sprites[sprit].start()
//         //... p will be "2", "1" and "0" on IE
//     }
// }
//
// const deleteImage = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
//
//
// function main() {
//     deleteImage()
//     var now = Date.now();
//     var dt = (now - lastTime) / 1000.0;
//     // sprite.xPos +=1
//     drawMenu()
//     // update(dt);
//     // render();
//     lastTime = now;
//
//     // requestAnimationFrame(main);
//
// }
//
// resources.load([
//     '../../imgs/ground_bg.svg',
//     '../../imgs/ground_left.svg',
//     '../../imgs/ground_right.svg',
//     '../../imgs/base.png',
//     '../../imgs/rotate_1.png',
//     '../../imgs/rotate_2.png',
//     '../../imgs/rotate_3.png',
//     '../../imgs/rotate_4.png',
//     '../../imgs/rotate_5.png',
//     '../../imgs/rotate_6.png',
//     '../../imgs/rotate_7.png',
// ]);
//
// window.onload = function () {
//     init();
// };
//
//
//
//
//
//
