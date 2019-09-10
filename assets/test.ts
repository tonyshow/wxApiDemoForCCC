import capture_to_native from "./capture_to_native";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class test extends cc.Component {

    // @property(capture_to_native)
    _capture_to_native: capture_to_native = null; 

    width=0;
    height=0;
    _isCapturing=false;
    start(){
        this._capture_to_native = this.getComponent(capture_to_native);
    }
    /**  
    listener://函数
    appid:   //微信开发者id
    sharetype:  web、appweb、text、image//分享类型
    wxscene://0:聊天界面    1:朋友圈     2:收藏      3:指定联系人 
    web:
    title://超级vip
    imgurl://图片地址
    weburl://网页地址
    appweb://
    desc://描述
    text://文本
    image://图片
    imgpath://图片路径

    分享方式1、web需要：title、imgurl、weburl、desc
     */
    getWxInfo(){
        return JSON.stringify( {appid:this.getAppId()});
    }

    getAppId(){
        return "自己的微信appid";
    }
    eveOpenWx(){  
        let resultInfo = jsb.reflection.callStaticMethod("AppController", "doOpenWX:", this.getWxInfo());
        console.error(resultInfo);
    } 
    eveLoginWx(){
        let resultInfo =  jsb.reflection.callStaticMethod("AppController", "doWXAuthReq:", this.getWxInfo());
        console.error(resultInfo);
    }

    // 分享方式1、web需要：title、imgurl、weburl、desc
    eveShareWx1(){
        let resultInfo =  jsb.reflection.callStaticMethod("AppController", "doShareToWX:",JSON.stringify({
            sharetype:"web",
            title:'这是标题',
            desc:'这是描述信息',
            imgurl:'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%B0%8F%E6%B8%85%E6%96%B0%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=undefined&latest=undefined&copyright=undefined&cs=1528932777,3482992641&os=2359446705,4222813026&simid=4215470487,655604134&pn=8&rn=1&di=123970&ln=3034&fr=&fmq=1567310537195_R&fm=rs4&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&oriquery=%E5%9B%BE%E7%89%87%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fs9.sinaimg.cn%2Fmw690%2F0021szcogy6UgwRbyrK38%26690&rpstart=0&rpnum=0&adpicid=0&force=undefined',
            weburl:'https://www.cnblogs.com/mancong/p/5807924.html',
            wxscene:1,
            appid:this.getAppId()
        }));
        console.error(resultInfo);
    }

    // 分享方式2、appweb
    eveShareWx2(){
        let resultInfo =  jsb.reflection.callStaticMethod("AppController", "doShareToWX:",JSON.stringify({
            sharetype:"appweb",
            title:'这是标题',
            desc:'这是描述信息',
            weburl:'https://www.cnblogs.com/mancong/p/5807924.html',
            wxscene:1,
            appid:this.getAppId()
        }));
        console.error(resultInfo);
    }

    // 分享方式3、text
    eveShareWx3(){
        let resultInfo =  jsb.reflection.callStaticMethod("AppController", "doShareToWX:",JSON.stringify({
            sharetype:"text", 
            text:'text , text', 
            wxscene:1,
            appid:this.getAppId()
        }));
        console.error(resultInfo);
    }

    // 分享方式4、image
    eveShareWx4(){
        let resultInfo =  jsb.reflection.callStaticMethod("AppController", "doShareToWX:",JSON.stringify({
            sharetype:"image",  
            imgType:"imgurl",//imgurl，imgpath二选一 
            imageInfo:'http://img1.ph.126.net/CY4vmclHMPpeB7oPRIx6RQ==/2740721848249581208.jpg',
            wxscene:1,
            appid:this.getAppId()
        }));
        console.error(resultInfo);
    }

    // 分享方式5、image
    eveShareWx5(){  
        this._capture_to_native.createCanvas( (_path)=>{ 
            let resultInfo =  jsb.reflection.callStaticMethod("AppController", "doShareToWX:",JSON.stringify({
                sharetype:"image",  
                imgType:"imgpath",//imgurl，imgpath二选一 
                imageInfo:_path,
                wxscene:1,
                appid:this.getAppId()
            }));
            console.error(resultInfo);
        });
    } 
}