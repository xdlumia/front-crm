const MOCK_ADDRESS = 'http://10.168.1.145:9024'
const IS_MOCK = false
export default {
    __mockAddress: MOCK_ADDRESS,
    getPrivateOssTicket: {
        url: '/ossv/getOssTicketV',
        mock: IS_MOCK
    },
    getPublicOssTicket: {
        url: '/oss/getOssTicket',
        mock: IS_MOCK
    }
}
