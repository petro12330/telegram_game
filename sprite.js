export class Sprite {
    constructor(options) {
        this.ctx = options.ctx;
        this.bufferCtx = options.bufferCtx;
        this.image = options.image;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;
        console.log(1)
        this.imgScale = options.imgScale || 1
        this.width = options.width || this.image.width;
        this.height = options.height || this.image.height;
        this.changeImg(options)

        this.xPos = options.xPos || 0
        this.yPos = options.yPos || 0
        this.n = 0
        this.isChanged = true
    }

    changeImg(options) {
        if (this.image.src !== options.image.src){
            console.log(this.image.src)
            console.log(options.image.src)
            this.image = options.image;
            this.frameIndex = 0;
            this.tickCount = 0;
            this.ticksPerFrame = options.ticksPerFrame || 0;
            this.numberOfFrames = options.numberOfFrames || 1;

            this.imgScale = options.imgScale || 1
            this.width = options.width || this.image.width;
            this.height = options.height || this.image.height;
        }
    }

    getRealWidth() {
        return this.width * this.imgScale / this.numberOfFrames
    }

    getRealHeight() {
        return this.height * this.imgScale

    }

    getCostume() {
        return this.width / this.numberOfFrames
    }

    changeCor({newX = 0, newY = 0, changeX = 0, changeY = 0}) {
        if (this.n !== 10){
            this.n +=1
        } else {
            if (newX || newY) {
                this.xPos = newX
                this.yPos = newY
                this.isChanged = true
            } else if (changeX || changeY) {
                this.xPos += changeX
                this.yPos += changeY
                this.isChanged = true
            }
            this.n = 0
        }
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
                this.isChanged = true
            } else {
                this.frameIndex = 0;
                this.isChanged = true
            }
        }
    }

    render() {
        this.bufferCtx.save()
        this.bufferCtx.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.getCostume(),
            this.height,
            this.xPos,
            this.yPos,
            this.getRealWidth(),
            this.getRealHeight()
        )
        this.bufferCtx.restore()
    }

    start() {
        this.update();
        this.render();
    }
}
