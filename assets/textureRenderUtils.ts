const {ccclass, property} = cc._decorator;
@ccclass
export default class textureRenderUtils extends cc.Component {
    @property(cc.Camera)
    camera: cc.Camera = null; 

    _canvas=null;

    @property(cc.Node)

    captureNode:cc.Node=null;

    texture=null;

    _cb=null; 
    init () {  
        this.texture= new cc.RenderTexture();
        let gl = cc.game._renderContext;
        this.texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        this.camera.targetTexture = this.texture;
    }
    // create the img element
    createImg () {
        // return the type and dataUrl
        var dataURL = this._canvas.toDataURL("image/png");
        var img = document.createElement("img");
        img.src = dataURL;
        return img;
    }
    // create the canvas and context, filpY the image Data
    createCanvas (_cb) {
        this._cb = _cb; 
        let width = this.texture.width;
        let height = this.texture.height;
        if (!this._canvas) {
            this._canvas = document.createElement('canvas');

            this._canvas.width = width;
            this._canvas.height = height;
        }
        else {
            this.clearCanvas();
        }
        let ctx = this._canvas.getContext('2d');
        this.camera.render( this.captureNode);
        let data = this.texture.readPixels();
        // write the render data
        let rowBytes = width * 4; 
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }
        return this._canvas;
    }
    
    // show on the canvas
    showImage (img) {
        let texture = new cc.Texture2D();
        texture.initWithElement(img);

        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);

        let node = new cc.Node();
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;

        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        // set position
        let width = cc.winSize.width;
        let height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, () => {
            node.parent = null;
            this.label.string = '';
            node.destroy();
        });

        this.captureAction(node, width, height);
    }
    // sprite action
    captureAction (capture, width, height) {
        let scaleAction = cc.scaleTo(1,0.3);
        let targetPos = cc.v2(width - width / 6,  height / 4);
        let moveAction = cc.moveTo(1, targetPos); 
        let spawn = cc.spawn(scaleAction, moveAction);
        capture.runAction(spawn);
        let blinkAction = cc.blink(0.1, 1);
        // scene action
        this.node.runAction(blinkAction);
    }

    clearCanvas () {
        let ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}
