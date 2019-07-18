import Api from './request'
import utils from './utils'

let baseURL = global.g.ApiUrl

let reg = /\{[\S]*?\}/g
let mockKey = '__mockAddress'
const createApi = (config, serviceName) => {
    let result = {}
    let mockAddress = config[mockKey]
    let HTTP_POOL = {}
    delete config[mockKey]
    let has = function (key) {
        return !!HTTP_POOL[key]
    }
    let reset = function (key) {
        HTTP_POOL[key] = null
    }

    let generateApiFunction = function (url, method, useMock) {
        let userUrlParam = false
        let urls = url.split(reg)

        if (urls.length !== 1) {
            userUrlParam = true
        }

        return function (params, ...urlParams) {
            let serviceUrl = ''

            if (!useMock) {
                serviceUrl = baseURL[serviceName]

                if (!serviceUrl) {
                    throw new Error(`serviceUrl ${serviceName} 不存在!`)
                }

                if (userUrlParam) {
                    if ((urlParams.length + 1) !== urls.length) {
                        throw new Error(`url: ${url} 需要 ${urls.length - 1} 个参数，实际有${urlParams.length}个`)
                    }
                }
            }
            let searchParams = urls.reduce((previousValue, currentValue, currentIndex) => {
                return currentIndex === 0 ? currentValue : previousValue + urlParams.shift() + currentValue
            }, null)
            let key = serviceUrl + searchParams + (params ? JSON.stringify(params) : '')
            if (!has(key) && !HTTP_POOL[key]) {
                HTTP_POOL[key] = true
                let queryUrl = serviceUrl + (userUrlParam ? searchParams : url)
                // get形式特殊处理
                if (method === 'get' && params) {
                    let _params = utils.formatParams(params)
                    queryUrl += `?${_params}`
                    params = {}
                }
                return Api[method](queryUrl, params).then(res => {
                    reset(key)
                    return res
                }).catch(err => {
                    reset(key)
                    return err
                })
            } else {
                return new Promise(() => {
                    console.error('上次请求未结束')
                })
            }
        }
    }

    for (let key in config) {
        if (!config.hasOwnProperty(key)) {
            continue
        }

        let option = config[key]
        let methods = option.methods || 'get'
        let url = option.url
        let useMock = false

        if (process.env.NODE_ENV === 'development') {
            useMock = mockAddress && option.mock
            useMock && (url = mockAddress + url)
        }

        if (!(methods instanceof Array)) {
            methods = [methods]
        }

        result[key] = generateApiFunction(url, methods[0].toLowerCase(), useMock)

        if (methods.length > 1) {
            for (let method of methods) {
                result[key][method.toLowerCase()] = generateApiFunction(url, method, useMock)
            }
        }
    }
    return result
}

export default (services) => {
    let result = {}

    for (let serviceName in services) {
        if (!services.hasOwnProperty(serviceName)) {
            continue
        }

        result[serviceName] = createApi(services[serviceName], serviceName)
    }
    return result
}
