// local 为开发人员本地 dev 为开发环境 build 为测试环境  product 为生产环境
const model = 'dev' 

var api = ''
var ossUrl = ''
if (model === 'dev') {
  // api = 'http://10.168.1.145:7011/apix/'
  api = 'http://10.168.1.145:7300/mock/5d42880818ed947b04cebc75/crm'
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
    seeCrmService: api + 'see-crm-service'
}
if (window) {
  global = window
}

global.g = {
  ApiUrl: baseURL,
  // 重定向路由，如果接口请求超时需要重定向，可以设置
  redirectUrl: '/pages/login/index'
}
