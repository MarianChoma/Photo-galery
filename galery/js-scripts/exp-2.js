const app = new PIXI.Application();
document.body.appendChild(app.view);


const radius = 50;

const blurSize = 32;

app.loader.add('panda', '../pictures/panda.jpg');
app.loader.load(setup);

app.view.style.marginLeft="25%";
app.view.style.marginRight="25%";

function setup(loader, resources) {
    const background = new PIXI.Sprite(resources.panda.texture);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    const circle = new PIXI.Graphics()
        .beginFill(0xFF0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill();

    circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

    const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = app.renderer.generateTexture(circle, 1, 1, bounds);
    const focus = new PIXI.Sprite(texture);

    app.stage.addChild(focus);
    background.mask = focus;
    app.stage.interactive = true;
    app.stage.on('mousemove', pointerMove);

    function pointerMove(event) {
        focus.position.x = event.data.global.x - focus.width / 2;
        focus.position.y = event.data.global.y - focus.height / 2;
        if((focus.position.x >= 610 - focus.width / 2 && focus.position.x <= 620 - focus.width / 2)&&
            (focus.position.y >= 290 - focus.height / 2 && focus.position.y <= 310 - focus.height / 2)){
            document.getElementById("win").innerHTML="Našiel si pandu";
            app.stop();
        }
    }
}