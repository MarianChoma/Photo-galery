const app = new PIXI.Application({ backgroundColor: 0x2c8da8 });
document.body.appendChild(app.view);

const texture = PIXI.Texture.from('../pictures/kaciatko.png');

for (let i = 0; i < 10; i++) {
    createDuck(
        Math.floor(Math.random() * app.screen.width),
        Math.floor(Math.random() * app.screen.height),
    );
}

function createDuck(x, y) {

    const duck = new PIXI.Sprite(texture);

    duck.interactive = true;

    duck.buttonMode = true;

    duck.anchor.set(0.5);

    duck.scale.set(0.25);


    duck
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

    duck.x = x;
    duck.y = y;


    app.stage.addChild(duck);
}

app.view.style.marginLeft="25%";
app.view.style.marginRight="25%";

function onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
}

function onDragEnd() {
    this.dragging = false;
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}
