<!--
/**
* @author 添加跟进
* @date 2019年7月299日
* @example 调用示例
* @params busType 类型(0=>客户,1=>跟进联系人,2=>跟进机会)
* @params busId 业务id
*    <add-follow busId="1" busType="1"></add-follow>
**/
-->
<template>
<div style="background-color:#f9f9f9">
    <NavBar :title="bus_type[form.busType].title"/>
    <scroll-view scroll-y style="height:calc(100vh - 115px)">
        <m-form ref="mform" class="uni-pb100" :model="form" :rules="rules">
            <div class="d-bg-white">
                <i-select
                    v-model="form.followType"
                    :props="{label:'content',value:'code'}"
                    label="跟进类型"
                    placeholder="请选择跟进类型"
                    :options="dictionaryOptions('CRM_GJLX')">
                </i-select>

				<a url="/pages/contact/index?select=1" v-if='form.busType != 1'>
					<i-input disabled v-model="linkName" label="联系人" placeholder="请选择联系人">
						<i-icon type="enter" size="16" color="#999" />
					</i-input>
				</a>

				<a url="/pages/chance/choose-chance" v-if='form.busType == 0'>
					<i-input disabled v-model="chanceName" label="销售机会" placeholder="请选择销售机会">
						<i-icon type="enter" size="16" color="#999" />
					</i-input>
				</a>

				<!-- <a url="/pages/client/choose-client" v-if="form.busType != 1">
					<i-input disabled v-model="clientName" label="客户名称" placeholder="请选择客户名称">
						<i-icon type="enter" size="16" color="#999" />
					</i-input>
				</a> -->

                <picker-date :required='false' v-model="form.nextTime" label="下次联系时间" placeholder="请选择日期">

				</picker-date>
				<i-select
                    v-model="form.intention"
                    :props="{label:'content',value:'code'}"
                    label="意向程度"
                    :options="dictionaryOptions('CRM_YXCD')">
                </i-select>
            </div>
            <div class="d-bg-white mt10">
                <i-input v-model="form.content" label="跟进内容" placeholder="备注" type="textarea" required/>
                <div class="pl15 pr15 mt5">
					<mUpload :wdith="80" :height="80" v-model='fileAddress' />
				</div>
            </div>
        </m-form>
    </scroll-view>
	<!-- 保存 -->
    <div class="footer-fixed-menu">
      <i-button type="primary" @click='followupSave' i-class="f16">保存</i-button>
    </div>
</div>
</template>
<script>
import mUpload from '@/components/m-upload'

export default {
	components: {
		mUpload
	},
	data () {
		return {
			clientName: '', // 客户名称
			chanceName: '', // 销售机会名称
			linkName: '', // 联系人名称
			form: {
				busId: '', // 业务id,
				busType: '', // 业务类型(0客户，1联系人，2机会，3成交)
				clientId: '', // 客户id
				content: '', // 示例：跟进内容,
				followType: '', // 跟进类型 CRM_GJLX-1,
				intention: '', // 意向程度：CRM_YXCD-5,
				linkId: '', // 联系人id,
				nextTime: '', // 下次联系时间
				salesFunnelId: '', // 销售机会id
				fileAddress: [] // 图片集合
			},
			fileAddress: [], // 图片集合
			rules: {
				content: [{
					required: true,
					message: '请输跟进内容'
				}]
			}
		}
	},
	computed: {
		bus_type () {
			return {
				0: {
					field: 'clientId',
					title: '跟进客户'
				},
				1: {
					field: 'linkId',
					title: '跟进联系人'
				},
				2: {
					field: 'salesFunnelId',
					title: '跟进销售机会'
				}
			}
		}
	},
	onLoad (option) {
		this.form.busId = option.busId
		this.form.busType = option.busType

		this.form[this.bus_type[option.busType].field] = option.busId

		// 客户回调
		uni.$once('chooseClient', data => {
			this.clientName = data.name
			this.form.clientId = data.id
		})

		// 机会回调
		uni.$once('chooseChance', data => {
			this.chanceName = data.chanceName
			this.form.salesFunnelId = data.id
		})

		// 联系人回调
		uni.$once('chooseContact', data => {
			this.linkName = data.linkkanName
			this.form.linkId = data.id
		})
	},
	methods: {
		async followupSave () {
			await this.$refs.mform.validate()

			let params = {}
			params.fileAddress = this.fileAddress.map(item => item.filePath)
			this.$api.seeCrmService.followupSave({ ...this.form, ...params })
				.then(res => {
					// 返回上一页
					this.$routing.navigateBack()
					uni.$emit('updateFollow')
					// console.log('保存成功')
				})
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
