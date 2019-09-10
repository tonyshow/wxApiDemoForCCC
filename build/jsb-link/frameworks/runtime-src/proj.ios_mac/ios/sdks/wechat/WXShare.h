//sdk share
//  Created by apple_lee on 2016/12/29.

#import "../SdkDefine.h"

class WXShare{
public:
    WXShare();
    ~WXShare();
    
    static WXShare *getInstance(void);
    
    bool registerApp(const char* appid,const char* desc="wxshare");
    // 1 默认朋友圈 0 分享给好友  分享网页标题 icon 网址
    //网页类型分享
    void shareWebType(const char * title,const char* imgurl,const char* weburl ,int wxscene=1,const char* desc=nullptr, const char* appid=nullptr);
  
    void shareAppWebType(const char * title,const char* desc,const char* weburl  ,int wxscene=1, const char* appid=nullptr);
    //图片类型分享
    void shareImageType(const char * imgType,const char * imageInfo,int wxscene=1, const char* appid =nullptr );
    //文本类型分享
    void shareTextType(const char * text  ,int wxscene=1, const char* appid=nullptr);
    
    void sendUserInfoAuthRequest(const char* appid=nullptr,const char* state=nullptr);
    
    void jumpToWXOfficalAccount( const char* usrname,const char* appid=nullptr );
   
    void onShareResp(int errcode);
   
    void onAuthResp(int errcode);
    //set lua callback Handler
    void setCallbackHandler(int handler) { nHandler=handler; };
private:
    int nHandler;
    static WXShare * s_instance;
    class CGarbo
    {
    public:
        ~CGarbo()
        {
            if (s_instance) {
                delete s_instance;
                s_instance=nullptr;
            }
            
        }
    };
};
