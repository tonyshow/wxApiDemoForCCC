#import <Foundation/Foundation.h>
#import "SdkDefine.h"
#import "wechat/WXApi.h"
@interface SdkManager : NSObject<WXApiDelegate>
{
    int _listener;
    BOOL _isSharing;
}

SingletonH(Instance);

- (BOOL) doOpenWX:(NSDictionary*)dict;

- (NSDictionary*) doShareToWX:(NSDictionary*)dict;

- (NSDictionary*) doWXSNSApiAuthReq:(NSDictionary*)dict;

-(BOOL) handleOpenUrl:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options;

-(void) showOkayAlert:(NSString*) content;
@end

