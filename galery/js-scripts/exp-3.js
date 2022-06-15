// for this example you have to use mouse or touchscreen
const app = new PIXI.Application();
document.body.appendChild(app.view);


const brush = new PIXI.Graphics();
brush.beginFill(0xffffff);
brush.drawCircle(0, 0, 50);
brush.endFill();

app.loader.add('t1', '../pictures/pozadie.jpg');
app.loader.add('t2', '../pictures/vrch.jpg');
app.loader.load(setup);

app.view.style.marginLeft="25%";
app.view.style.marginRight="25%";

function setup(loader, resources) {
    const background = new PIXI.Sprite(resources.t1.texture);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    const imageToReveal = new PIXI.Sprite(resources.t2.texture);
    app.stage.addChild(imageToReveal);
    imageToReveal.width = app.screen.width;
    imageToReveal.height = app.screen.height;

    const renderTexture = PIXI.RenderTexture.create(app.screen.width, app.screen.height);

    const renderTextureSprite = new PIXI.Sprite(renderTexture);
    app.stage.addChild(renderTextureSprite);
    imageToReveal.mask = renderTextureSprite;

    app.stage.interactive = true;
    app.stage.on('pointerdown', pointerDown);
    app.stage.on('pointerup', pointerUp);
    app.stage.on('pointermove', pointerMove);

    let dragging = false;

    function pointerMove(event) {
        if (dragging) {
            brush.position.copyFrom(event.data.global);
            app.renderer.render(brush, renderTexture,  null);
        }
    }

    function pointerDown(event) {
        dragging = true;
        pointerMove(event);
    }

    function pointerUp(event) {
        dragging = false;
    }
}