//  SdkDefine.h
//  Created by apple_lee on 2016/10/25.
//  Copyright © 2016年 apple_lee. All rights reserved.
//
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "SingleDef.h"

//支付状态枚举
typedef enum _PayResult
{
    kPaySuccess=0,  //支付成功
    kPayFailed=1,   //支付失败
    kPayCancel=2,   //支付取消
    kPayChecking=3  //结果确认中
    
}PayResult;


@protocol PayDelegate
- (void)startPay:(NSDictionary*)dict;
@end

