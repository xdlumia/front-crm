/* eslint-disable */
// local 为开发人员本地 dev 为开发环境 build 为测试环境  product 为生产环境
const model = 'dev' 

var api = ''
var ossUrl = 'https://oss-a-develop.oss-cn-beijing.aliyuncs.com/'
if (model === 'dev') {
  // api = 'http://39.105.103.188:9011/'
  api = 'https://testcrm.zhenkehu.com/apis/'
} else if (model === 'build') {
  api = 'https://px.xaborong.com/apix/'
} else if (model === 'product') {
  api = 'https://pxxcx.fangmaidong.com/apix/'
}

var baseURL = {
    /** 服务 */
    systemService: api + 'system-service',
    seeExternService: api + 'see-extern-service',
    bizSystemService: api + 'biz-system-service',
    seeCrmService: api + 'see-crm-service',
    seeDataDictionaryService: api + 'see-data-dictionary-service',
    enterpriseManagementService: api + 'enterprise-management-service',
    // ossUrl
    ossUrl: ossUrl
}
if (window) {
  global = window
}

global.g = {
  ApiUrl: baseURL,
  // 重定向路由，如果接口请求超时需要重定向，可以设置
  redirectUrl: '/pages/login/index'
}
