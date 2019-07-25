<template>
    <view>
        <NavBar title="企业管理" />
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V bb mt10 mb20">
                <span class="this-font p10" style="color: #5081F5;">{{companyName}}</span>
            </view>
            <view class="flex-item flex-item-V uni-flex uni-column" v-for="(item) in depts" :key="item.id">
                <view class="flex-item flex-item-V bb p5">
                    <view class="fl this-font">{{item.name}}(</view>
                    <view class="fl this-font">{{item.children}})</view>
                    <view class="fr this-font">></view>
                </view>
            </view>
            <view class="flex-item flex-item-V uni-flex uni-column" v-for="(item) in users" :key="item.id">
                <view class="flex-item flex-item-V bb p10">
                    <view class="fl width20">
                        <image class="ba" style="height: 51px;width: 51px;" src="../../../../../dist/dev/mp-weixin/static/img/my-default.png"></image>
                    </view>
                    <view class="fl width20 pl10 this-font mt15">{{item.name}}</view>
                    <button plain="true" class="fl ba width33 mt15" style="border-color: #0080FF;">{{item.tag}}</button>
                </view>
            </view>
            <view class="flex-item flex-item-V bb mt10 p10" @tap="invite">
                <icon class="fl" type="success">+</icon>
                <view class="pl15 fl this-font">邀请同事加入</view>
            </view>
            <view class="flex-item flex-item-V bt" style="position: fixed;bottom: 20px;width: 100%;padding-top: 10px;">
                <view class="uni-flex uni-row">
                    <view class="flex-item bule-font width33" style="text-align: center;" @tap="addUser">添加员工</view>
                    <view class="flex-item bule-font width33" style="text-align: center;" @tap="addDept">添加子部门</view>
                    <view class="flex-item bule-font width33" style="text-align: center;" @tap="deptSet">部门设置</view>
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
		// 添加员工
		addUser () {
			uni.navigateTo({
				url: '../team/editor/index?isEditor=0'
			})
		},
		// 添加子部门
		addDept () {
			uni.navigateTo({
				url: 'add-dept?isEditor=0&name=销售部'
			})
		},
		// 部门设置(修改)
		deptSet () {
			uni.navigateTo({
				url: 'add-dept?isEditor=1&name=销售部'
			})
		},
		// 邀请成员加入
		invite () {
			uni.navigateTo({
				url: 'invite-other'
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
