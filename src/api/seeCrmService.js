const MOCK_ADDRESS = 'http://10.168.1.145:7300//mock/5d42880818ed947b04cebc75/crm'
let _isMock = false
export default {
	__mockAddress: MOCK_ADDRESS,
	/* =============客户基本信息表start=========== */
	// 分配
	clientinfoAllocation: {
		'url': '/clientinfo/allocation',
		'mock': _isMock,
		'methods': 'post'
	},

	// 领取客户
	clientinfoClaimClient: {
		'url': '/clientinfo/claimClient',
		'mock': _isMock,
		'methods': 'post'
	},

	// 删除客户
	clientinfoDelete: {
		'url': '/clientinfo/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 删除客户业务属性
	clientinfoDeleteClientbusiness: {
		'url': '/clientinfo/deleteClientbusiness',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	clientinfoInfo: {
		'url': '/clientinfo/info/{id}',
		'mock': _isMock
	},

	// 查看客户业务属性详细信息
	clientinfoInfoClientbusiness: {
		'url': '/clientinfo/infoClientbusiness/{id}',
		'mock': _isMock
	},

	// 获取列表
	clientinfoList: {
		'url': '/clientinfo/list',
		'mock': _isMock
	},

	// 获取客户业务属性列表
	clientinfoListClientbusiness: {
		'url': '/clientinfo/listClientbusiness',
		'mock': _isMock
	},

	// 分页获取列表
	clientinfoPagelist: {
		'url': '/clientinfo/pagelist',
		'mock': _isMock
	},

	// 保存/复制
	clientinfoSave: {
		'url': '/clientinfo/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 保存客户业务属性
	clientinfoSaveClientbusiness: {
		'url': '/clientinfo/saveClientbusiness',
		'mock': _isMock,
		'methods': 'post'
	},

	// 退回到公海池
	clientinfoSendBackPool: {
		'url': '/clientinfo/sendBackPool',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改
	clientinfoUpdate: {
		'url': '/clientinfo/update',
		'mock': _isMock,
		'methods': 'post'
	},

	// 变更责任人
	clientinfoUpdateClientLeader: {
		'url': '/clientinfo/updateClientLeader',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============客户基本信息表end=========== */

	/* =============公海池start=========== */
	// 查看详细信息
	clientpublicpoolInfo: {
		'url': '/clientpublicpool/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	clientpublicpoolList: {
		'url': '/clientpublicpool/list',
		'mock': _isMock
	},

	// 定时任务回收客户
	clientpublicpoolRecycleClient: {
		'url': '/clientpublicpool/recycleClient',
		'mock': _isMock
	},

	// 保存
	clientpublicpoolSave: {
		'url': '/clientpublicpool/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改
	clientpublicpoolUpdate: {
		'url': '/clientpublicpool/update',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============公海池end=========== */

	/* =============数据字典关系表start=========== */
	// 删除
	dictionaryrelationDelete: {
		'url': '/dictionaryrelation/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	dictionaryrelationInfo: {
		'url': '/dictionaryrelation/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	dictionaryrelationList: {
		'url': '/dictionaryrelation/list',
		'mock': _isMock
	},

	// 保存/修改
	dictionaryrelationSave: {
		'url': '/dictionaryrelation/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============数据字典关系表end=========== */

	/* =============评分权重表start=========== */
	// 获取权重规则列表
	fieldweightList: {
		'url': '/fieldweight/list',
		'mock': _isMock
	},

	// 保存权重规则
	fieldweightSave: {
		'url': '/fieldweight/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============评分权重表end=========== */

	/* =============附件表start=========== */
	// 删除
	fileinfoDelete: {
		'url': '/fileinfo/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	fileinfoInfo: {
		'url': '/fileinfo/info/{id}',
		'mock': _isMock
	},

	// 逻辑删除
	fileinfoLogicDelete: {
		'url': '/fileinfo/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 获取列表
	fileinfoQueryList: {
		'url': '/fileinfo/queryList',
		'mock': _isMock
	},

	// 保存
	fileinfoSave: {
		'url': '/fileinfo/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改
	fileinfoUpdate: {
		'url': '/fileinfo/update',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============附件表end=========== */

	/* =============跟进表start=========== */
	// 查看详细信息
	followupInfo: {
		'url': '/followup/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	followupList: {
		'url': '/followup/list',
		'mock': _isMock
	},

	// 逻辑删除
	followupLogicDelete: {
		'url': '/followup/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 保存
	followupSave: {
		'url': '/followup/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============跟进表end=========== */

	/* =============动态扩展信息设置表start=========== */
	// 删除
	formsfieldconfigDelete: {
		'url': '/formsfieldconfig/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	formsfieldconfigInfo: {
		'url': '/formsfieldconfig/info/{id}',
		'mock': _isMock
	},

	// 逻辑删除自定义字段
	formsfieldconfigLogicDelete: {
		'url': '/formsfieldconfig/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 获取表单字典配置列表
	formsfieldconfigQueryList: {
		'url': '/formsfieldconfig/queryList',
		'mock': _isMock
	},

	// 信息保存
	formsfieldconfigSave: {
		'url': '/formsfieldconfig/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改
	formsfieldconfigUpdate: {
		'url': '/formsfieldconfig/update',
		'mock': _isMock,
		'methods': 'post'
	},

	// 批量修改
	formsfieldconfigUpdateBatch: {
		'url': '/formsfieldconfig/updateBatch',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============动态扩展信息设置表end=========== */

	/* =============业务扩展信息中间表start=========== */
	// 删除
	formsfieldvalueDelete: {
		'url': '/formsfieldvalue/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	formsfieldvalueInfo: {
		'url': '/formsfieldvalue/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	formsfieldvalueList: {
		'url': '/formsfieldvalue/list',
		'mock': _isMock
	},

	// 保存自定义字段值
	formsfieldvalueSave: {
		'url': '/formsfieldvalue/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============业务扩展信息中间表end=========== */

	/* =============客户领取记录表start=========== */
	// 验证查看客户数量
	getclientlogCheckClientInfoNum: {
		'url': '/getclientlog/checkClientInfoNum',
		'mock': _isMock,
		'methods': 'post'
	},

	// 删除
	getclientlogDelete: {
		'url': '/getclientlog/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	getclientlogInfo: {
		'url': '/getclientlog/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	getclientlogList: {
		'url': '/getclientlog/list',
		'mock': _isMock
	},

	// 保存
	getclientlogSave: {
		'url': '/getclientlog/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============客户领取记录表end=========== */

	/* =============标签与业务关联关系表start=========== */
	// 获取列表
	lablebusinessList: {
		'url': '/lablebusiness/list',
		'mock': _isMock
	},

	// 保存
	lablebusinessSave: {
		'url': '/lablebusiness/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============标签与业务关联关系表end=========== */

	/* =============标签表start=========== */
	// 删除
	lableinfoDelete: {
		'url': '/lableinfo/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 获取列表
	lableinfoList: {
		'url': '/lableinfo/list',
		'mock': _isMock
	},

	// 保存
	lableinfoSave: {
		'url': '/lableinfo/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============标签表end=========== */

	/* =============联系人基本信息表start=========== */
	// 删除
	linkmanDelete: {
		'url': '/linkman/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	linkmanInfo: {
		'url': '/linkman/info/{id}',
		'mock': _isMock
	},

	// 逻辑删除联系人信息
	linkmanLogicDelete: {
		'url': '/linkman/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 获取联系人列表 -- 不分页
	linkmanQueryBusList: {
		'url': '/linkman/queryBusList',
		'mock': _isMock
	},

	// 获取联系人列表 -- 分页
	linkmanQueryList: {
		'url': '/linkman/queryList',
		'mock': _isMock
	},

	// 获取联系人列表 -- 分页
	linkmanQueryPageList: {
		'url': '/linkman/queryPageList',
		'mock': _isMock
	},

	// 新增联系人信息
	linkmanSave: {
		'url': '/linkman/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改联系人信息
	linkmanUpdate: {
		'url': '/linkman/update',
		'mock': _isMock,
		'methods': 'post'
	},

	// 联系人手机号校验
	linkmanVerifLinkmanPhone: {
		'url': '/linkman/verifLinkmanPhone',
		'mock': _isMock
	},
	/* =============联系人基本信息表end=========== */

	/* =============业务与联系人关系表start=========== */
	// 删除
	linkmanrelationDelete: {
		'url': '/linkmanrelation/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	linkmanrelationInfo: {
		'url': '/linkmanrelation/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	linkmanrelationList: {
		'url': '/linkmanrelation/list',
		'mock': _isMock
	},

	// 逻辑删除
	linkmanrelationLogicDelete: {
		'url': '/linkmanrelation/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 业务与联系人关系保存
	linkmanrelationSave: {
		'url': '/linkmanrelation/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 批量保存业务与联系人关系
	linkmanrelationSaveBatch: {
		'url': '/linkmanrelation/saveBatch',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改
	linkmanrelationUpdate: {
		'url': '/linkmanrelation/update',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============业务与联系人关系表end=========== */

	/* =============组织架构start=========== */
	// 获取子级部门列表
	organizationalStructureChildrenDepts: {
		'url': '/organizationalStructure/childrenDepts',
		'mock': _isMock
	},

	// 根据部门id获取其下人员列表
	organizationalStructureChildrenEmployees: {
		'url': '/organizationalStructure/childrenEmployees',
		'mock': _isMock
	},

	// 同事列表(公司内部的所有员工)
	organizationalStructureColleagues: {
		'url': '/organizationalStructure/colleagues',
		'mock': _isMock
	},

	// 删除部门)
	organizationalStructureDeleteDept: {
		'url': '/organizationalStructure/deleteDept',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 删除员工)
	organizationalStructureDeleteEmployee: {
		'url': '/organizationalStructure/deleteEmployee',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 获取部门列表
	organizationalStructureDepts: {
		'url': '/organizationalStructure/depts',
		'mock': _isMock
	},

	// 获取下属人员列表（包括自己）)
	organizationalStructureGetChildrenEmployee: {
		'url': '/organizationalStructure/getChildrenEmployee',
		'mock': _isMock
	},

	// 根据id[]返回用户对象列表)
	organizationalStructureGetEmployeeByIds: {
		'url': '/organizationalStructure/getEmployeeByIds',
		'mock': _isMock
	},

	// 获取用户详细信息)
	organizationalStructureGetEmployeeDetail: {
		'url': '/organizationalStructure/getEmployeeDetail/{id}',
		'mock': _isMock
	},

	// 获取上级部门)
	organizationalStructureGetSuperDept: {
		'url': '/organizationalStructure/getSuperDept',
		'mock': _isMock
	},

	// 获取角色列表
	organizationalStructureRoles: {
		'url': '/organizationalStructure/roles',
		'mock': _isMock
	},

	// 保存部门信息
	organizationalStructureSaveDept: {
		'url': '/organizationalStructure/saveDept',
		'mock': _isMock,
		'methods': 'post'
	},

	// 保存员工信息
	organizationalStructureSaveEmployee: {
		'url': '/organizationalStructure/saveEmployee',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改部门信息
	organizationalStructureUpdateDept: {
		'url': '/organizationalStructure/updateDept',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改员工信息
	organizationalStructureUpdateEmployee: {
		'url': '/organizationalStructure/updateEmployee',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============组织架构end=========== */

	/* =============选择最近同事记录表start=========== */
	// 获取列表
	recentcolleaguesList: {
		'url': '/recentcolleagues/list',
		'mock': _isMock
	},

	// 保存
	recentcolleaguesSave: {
		'url': '/recentcolleagues/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============选择最近同事记录表end=========== */

	/* =============RocketMQ失败重试start=========== */
	// 重试失败消息
	rocketMQRetryFailedMessage: {
		'url': '/rocketMQ/retryFailedMessage/{className}',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============RocketMQ失败重试end=========== */

	/* =============销售机会基本信息表start=========== */
	// 客户销售机会的统计数据
	saleschanceClientSalesChanceStatistics: {
		'url': '/saleschance/clientSalesChanceStatistics',
		'mock': _isMock
	},

	// 删除销售机会
	saleschanceDelete: {
		'url': '/saleschance/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	saleschanceInfo: {
		'url': '/saleschance/info/{id}',
		'mock': _isMock
	},

	// 逻辑删除销售机会
	saleschanceLogicDelete: {
		'url': '/saleschance/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 获取列表--不分页
	saleschanceQueryList: {
		'url': '/saleschance/queryList',
		'mock': _isMock
	},

	// 获取列表--分页
	saleschanceQueryPageList: {
		'url': '/saleschance/queryPageList',
		'mock': _isMock
	},

	// 销售机会列表统计数据
	saleschanceSalesChanceStatistics: {
		'url': '/saleschance/salesChanceStatistics',
		'mock': _isMock
	},

	// 新增销售机会
	saleschanceSave: {
		'url': '/saleschance/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改销售机会
	saleschanceUpdate: {
		'url': '/saleschance/update',
		'mock': _isMock,
		'methods': 'post'
	},

	// 阶段推进
	saleschanceUpdatelStagePrope: {
		'url': '/saleschance/updatelStagePrope',
		'mock': _isMock,
		'methods': 'post'
	},

	// 指定人的销售数据统计
	saleschanceUserSalesChanceStatistics: {
		'url': '/saleschance/userSalesChanceStatistics',
		'mock': _isMock
	},

	// 销售机会名称校验
	saleschanceVerifyChanceName: {
		'url': '/saleschance/verifyChanceName',
		'mock': _isMock
	},
	/* =============销售机会基本信息表end=========== */

	/* =============销售阶段表start=========== */
	// 删除
	salesstageDelete: {
		'url': '/salesstage/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	salesstageInfo: {
		'url': '/salesstage/info/{id}',
		'mock': _isMock
	},

	// 逻辑删除销售阶段表
	salesstageLogicDelete: {
		'url': '/salesstage/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 获取销售阶段列表
	salesstageQueryList: {
		'url': '/salesstage/queryList',
		'mock': _isMock
	},

	// 保存销售阶段表
	salesstageSave: {
		'url': '/salesstage/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改销售阶段
	salesstageUpdate: {
		'url': '/salesstage/update',
		'mock': _isMock,
		'methods': 'post'
	},

	// 批量修改销售阶段
	salesstageUpdateBatch: {
		'url': '/salesstage/updateBatch',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============销售阶段表end=========== */

	/* =============销售阶段变更消息提示start=========== */
	// 核实员工机会列表是否需要消息提示
	salesstagemessageCheckisMsgUser: {
		'url': '/salesstagemessage/checkisMsgUser/{userId}',
		'mock': _isMock
	},

	// 删除
	salesstagemessageDelete: {
		'url': '/salesstagemessage/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 查看详细信息
	salesstagemessageInfo: {
		'url': '/salesstagemessage/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	salesstagemessageList: {
		'url': '/salesstagemessage/list',
		'mock': _isMock
	},

	// 保存
	salesstagemessageSave: {
		'url': '/salesstagemessage/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改
	salesstagemessageUpdate: {
		'url': '/salesstagemessage/update',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============销售阶段变更消息提示end=========== */

	/* =============首页日程表start=========== */
	// 查看详细信息
	scheduleInfo: {
		'url': '/schedule/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	scheduleList: {
		'url': '/schedule/list',
		'mock': _isMock
	},

	// 逻辑删除
	scheduleLogicDelete: {
		'url': '/schedule/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 详情里面查日程列表
	scheduleQueryRecordListById: {
		'url': '/schedule/queryRecordListById',
		'mock': _isMock
	},

	// 保存
	scheduleSave: {
		'url': '/schedule/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 查询首页本月成交金额排行榜
	scheduleSelectCompanyRanking: {
		'url': '/schedule/selectCompanyRanking',
		'mock': _isMock
	},

	// 查询本月当前人的销售漏斗
	scheduleSelectSalesFunnel: {
		'url': '/schedule/selectSalesFunnel/{userId}',
		'mock': _isMock
	},

	// 查询本月当前人的销售简报
	scheduleSelectSalesKit: {
		'url': '/schedule/selectSalesKit/{userId}',
		'mock': _isMock
	},

	// 修改
	scheduleUpdate: {
		'url': '/schedule/update',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============首页日程表end=========== */

	/* =============业务与所属团队成员信息表start=========== */
	// 批量修改
	teammemberinfoBatchUpdate: {
		'url': '/teammemberinfo/batchUpdate',
		'mock': _isMock,
		'methods': 'post'
	},

	// 查看详细信息
	teammemberinfoInfo: {
		'url': '/teammemberinfo/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	teammemberinfoList: {
		'url': '/teammemberinfo/list',
		'mock': _isMock
	},

	// 逻辑删除
	teammemberinfoLogicDelete: {
		'url': '/teammemberinfo/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 详情里面获取团队成员列表
	teammemberinfoQueryTeamMemberListById: {
		'url': '/teammemberinfo/queryTeamMemberListById',
		'mock': _isMock
	},

	// 保存
	teammemberinfoSave: {
		'url': '/teammemberinfo/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改
	teammemberinfoUpdate: {
		'url': '/teammemberinfo/update',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============业务与所属团队成员信息表end=========== */

	/* =============成交记录表start=========== */
	// 查看详细信息
	transactionrecordInfo: {
		'url': '/transactionrecord/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	transactionrecordList: {
		'url': '/transactionrecord/list',
		'mock': _isMock
	},

	// 逻辑删除
	transactionrecordLogicDelete: {
		'url': '/transactionrecord/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 详情里面查成交记录列表
	transactionrecordQueryRecordListById: {
		'url': '/transactionrecord/queryRecordListById',
		'mock': _isMock
	},

	// 查询成交记录的总金额
	transactionrecordQueryTotalAmount: {
		'url': '/transactionrecord/queryTotalAmount/{clientId}',
		'mock': _isMock
	},

	// 保存
	transactionrecordSave: {
		'url': '/transactionrecord/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 修改
	transactionrecordUpdate: {
		'url': '/transactionrecord/update',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============成交记录表end=========== */

	/* =============用户申请信息表start=========== */
	// 获取短信验证码
	userapplicationinformationGetSmsCode: {
		'url': '/userapplicationinformation/getSmsCode/{phone}',
		'mock': _isMock
	},

	// 查看详细信息
	userapplicationinformationInfo: {
		'url': '/userapplicationinformation/info/{id}',
		'mock': _isMock
	},

	// 获取列表
	userapplicationinformationList: {
		'url': '/userapplicationinformation/list',
		'mock': _isMock
	},

	// 逻辑删除
	userapplicationinformationLogicDelete: {
		'url': '/userapplicationinformation/logicDelete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 保存
	userapplicationinformationSave: {
		'url': '/userapplicationinformation/save',
		'mock': _isMock,
		'methods': 'post'
	},

	// 更新
	userapplicationinformationUpdateUserApply: {
		'url': '/userapplicationinformation/updateUserApply',
		'mock': _isMock,
		'methods': 'post'
	},

	// 校验短信验证码
	userapplicationinformationValidateSmsCode: {
		'url': '/userapplicationinformation/validateSmsCode',
		'mock': _isMock
	},
	/* =============用户申请信息表end=========== */

	/* =============我关注的数据start=========== */
	// 删除
	watchfulbusinessDelete: {
		'url': '/watchfulbusiness/delete',
		'mock': _isMock,
		'methods': 'delete'
	},

	// 保存
	watchfulbusinessSave: {
		'url': '/watchfulbusiness/save',
		'mock': _isMock,
		'methods': 'post'
	},
	/* =============我关注的数据end=========== */

	/* =============服务健康检查start=========== */
	// 检查服务健康状况
	healthCheck: {
		'url': '/ws/health/check',
		'mock': _isMock
	},
	/* =============服务健康检查end=========== */

	/* =============文件压缩下载（日志和配置文件）start=========== */
	// 根据端口号压缩并下载指定类型文件
	runlogCompressAndDownload: {
		'url': '/ws/runlog/compressAndDownload',
		'mock': _isMock
	},
	/* =============文件压缩下载（日志和配置文件）end=========== */

	wgwGetPhoneNumber: {
		'url': 'userapplicationinformation/wgw/getPhoneNumber',
		'methods': 'post',
		'mock': _isMock
	},
	wgwGetOpenId: {
		'url': 'userapplicationinformation/wgw/getOpenId',
		'methods': 'get',
		'mock': _isMock
	},
	posterGet: {
		'url': '/poster/get',
		'mock': _isMock
	}
}
