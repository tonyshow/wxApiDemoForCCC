window.__require = function e(t, r, i) {
function n(a, o) {
if (!r[a]) {
if (!t[a]) {
var s = a.split("/");
s = s[s.length - 1];
if (!t[s]) {
var p = "function" == typeof __require && __require;
if (!o && p) return p(s, !0);
if (c) return c(s, !0);
throw new Error("Cannot find module '" + a + "'");
}
}
var u = r[a] = {
exports: {}
};
t[a][0].call(u.exports, function(e) {
return n(t[a][1][e] || e);
}, u, u.exports, e, t, r, i);
}
return r[a].exports;
}
for (var c = "function" == typeof __require && __require, a = 0; a < i.length; a++) n(i[a]);
return n;
}({
capture_to_native: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "dd7a4PaRl1Geat4yxnf2lAf", "capture_to_native");
Object.defineProperty(r, "__esModule", {
value: !0
});
var i = e("./textureRenderUtils"), n = cc._decorator, c = n.ccclass, a = (n.property, 
function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._width = 0;
t._height = 0;
return t;
}
t.prototype.initImage = function() {
var e = this.texture.readPixels();
this._width = this.texture.width;
this._height = this.texture.height;
return this.filpYImage(e, this._width, this._height);
};
t.prototype.createCanvas = function(t) {
this.init();
var r = this.initImage(), i = new cc.Texture2D();
i.initWithData(r, 32, this._width, this._height);
e.prototype.createCanvas.call(this, t);
var n = new cc.SpriteFrame();
n.setTexture(i);
var c = new cc.Node();
c.addComponent(cc.Sprite).spriteFrame = n;
c.zIndex = cc.macro.MAX_ZINDEX;
c.parent = cc.director.getScene();
var a = cc.winSize.width, o = cc.winSize.height;
c.x = a / 2;
c.y = o / 2;
c.on(cc.Node.EventType.TOUCH_START, function() {
c.parent = null;
c.destroy();
});
this.saveFile(r);
};
t.prototype.saveFile = function(e) {
var t = jsb.fileUtils.getWritablePath() + "render_to_sprite_image.png";
jsb.saveImageData(e, this._width, this._height, t) ? cc.log("save image data success, file: " + t) : cc.error("save image data failed!");
};
t.prototype.filpYImage = function(e, t, r) {
for (var i = new Uint8Array(t * r * 4), n = 4 * t, c = 0; c < r; c++) for (var a = (r - 1 - c) * t * 4, o = c * t * 4, s = 0; s < n; s++) i[o + s] = e[a + s];
return i;
};
return t = __decorate([ c ], t);
}(i.default));
r.default = a;
cc._RF.pop();
}, {
"./textureRenderUtils": "textureRenderUtils"
} ],
test: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "4fefafsDIBI16JwB2b/4m++", "test");
Object.defineProperty(r, "__esModule", {
value: !0
});
var i = e("./capture_to_native"), n = cc._decorator, c = n.ccclass, a = (n.property, 
function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._capture_to_native = null;
t.width = 0;
t.height = 0;
t._isCapturing = !1;
return t;
}
t.prototype.start = function() {
this._capture_to_native = this.getComponent(i.default);
};
t.prototype.getWxInfo = function() {
return JSON.stringify({
appid: this.getAppId()
});
};
t.prototype.getAppId = function() {
return "wx62cba1063e8c236b";
};
t.prototype.eveOpenWx = function() {
var e = jsb.reflection.callStaticMethod("AppController", "doOpenWX:", this.getWxInfo());
console.error(e);
};
t.prototype.eveLoginWx = function() {
var e = jsb.reflection.callStaticMethod("AppController", "doWXAuthReq:", this.getWxInfo());
console.error(e);
};
t.prototype.eveShareWx1 = function() {
var e = jsb.reflection.callStaticMethod("AppController", "doShareToWX:", JSON.stringify({
sharetype: "web",
title: "这是标题",
desc: "这是描述信息",
imgurl: "http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%B0%8F%E6%B8%85%E6%96%B0%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=undefined&latest=undefined&copyright=undefined&cs=1528932777,3482992641&os=2359446705,4222813026&simid=4215470487,655604134&pn=8&rn=1&di=123970&ln=3034&fr=&fmq=1567310537195_R&fm=rs4&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&oriquery=%E5%9B%BE%E7%89%87%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fs9.sinaimg.cn%2Fmw690%2F0021szcogy6UgwRbyrK38%26690&rpstart=0&rpnum=0&adpicid=0&force=undefined",
weburl: "https://www.cnblogs.com/mancong/p/5807924.html",
wxscene: 1,
appid: this.getAppId()
}));
console.error(e);
};
t.prototype.eveShareWx2 = function() {
var e = jsb.reflection.callStaticMethod("AppController", "doShareToWX:", JSON.stringify({
sharetype: "appweb",
title: "这是标题",
desc: "这是描述信息",
weburl: "https://www.cnblogs.com/mancong/p/5807924.html",
wxscene: 1,
appid: this.getAppId()
}));
console.error(e);
};
t.prototype.eveShareWx3 = function() {
var e = jsb.reflection.callStaticMethod("AppController", "doShareToWX:", JSON.stringify({
sharetype: "text",
text: "text , text",
wxscene: 1,
appid: this.getAppId()
}));
console.error(e);
};
t.prototype.eveShareWx4 = function() {
var e = jsb.reflection.callStaticMethod("AppController", "doShareToWX:", JSON.stringify({
sharetype: "image",
imgType: "imgurl",
imageInfo: "http://img1.ph.126.net/CY4vmclHMPpeB7oPRIx6RQ==/2740721848249581208.jpg",
wxscene: 1,
appid: this.getAppId()
}));
console.error(e);
};
t.prototype.eveShareWx5 = function() {
var e = this;
this._capture_to_native.createCanvas(function(t) {
var r = jsb.reflection.callStaticMethod("AppController", "doShareToWX:", JSON.stringify({
sharetype: "image",
imgType: "imgpath",
imageInfo: t,
wxscene: 1,
appid: e.getAppId()
}));
console.error(r);
});
};
return t = __decorate([ c ], t);
}(cc.Component));
r.default = a;
cc._RF.pop();
}, {
"./capture_to_native": "capture_to_native"
} ],
textureRenderUtils: [ function(e, t, r) {
"use strict";
cc._RF.push(t, "46635Pw97JD+pb6OFo85GHB", "textureRenderUtils");
Object.defineProperty(r, "__esModule", {
value: !0
});
var i = cc._decorator, n = i.ccclass, c = i.property, a = function(e) {
__extends(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.camera = null;
t._canvas = null;
t.captureNode = null;
t.texture = null;
t._cb = null;
return t;
}
t.prototype.init = function() {
this.texture = new cc.RenderTexture();
var e = cc.game._renderContext;
this.texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, e.STENCIL_INDEX8);
this.camera.targetTexture = this.texture;
};
t.prototype.createImg = function() {
var e = this._canvas.toDataURL("image/png"), t = document.createElement("img");
t.src = e;
return t;
};
t.prototype.createCanvas = function(e) {
this._cb = e;
var t = this.texture.width, r = this.texture.height;
if (this._canvas) this.clearCanvas(); else {
this._canvas = document.createElement("canvas");
this._canvas.width = t;
this._canvas.height = r;
}
var i = this._canvas.getContext("2d");
this.camera.render(this.captureNode);
for (var n = this.texture.readPixels(), c = 4 * t, a = 0; a < r; a++) {
for (var o = r - 1 - a, s = i.createImageData(t, 1), p = o * t * 4, u = 0; u < c; u++) s.data[u] = n[p + u];
i.putImageData(s, 0, a);
}
return this._canvas;
};
t.prototype.showImage = function(e) {
var t = this, r = new cc.Texture2D();
r.initWithElement(e);
var i = new cc.SpriteFrame();
i.setTexture(r);
var n = new cc.Node();
n.addComponent(cc.Sprite).spriteFrame = i;
n.zIndex = cc.macro.MAX_ZINDEX;
n.parent = cc.director.getScene();
var c = cc.winSize.width, a = cc.winSize.height;
n.x = c / 2;
n.y = a / 2;
n.on(cc.Node.EventType.TOUCH_START, function() {
n.parent = null;
t.label.string = "";
n.destroy();
});
this.captureAction(n, c, a);
};
t.prototype.captureAction = function(e, t, r) {
var i = cc.scaleTo(1, .3), n = cc.v2(t - t / 6, r / 4), c = cc.moveTo(1, n), a = cc.spawn(i, c);
e.runAction(a);
var o = cc.blink(.1, 1);
this.node.runAction(o);
};
t.prototype.clearCanvas = function() {
this._canvas.getContext("2d").clearRect(0, 0, this._canvas.width, this._canvas.height);
};
__decorate([ c(cc.Camera) ], t.prototype, "camera", void 0);
__decorate([ c(cc.Node) ], t.prototype, "captureNode", void 0);
return t = __decorate([ n ], t);
}(cc.Component);
r.default = a;
cc._RF.pop();
}, {} ]
}, {}, [ "capture_to_native", "test", "textureRenderUtils" ]);