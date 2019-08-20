<!--
/**
* @author 冀猛超
* @name 自定义筛选
* @date 2019年8月09日
**/
-->
<template>
    <div>
        <scroll-view class='diy-filter' :style='"height: calc(100vh - "+ navH + " - 40px)"' scroll-y>
            <filter-plane title='负责人'>
                <div class="pb5">
                    <!-- <div class='f13 d-text-blue mb10' v-if='!principal.length' @click='addPrincipal'>无筛选项,点击添加 <i-icon type='enter' size='13' color='#4889F4' /></div> -->
                    <div class="d-flex">
                        <div class='ac' @click='chooseLeader'>
                            <m-avatar :url='avatarUrl' :text='userName' :width='40' :height='40' />
                            <div class='f14 mt5'>{{userName}}</div>
                        </div>
                    </div>
                </div>
            </filter-plane>

            <!-- 客户级别 -->
            <filter-plane v-model='filterData.gradeCodes' title='客户级别' :dataList='CRM_KHJB' />

            <!-- 客户性质 -->
            <filter-plane v-model='filterData.property' isSingle title='客户性质' :dataList='property' />

            <!-- 跟进状态 -->
            <filter-plane v-model='filterData.followStatuss' isSingle title='跟进状态' :dataList='followStatuss' />

            <!-- 成交状态 -->
            <filter-plane v-model='filterData.makeBargainCodes' title='成交状态' :dataList='CRM_CJZT' />

            <!-- 来源 -->
            <filter-plane v-model='filterData.sourceCodes' title='来源' :dataList='CRM_LY' />
            <!-- 销售阶段 -->
            <filter-plane v-model='filterData.stageIds' title='销售阶段' :dataList='CRM_XSJD' />

        </scroll-view>
        <div class='filter-btn d-center f18 d-text-blue'>
            <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
            <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
        </div>
    </div>
</template>
<script>

import FilterPlane from '@/components/filter-plane'
import mAvatar from '@/components/m-avatar'

let followStatuss = ['暂无', '跟进1次', '跟进多次'].map((content, code) => ({ code, content }))
let property = ['非公海客户', '共享客户'].map((content, code) => ({ code, content }))

export default {
	components: {
		FilterPlane,
		mAvatar
	},
	data () {
		return {
			property, // 客户性质
			followStatuss, // 跟进状态
			principal: [],
			filterData: {
				followStatuss: '', // 跟进状态
				property: '', // 客户性质
				gradeCodes: [], // 客户级别
				makeBargainCodes: [], // 成交状态
				sourceCodes: [], // 来源
				stageIds: [], // 销售阶段
				leaderId: ''
			},
			userInfo: {},
			userName: '',
			avatarUrl: ''
		}
	},
	created () {
		this.userInfo = this.$local.fetch('userInfo') || {}
		this.filterData.leaderId = this.userInfo.id
		this.userName = this.userInfo.name
		this.avatarUrl = this.userInfo.avatarUrl
	},
	computed: {
		CRM_KHJB () {
			return this.dictionaryOptions('CRM_KHJB')
		},
		CRM_CJZT () {
			return this.dictionaryOptions('CRM_CJZT')
		},
		CRM_LY () {
			return this.dictionaryOptions('CRM_LY')
		},
		CRM_XSJD () {
			return this.dictionaryOptions('CRM_XSJD')
		}
	},
	methods: {
		chooseLeader () {
			uni.$once('colleagueChoose', data => {
				if (data.data.length > 0) {
					this.filterData.leaderId = data.data[0].userId
					this.userName = data.data[0].employeeName
					this.avatarUrl = data.data[0].avatarUrl
				} else {
					this.filterData.leaderId = this.userInfo.id
					this.userName = this.userInfo.name
					this.avatarUrl = this.userInfo.avatarUrl
				}
			})
			this.$routing.navigateTo(`/pages/index/colleagueChoose?subordinate=1&userId=${this.filterData.leaderId}&ids=${this.filterData.leaderId}`)
		},
		clear () {
			Object.assign(this.filterData, this.$options.data().filterData)
		},
		submit (item) {
			this.$emit('submit', this.filterData)
		}
	}
}
</script>

<style lang="scss" scoped>
    .filter-btn{
        position: absolute;
        width: 100%;
        background: #fff;
        height: 49px;
        bottom: 0;
        .btn-item{
            line-height: 49px;
        }
    }

    .diy-filter{
        padding-bottom: 50px;
        box-sizing: border-box;
        background: #f2f2f2;
    }
</style>
