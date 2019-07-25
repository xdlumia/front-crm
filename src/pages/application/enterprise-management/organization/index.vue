<template>
    <view>
        <NavBar title="组织架构" />
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V mt10 mb10">
                <span class="p10" style="color: #5081F5;">{{companyName}}</span>
            </view>
            <view class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></view>
            <view class="flex-item flex-item-V uni-flex uni-column" >
                <i-cell-group v-for="(item) in depts" :key="item.id">
                    <i-cell is-link url='/pages/application/enterprise-management/organization/index'>{{item.name}}({{item.children}})</i-cell>
                </i-cell-group>
            </view>
            <view class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></view>
            <view class="flex-item flex-item-V uni-flex uni-column" v-for="(item) in users" :key="item.id" @click="editUser">
                <view class="flex-item flex-item-V bb p10">
                    <view class="fl width20">
                        <image class="ba" style="height: 51px;width: 51px;" src="/static/img/my-default.png"></image>
                    </view>
                    <view class="fl width20 pl10 mt15">{{item.name}}</view>
                    <view class="fl ac ml10 pl5 pr5 mt15" style="color:#457FF5;border: 1px solid #457FF5;border-radius: 5px;">
                        {{item.tag}}
                    </view>
                </view>
            </view>
            <view class="flex-item flex-item-V bb mt10 p10 d-flex-lr" @tap="invite">
               <i class="iconfont f28 iconxinjian fl " style="color: #4D7FF5;"></i>
               <view class="pl5 fl">邀请同事加入</view>
            </view>
            <view class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></view>
            <view class="flex-item flex-item-V bt" style="position: fixed;bottom: 20px;width: 100%;padding-top: 10px;">
                <view class="uni-flex uni-row">
                    <a class="flex-item width33" style="text-align: center;color:#4D7FF5;" url="/pages/application/enterprise-management/team/editor/index?isEditor=0">添加员工</a>
                    <a class="flex-item width33" style="text-align: center;color:#4D7FF5;" url="/pages/application/enterprise-management/organization/add-dept?isEditor=0&name=销售部">添加子部门</a>
                    <a class="flex-item width33" style="text-align: center;color:#4D7FF5;" url="/pages/application/enterprise-management/organization/add-dept?isEditor=1&name=销售部">部门设置</a>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {
			companyName: '北京凡特仁有限公司',
			depts: [
				{
					id: 0,
					name: '销售部',
					children: 3
				},
				{
					id: 1,
					name: '市场部',
					children: 2
				}
			],
			users: [
				{
					id: 0,
					pic: 'xxx',
					tag: '管理员',
					name: '李志'
				},
				{
					id: 1,
					pic: 'xxx',
					tag: '主管理员',
					name: '李志'
				}
			]
		}
	},
	onLoad () {
		// setTimeout(()=>{
		// 	this.list = testList;
		// }, 300)
	},
	methods: {
		// 邀请成员加入
		invite () {
			uni.navigateTo({
				url: 'invite-other'
			})
		},
		// 编辑员工
		editUser () {
			uni.navigateTo({
				url: '/pages/application/enterprise-management/team/editor/index'
			})
		}
	}
}
</script>

<style>
    .this-font{
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 13px;
    }
    .bule-font{
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 13px;
        color: #0074D9;
    }
    .width20{
        width: 20%;
    }
    .width33{
        width: 33%;
    }
</style>
