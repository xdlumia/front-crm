/* eslint-disable */
/*
 * @Author: web.冀猛超
 * @Date: 2019-07-18 18:23:16
 * @LastEditors: web.冀猛超
 * @LastEditTime: 2019-09-05 18:06:02
 * @Description: file content
 */
// local 为开发人员本地 dev 为开发环境 build 为测试环境  product 为生产环境
const model = 'build';
let api = '',
inviteLink = '',
ossUrl = 'https://oss-a-develop.oss-cn-beijing.aliyuncs.com/'
if (model === 'dev') {  
  api = 'https://testcrm.zhenkehu.com/apis/'
  inviteLink = 'https://testcrm.zhenkehu.com:1443/index'
} else if (model === 'build') {
  api = 'https://testcrm.zhenkehu.com/apis/'
  inviteLink = 'https://testcrm.zhenkehu.com:1443/index'
} else if (model === 'product') {
  api = 'https://crm.zhenkehu.com/apis/'
  inviteLink = 'https://crm.zhenkehu.com:1443/index'
  ossUrl = 'https://fmd-c-oss.oss-cn-beijing.aliyuncs.com/'
}

var baseURL = {
    /** 服务 */
    systemService: api + 'system-service',
    seeExternService: api + 'see-extern-service',
    bizSystemService: api + 'biz-system-service',
    seeCrmService: api + 'see-crm-service',
    seeDataDictionaryService: api + 'see-data-dictionary-service',
    // ossUrl
    ossUrl: ossUrl
}
if (window) {
  global = window
}

global.g = {
  ApiUrl: baseURL,
  // 重定向路由，如果接口请求超时需要重定向，可以设置
  redirectUrl: '/pages/login/index',
  inviteLink
}
