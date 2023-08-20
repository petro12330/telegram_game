export class Sprite {
    constructor(options) {
        this.ctx = options.ctx;

        this.image = options.image;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;

        this.imgScale = options.imgScale || 1
        this.width = options.width;
        this.height = options.height;

        this.xPos = options.xPos || 0
        this.yPos = options.yPos || 0

    }
    clearRect() {
        this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height)
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        // this.ctx.clearRect(0, 0, 1000, 1000)

        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            this.xPos,
            this.yPos,
            this.width * this.imgScale / this.numberOfFrames,
            this.height * this.imgScale
        )
    }

    start() {
        this.update();
        this.render();
    }
}
