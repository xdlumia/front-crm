const MOCK_ADDRESS = 'http://10.168.1.145:7011/biz-system-service'
const IS_MOCK = false

export default {
    __mockAddress: MOCK_ADDRESS,
    getUserAuth: {
        url: '/rmuserrole/list/training',
        mock: IS_MOCK,
        methods: 'get'
    },
    queryOpenRegistration: {
        url: '/rmemployee/queryOpenRegistration',
        mock: IS_MOCK,
        methods: 'get'
    },
    register: {
        url: '/rmemployee/register',
        mock: IS_MOCK,
        methods: 'post'
    },
    changePwd: {
        url: '/rmemployee/updatePasswordForTraing',
        mock: IS_MOCK,
        methods: 'post'
    }
}
