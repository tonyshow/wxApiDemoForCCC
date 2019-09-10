#import "WXShare.h"
#include <string>
#import "WXApi.h"
//#import "platform/ios/IosHelper.h"

@implementation WXApi(Category)

+(void) SendWebTypeMessage:(NSString*)title desc:(NSString*) desc icon:(UIImage *)icon weburl:(NSString *)weburl scene:(WXScene) scene
{
    WXMediaMessage *message = [WXMediaMessage message];
    message.title = title;
    if (desc) {
        message.description =desc;
    }
    [message setThumbImage:icon];
    WXWebpageObject *ext = [WXWebpageObject object];
    ext.webpageUrl = weburl;
    message.mediaObject = ext;
    SendMessageToWXReq* req = [[[SendMessageToWXReq alloc] init]autorelease];
    req.bText = NO;
    req.message = message;
    //0 朋友 1 朋友圈
    req.scene =scene;
    [WXApi sendReq:req];

}
@end

WXShare * WXShare::s_instance=nullptr;

WXShare* WXShare::getInstance( void )
{
    if (!s_instance)
    {
        s_instance = new WXShare;
    }
    return s_instance;
}

WXShare::WXShare()
:nHandler(0)
{
    static CGarbo m_Garbo;
};

WXShare::~WXShare()
{}

bool WXShare::registerApp(const char* appid,const char* desc)
{
    static std::string s_appid;
    bool bret=true;
    if (appid && s_appid!=std::string(appid)) {
        s_appid=appid;
       bret= [WXApi registerApp:[NSString stringWithUTF8String:appid]];
        
       NSLog(@"current wechat sdk version : %@",[WXApi getApiVersion]);
        
    }
    return bret;
}

void WXShare::shareWebType(const char * title,const char* imgurl,const char* weburl,int wxscene,const char* desc, const char* appid )
{
    if (this->registerApp(appid)) {
        NSData* p = [NSData dataWithContentsOfURL:[NSURL URLWithString:[NSString stringWithUTF8String:imgurl]]];
        UIImage* pImg = [UIImage imageWithData:p];
        NSString *cdesc=@"";
        if (desc) {
            cdesc= [NSString stringWithUTF8String:desc];
        }
        [WXApi SendWebTypeMessage:[NSString stringWithUTF8String:title]
                           desc:cdesc
                           icon:pImg
                         weburl:[NSString stringWithUTF8String:weburl]
                          scene:(WXScene)wxscene
         ];
    }
}
void WXShare::shareAppWebType(const char * title,const char* desc,const char* weburl,int wxscene, const char* appid ){
    if (this->registerApp(appid)) {
        NSDictionary *infoPlist = [[NSBundle mainBundle] infoDictionary];
        NSString *icon = [[infoPlist valueForKeyPath:@"CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles"] lastObject];
        [WXApi SendWebTypeMessage:[NSString stringWithUTF8String:title]
                             desc: desc ? [NSString stringWithUTF8String:desc]:nil
                             icon:[UIImage imageNamed:icon]
                           weburl:[NSString stringWithUTF8String:weburl]
                            scene:(WXScene)wxscene
         ];
    }
}

void WXShare::shareImageType(const char * imgpath,int wxscene, const char* appid )
{
    if(this->registerApp(appid)){
        WXMediaMessage *message = [WXMediaMessage message];
        message.title =  [NSString stringWithUTF8String:""];
        message.description = [NSString stringWithUTF8String:""];
        WXImageObject *ext = [WXImageObject object];
        NSString *filePath = [NSString stringWithUTF8String:imgpath];
        ext.imageData = [NSData dataWithContentsOfFile:filePath];
        UIImage* image = [UIImage imageWithData:ext.imageData];
       // NSData *compressData = nil;
        //compressData = UIImageJPEGRepresentation(image, 0.1);
       // UIImage *thumbimage = [UIImage imageWithData:compressData];
        float scale=300.0f/image.size.width;
   
//        [message setThumbImage:[IosHelper thumbnailWithImageWithoutScale:image size:CGSizeMake(300, scale*image.size.height)]];
        ext.imageData = UIImagePNGRepresentation(image);
        message.mediaObject = ext;
        SendMessageToWXReq* req = [[[SendMessageToWXReq alloc] init]autorelease];
        req.bText = NO;
        req.message = message;
        req.scene = (WXScene) wxscene;;
        [WXApi sendReq:req];
    }
    
}
//文本类型分享
void WXShare::shareTextType(const char * text,int wxscene, const char* appid ){
    if(this->registerApp(appid)){
        SendMessageToWXReq* req = [[[SendMessageToWXReq alloc] init]autorelease];
        req.text = [NSString stringWithUTF8String:text];
        req.bText = YES;
        req.scene = (WXScene) wxscene;
        WXMediaMessage* msg = [WXMediaMessage message];
        req.message = msg;
        [WXApi sendReq:req];
    }
}
//用户信息授权请求
void WXShare::sendUserInfoAuthRequest(const char* appid,const char* state)
{
    if(appid &&this->registerApp(appid)){
        SendAuthReq * req = [[[SendAuthReq alloc ] init ] autorelease ];
        req.scope = @"snsapi_userinfo";
        if (state) {
            req.state = [NSString stringWithUTF8String:state];
        }
        [WXApi sendReq:req];
    }
}

void WXShare::jumpToWXOfficalAccount(const char* usrname,const char* appid )
{
    if(this->registerApp(appid)){
        JumpToBizWebviewReq *req = [[[JumpToBizWebviewReq alloc] init]autorelease];
        req.tousrname = [NSString stringWithUTF8String:usrname];;
        [WXApi sendReq:req];
    }
}

void WXShare::onShareResp(int errcode)
{
    switch (errcode) {
        case WXSuccess://分享成功

            break;
        case WXErrCodeUserCancel:
            
            break;
        default:
        
            break;
    }
}

void WXShare::onAuthResp(int errcode)
{
    switch (errcode) {
        case WXSuccess://分享成功
            
            break;
        case WXErrCodeUserCancel:
            
            break;
        case WXErrCodeAuthDeny:
            
            break;
        default:
            
            break;
    }
}
