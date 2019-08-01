
/**
* @date 2019-04-24
* @host 8135
*/
export default {

	/**
     * @description 查询字典值详情
     */
	infoCode: {
		url: '/dicCommon/info/{code}',
		methods: 'get'
	},
	/**
     * @description 初始化数据字典缓存
     */
	initDictCache: {
		url: '/dicCommon/initDictCache',
		methods: 'get'
	},
	/**
     * @description 根据数据字典code查询值列表
     */
	valueListCode: {
		url: '/dicCommon/valueList/{code}',
		methods: 'get'
	},
	/**
     * @description 删除字典值
     */
	deleteCode: {
		url: '/dictionary/delete/{code}',
		methods: 'delete'
	},
	/**
     * @description 新增或修改字典值
     */
	dictionaryEdit: {
		url: '/dictionary/edit',
		methods: 'post'
	},
	/**
     * @description 查询业务字典列表
     */
	dictionaryList: {
		url: '/dictionary/list',
		methods: 'get'
	},
	/**
     * @description 查询字典值列表
     */
	valueList: {
		url: '/dictionary/valueList',
		methods: 'get'
	}
}
