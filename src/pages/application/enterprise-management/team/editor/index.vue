<template>
    <view>
		<NavBar v-if="isEditor == 1" title="添加员工" />
        <NavBar v-if="isEditor == 0" title="编辑员工" />
        <view class="uni-common-mt wfull">
            <form @submit="formSubmit" @reset="formReset">
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <label class="fl width30"><span style="color:#FF0000;">*</span>姓名</label>
                        <input class="fl width70" name="name" placeholder="姓名" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30"><span style="color:#FF0000;">*</span>手机号</view>
                        <input class="fl width70" name="phone" placeholder="手机号" />
                    </view>
                </view>
                <view class="uni-form-item wfull">
                    <a class="wfull" url='/pages/application/enterprise-management/organizational-structure'>
                        <i-cell is-link><span style="color:#FF0000;">*</span>所属部门</i-cell>
                    </a>
                </view>
                <view class="uni-form-item wfull">
                    <a  class="wfull" url='/pages/application/enterprise-management/roles'>
                        <i-cell is-link><span style="color:#FF0000;">*</span>角色权限</i-cell>
                    </a>
                </view>
                <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">职位</view>
                        <input class="fl width70" name="position" placeholder="职位" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">企业邮箱</view>
                        <input class="fl width70" name="enterpriseEmail" placeholder="企业邮箱" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl  width30">工号</view>
                        <input class="fl width70" name="jobNumber" placeholder="工号" />
                    </view>
                </view>
                <view class="bb">
                    <view class="uni-form-item m10 pl5">
                        <view class="fl width30">备注</view>
                        <textarea class="fl" name="note" placeholder="备注" ></textarea>
                    </view>
                </view>
                <view class="uni-form-item" style="height: 10px;background: #F9F9F9;"></view>
                <view class="d-absolute wfull d-fixed" style="bottom:0">
                    <i-button class="fl width50" v-if="isEditor == 0" type="warn">刪除</i-button>
                    <i-button class="fl width50" v-if="isEditor == 0" type="primary">完成</i-button>
                    <i-button v-if="isEditor == 1" type="primary">保存</i-button>
                </view>

            </form>
        </view>
    </view>
</template>

<script>
export default {
	onLoad: function (option) {
		this.isEditor = option.isEditor
	},
	data () {
		return {
			isEditor: 0, // 是否是编辑页面0否1是
			pickerDatas: [
				{
					id: 0,
					name: '全公司'
				},
				{
					id: 1,
					name: '销售部'
				},
				{
					id: 2,
					name: '市场部'
				}
			]
		}
	},
	methods: {
	}
}
</script>

<style>
    .width30{
        width: 30%;
    }
    .width70{
        width: 70%;
    }
    .width50{
        width: 50%;
    }
</style>
