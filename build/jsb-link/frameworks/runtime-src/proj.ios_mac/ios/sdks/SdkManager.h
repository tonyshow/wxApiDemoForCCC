#import <Foundation/Foundation.h>
#import "SdkDefine.h"
#import "wechat/WXApi.h"
@interface SdkManager : NSObject<WXApiDelegate>
{
    int _listener;
    BOOL _isSharing;
}

SingletonH(Instance);

- (BOOL) doOpenWX:(NSString*)jsonString;

- (NSDictionary*) doShareToWX:(NSString*)jsonString;

- (NSDictionary*) doWXSNSApiAuthReq:(NSString*)jsonString;

-(BOOL) handleOpenUrl:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options;

-(void) showOkayAlert:(NSString*) content;
@end

