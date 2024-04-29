class Ship extends PIXI.Sprite {
    constructor(x = 0, y = 0) {
        super(app.loader.resources["images/spaceship.png"].texture);
        // Position, scaling, rotating etc are now from center of sprite.
        this.anchor.set(.5, .5);
        this.scale.set(0.1);
        this.x = x;
        this.y = y;
    }
}