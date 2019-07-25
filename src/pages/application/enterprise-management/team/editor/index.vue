<template>
    <view>
		<NavBar title="企业管理" />
        <view class="uni-padding-wrap uni-common-mt">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item mt10 mb10 bb">
                    <span style="color:#FF0000;">*</span>
                    <label class="fl title-font width30">姓名</label>
                    <input class="fl width70" name="name" placeholder="姓名" />
                </view>
                <view class="uni-form-item mt10 mb10 bb">
                    <span style="color:#FF0000;">*</span>
                    <view class="fl title-font width30">手机号</view>
                    <input class="fl ml20 width70" name="phone" placeholder="手机号" />
                </view>
                <view class="uni-form-item mt10 mb10 bb">
                    <span style="color:#FF0000;">*</span>
                    <view class="fl title-font width30">手机号</view>
                    <input class="fl ml20 width70" name="phone" placeholder="手机号" />
                </view>
                <view class="uni-form-item mt10 mb10 bb" @tap="toOrg">
                    <span style="color:#FF0000;">*</span>
                    <view class="fl title-font width30">所属部门</view>
                    <input class="fl ml20 width50" name="dept" disabled="true" placeholder="所属部门" />
                    <view class="view-style width20" style="right;margin-right: 20px;">></view>
                </view>
                <view class="uni-form-item mt10 mb10 bb" @tap="toRoles">
                    <span style="color:#FF0000;">*</span>
                    <view class="fl title-font width30">角色权限</view>
                    <input class="fl ml20 width50" disabled="true" name="role" placeholder="角色权限" />
                    <view class="view-style width20" style="float: right;margin-right: 20px;">></view>
                </view>
                <view class="uni-form-item mt10 mb10 bb">
                    <view class="fl title-font width30">企业邮箱</view>
                    <input class="fl ml20 width70" name="enterpriseEmail" placeholder="企业邮箱" />
                </view>
                <view class="uni-form-item mt10 mb10 bb">
                    <view class="fl title-font width30">职位</view>
                    <input class="fl ml20 width70" name="position" placeholder="职位" />
                </view>
                <view class="uni-form-item mt10 mb10 bb">
                    <view class="fl title-font width30">工号</view>
                    <input class="fl ml20 width70" name="jobNumber" placeholder="工号" />
                </view>
                <view class="uni-form-item mt10 mb10 bb">
                    <view class="fl title-font width30">备注</view>
                    <input class="fl ml20 width70" name="note" placeholder="备注" />
                </view>

                <view v-if="isEditor == 1" class="uni-btn-v" style="position: fixed;bottom: 0;width: 100%;padding-top: 10px;">
                    <button type="warn" plain="true" style="width: 45%;float: left;margin-left: 4px;">删除</button>
                    <button formType="submit" type="primary" plain="true"
                        style="width: 45%;float: left;margin-left: 4px;color: #4889F4;border-color: #4889F4;">
                        完成
                    </button>
                    <!-- <button type="default" formType="reset">Reset</button> -->
                </view>
                <view v-if="isEditor == 0" class="uni-btn-v" style="position: fixed;bottom: 0;width: 100%;padding-top: 10px;">
                    <button type="primary" class="title-font" style="background-color: #007AFF;">保存</button>
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
			isEditor: 0, // 是否是编辑页面0后1是
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
		toRoles () {
			uni.navigateTo({
				url: '../../roles'
			})
		},
		toOrg () {
			uni.navigateTo({
				url: '../../organizational-structure'
			})
		}
	}
}
</script>

<style>
    .title-font{
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 13px;
    }
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
