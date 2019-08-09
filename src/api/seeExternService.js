// const MOCK_ADDRESS = '/mock/5cf763bda7e73d3d4b297e7a/39.105.103.188:9024'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5cf763bda7e73d3d4b297e7a/39.105.103.188:9024'; // 小程序用
const MOCK_ADDRESS = '' // 禁用easymock
/**
* @date 2019-06-13
* @host 39.105.103.188:9024
*/
export default {
	__mockAddress: MOCK_ADDRESS,

	/**
     * @tag oss接口
     * @description 批量删除OSS资源
     */
	ossBatchDeleteOssResources: {
		url: '/oss/batchDeleteOssResources',
		methods: 'delete',
		mock: false
	},
	/**
     * @tag oss接口
     * @description 删除OSS资源
     */
	ossDeleteOssResources: {
		url: '/oss/deleteOssResources',
		methods: 'delete',
		mock: false
	},
	/**
     * @tag oss接口
     * @description 获取临时凭证
     */
	ossGetOssTicket: {
		url: '/oss/getOssTicket',
		methods: 'get',
		mock: false
	},
	/**
     * @tag osshy接口
     * @description 批量删除OSS资源
     */
	osshyBatchDeleteOssResources: {
		url: '/osshy/batchDeleteOssResources',
		methods: 'delete',
		mock: false
	},
	/**
     * @tag osshy接口
     * @description 删除OSS资源
     */
	osshyDeleteOssResources: {
		url: '/osshy/deleteOssResources',
		methods: 'delete',
		mock: false
	},
	/**
     * @tag osshy接口
     * @description 获取临时凭证
     */
	osshyGetOssTicketV: {
		url: '/osshy/getOssTicketV',
		methods: 'get',
		mock: false
	},
	/**
     * @tag ossv接口
     * @description 批量删除OSS资源
     */
	ossvBatchDeleteOssResources: {
		url: '/ossv/batchDeleteOssResources',
		methods: 'delete',
		mock: false
	},
	/**
     * @tag ossv接口
     * @description 删除OSS资源
     */
	ossvDeleteOssResources: {
		url: '/ossv/deleteOssResources',
		methods: 'delete',
		mock: false
	},
	/**
     * @tag ossv接口
     * @description 获取临时凭证
     */
	ossvGetOssTicketV: {
		url: '/ossv/getOssTicketV',
		methods: 'get',
		mock: false
	},
	/**
     * @tag 短信业务
     * @description 短信验证
     */
	smsChecVerifyCodek: {
		url: '/sms/checVerifyCodek',
		methods: 'get',
		mock: false
	},
	/**
     * @tag 短信业务
     * @description 发送短信
     */
	smsSendVerifyCode: {
		url: '/sms/sendVerifyCode',
		methods: 'get',
		mock: false
	},
	/**
     * @tag 文件压缩下载（日志和配置文件）
     * @description 根据端口号压缩并下载指定类型文件
     */
	runlogCompressAndDownload: {
		url: '/ws/runlog/compressAndDownload',
		methods: 'get',
		mock: false
	}
}
