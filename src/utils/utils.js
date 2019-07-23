export default {
    settingAuth(authName, authCode, callback){
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting[`scope.${authCode}`]) {
                    wx.authorize({
                        scope: `scope.${authCode}`,
                        success: () => {
                            callback && callback();
                        },
                        fail: () => {
                            wx.showModal({
                                title: '授权提示',
                                content: `请点击“去设置”并勾选${authName}功能, 然后去确定即可正常使用`,
                                confirmText: '去设置',
                                success() {
                                    if (res.confirm) {
                                        wx.openSetting()
                                    }
                                }
                                })
                        }
                    })
                }else{
                    callback && callback();
                }
            }
        })
    },
    /**
     * 遍历对象并且将字符串两端空白去除
     */
    objectTrim(obj){
        Object.keys(obj).map(key=>{
            if(typeof obj[key]=="string"){
                obj[key] = obj[key].trim();
            }
            if(obj[key] instanceof Array){
                obj[key].map((v,i)=>{
                    if(typeof obj[key][i]=="object"){
                        obj[key][i] = this.objectTrim(v);
                    }else if(typeof obj[key][i]=="string"){
                        obj[key][i] = obj[key][i].trim();
                    }
                })
            }
        })
        return obj;
    }
}