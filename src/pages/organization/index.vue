<!--
/**
* @author王艳龙
* @name 组织架构
* @date 2019年8月2日
**/
-->
<template>
    <div>
        <NavBar title="组织架构" />
        <div class="uni-flex uni-column">
            <!-- 公司 -->
            <div class="flex-item flex-item-V mt10 mb10">
                <span class="p10 d-text-blue">{{userInfo.companyEntity.companyName}}</span>
                <span class="d-text-blue" v-for='(item, index) in breadCrumbs' :key="index"> <span>></span> <span class="p10">{{item.title}}</span> </span>
            </div>

            <div class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></div>

            <div class="d-bg-white dept-box">
                <div class="d-center dept-item pl15 pr15 pt10 pb10 bb" v-for="(item, index) in cuList" :key="item.id">
                    <m-radio />
                    <div class="d-cell f14 d-text-black pl15 d-elip">{{item.title}}</div>
                    <div class="f14 pl10 d-text-blue" v-if="item.children && item.children.length" @click.stop="getNext(index)">下级</div>
                </div>
            </div>

            <!-- <div class='d-bg-white'>
                <div class="d-center dept-item pl15 pr15 pt10 pb10 bb">
                    <m-radio />
                    <div class="ml15">
                        <mAvatat text='木落' />
                    </div>
                    <div class="d-cell f14 d-text-black pl15 d-elip">
                        销售部销售部销售部销售部销售部销售部销售部销售部销售部销售部销售部销售部
                    </div>
                </div>

            </div> -->

            <!-- <view class="flex-item flex-item-V uni-flex uni-column" >
                <i-cell-group v-for="(item) in depts" :key="item.id">
                    <i-cell is-link @click="toNextHierarchy(item.id,item.deptName)" >{{item.deptName}}({{item.children.length + item.employeeList.length}})</i-cell>
                </i-cell-group>
            </view>

            <view class="flex-item flex-item-V" style="height: 10px;background: #F9F9F9;"></view>

            <view class="flex-item flex-item-V uni-flex uni-column" v-for="(item) in users" :key="item.id" @click="editEmployee(item.id)">
                <view class="flex-item flex-item-V bb p10">
                    <view class="fl width20">
						<mAvatat :text='item.employeeName' :url='item.avatarUrl'></mAvatat>
                    </view>
                    <view class="fl width33 pl10 mt15">{{item.employeeName}}</view>
                    <view v-if="item.roleNames" class="fl ac ml10 pl5 pr5 mt15 d-text-blue" style="border: 1px solid #457FF5;border-radius: 5px;">
                        {{item.roleNames.split(',')[0]}}
                    </view>
                </view>
            </view> -->

        </div>
    </div>
</template>
<script>
export default {
	data () {
		return {
			cuList: [],
			breadCrumbs: [], // 面包屑
			deptsIndexs: [],
			depts: [
				{
					title: '部门一',
					id: 1,
					children: [
						{
							title: '部门一 一',
							id: 2,
							children: [
								{
									id: 3,
									title: '部门一 一 一'
								}
							]
						}
					]
				}
			]
		}
	},

	onLoad (option) {
		let [...list] = this.depts
		this.cuList = list
	},

	computed: {
		userInfo () {
			return this.$store.state.userInfo
		}
	},

	methods: {
		// 设置面包屑
		setBreadCrumbs (index) {
			this.breadCrumbs.push({
				title: this.cuList[index].title,
				index
			})
		},

		// 获取下级
		getNext (index) {
			this.deptsIndexs.push(index)
			this.setBreadCrumbs(index)
		},
		// 获取所点击的childred
		getItem () {
			return this.deptsIndexs.reduce((cu, index) => {
				return cu.length ? cu[index].children : this.depts[index].children
			}, [])
		}
	},
	watch: {
		deptsIndexs (value) {
			this.cuList = this.getItem()
		}
	}

}
</script>

<style>

</style>
