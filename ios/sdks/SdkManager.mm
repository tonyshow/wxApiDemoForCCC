#import "SdkManager.h"
#import "wechat/WXShare.h"

// 此行代码不能随意改动，涉及到打包工具的字符串匹配
//#import "JXPApi.h"
#import "CommonCrypto/CommonDigest.h"
@implementation SdkManager

SingletonM(Instance);

- (id) init
{
    if(self=[super init])
    {
        _isSharing = NO;
        [[NSNotificationCenter defaultCenter] addObserver:self    selector:@selector(applicationDidBecomeActive:) name:@"UIApplicationDidBecomeActiveNotification" object:nil];
    }
    return self;
}

- (void) applicationDidBecomeActive:(NSNotification *) notification {
    if (_isSharing)
    {
//        _listener=  IosCallLuaFunction(_listener, -7, "wxshare", "", true);
        _isSharing = NO;
    }
}

-(void) dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [super dealloc];
}

- (BOOL) doOpenWX:(NSDictionary*)dict
{
    WXShare::getInstance()->registerApp([[dict objectForKey:@"appid"] UTF8String]);
   return [WXApi openWXApp];
}
-(BOOL) handleOpenUrl:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return  [WXApi handleOpenURL:url delegate:self];

}
- (NSDictionary*) doWXSNSApiAuthReq:(NSDictionary*)dict
{
    _listener=[[dict objectForKey:@"listener"] intValue];
    NSString* appid =[dict objectForKey:@"appid"];
    WXShare::getInstance()->registerApp([appid UTF8String]);
    if (![WXApi isWXAppInstalled]) {
//        _listener=  IosCallLuaFunction(_listener, -6,"wxauth",[[WXApi getWXAppInstallUrl] UTF8String], true   );
    }else{

        NSString* state =[dict objectForKey:@"state"];
        WXShare::getInstance()->sendUserInfoAuthRequest([appid UTF8String],[state UTF8String]);
    }
    return [NSDictionary dictionaryWithObjectsAndKeys:@"call snsapi_userinfo success", @"msg",
            [NSNumber numberWithInt:0], @"status", nil];;
}

- (NSDictionary*) doShareToWX:(NSDictionary*)dict
{
    _listener=[[dict objectForKey:@"listener"] intValue];
    NSString* appid =[dict objectForKey:@"appid"];
    WXShare::getInstance()->registerApp([appid UTF8String]);
    if (![WXApi isWXAppInstalled]) {
//        _listener= IosCallLuaFunction(_listener, -6,"wxshare",[[WXApi getWXAppInstallUrl] UTF8String], true  );
    }else{
        _isSharing = YES;
        NSString* sharetype =[dict objectForKey:@"sharetype"];

        int scene=[[dict objectForKey:@"wxscene"] intValue];
        if ([sharetype isEqualToString:@"web"]){
            WXShare::getInstance()->shareWebType([[dict objectForKey:@"title"] UTF8String], [[dict objectForKey:@"imgurl"] UTF8String], [[dict objectForKey:@"weburl"] UTF8String],scene, [[dict objectForKey:@"desc"] UTF8String]);
        }else if ([sharetype isEqualToString:@"appweb"]){
             WXShare::getInstance()->shareAppWebType([[dict objectForKey:@"title"] UTF8String],[[dict objectForKey:@"desc"] UTF8String],[[dict objectForKey:@"weburl"] UTF8String],scene);
        }else if ([sharetype isEqualToString:@"text"]){
             WXShare::getInstance()->shareTextType([[dict objectForKey:@"text"] UTF8String],scene);
        }else if ([sharetype isEqualToString:@"image"]){
             WXShare::getInstance()->shareImageType([[dict objectForKey:@"imgpath"] UTF8String],scene);
        }
    }
    return [NSDictionary dictionaryWithObjectsAndKeys:@"call share success", @"msg",
            [NSNumber numberWithInt:0], @"status", nil];;
}

- (NSString*)md5HexDigest:(NSString*)input {
    const char* str = [input UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(str, strlen(str), result);
    
    NSMutableString *ret = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH*2];
    for(int i = 0; i<CC_MD5_DIGEST_LENGTH; i++) {
        [ret appendFormat:@"%02x",result[i]];
    }
    return ret;
}

-(void) showOkayAlert:(NSString *)content
{
    UIWindow * view =[UIApplication sharedApplication].keyWindow ;
    NSString *okTitle = NSLocalizedString(@"确定", nil);
    
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"提示" message:content preferredStyle: UIAlertControllerStyleAlert];
    
    UIAlertAction *okAction = [UIAlertAction actionWithTitle:okTitle style:UIAlertActionStyleDefault handler:^(UIAlertAction* _Nonnull action) { }];

    [alertController addAction:okAction];
    
    [view.rootViewController presentViewController:alertController animated:YES completion:nil];
}

-(void) onResp:(BaseResp*)resp
{
    if ([resp isKindOfClass:[SendMessageToWXResp class]]){
        _isSharing = NO;
        WXShare::getInstance()->onShareResp(resp.errCode);
//        _listener=  IosCallLuaFunction(_listener, resp.errCode,"wxshare","", true   );
        
    }else if([resp isKindOfClass:[SendAuthResp class]]){
         WXShare::getInstance()->onAuthResp(resp.errCode);
         SendAuthResp *temp = (SendAuthResp *)resp;
//         _listener=  IosCallLuaFunction(_listener, resp.errCode,"wxauth",[temp.code UTF8String], true   );
    }
}
@end
