<template>
  <div>
			<cmd-progress
			type="circle"
			:stroke-width="9"
			stroke-color="#7fc25c"
			:width="45"
			:status="stagePercent.status || 'normal'"
			:percent="stagePercent"
			:success-percent="stageListMax"
			:custom="stagePercent.status == 'normal' || !stagePercent.status">
				<div class="f12 ac">
					<span v-if="stagePercent.status == 'normal'" class="stage-bar"></span>
					<span v-else>{{stagePercent.percent}}/{{successPercent}}</span>
					<!-- {{(stageList.findIndex(row => row.id == item.stageId)+1)}}/{{stageListMax}} -->
				</div>
			</cmd-progress>
  </div>
</template>

<script>

export default {
	props: {
		list: {},
		// 进度最大值
		successPercent: {
			required: true
		},
		// 当前行数据
		row: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			stageListAll: [] // 全部阶段
		}
	},
	onShow () {
	},
	onLoad (option) {

	},
	onUnload () {
	},
	created () {
		// this.salesstageQueryList()
	},
	computed: {
		stagePercent () {
			let status = {
				'赢单': 'success',
				'输单': 'exception',
				'无效': 'normal'
			}
			// 获取下标
			let index = this.list.findIndex(item => +item.id === this.row.stageId)
			// 内置阶段获取类型
			let statusType = status[(this.list[index] || {}).stageName]
			/**
			 * 如果有内置阶段返回内置阶段类型
			 * 否则就返回当前进度 并且状态是normal
			 */
			if (statusType) {
				return {
					status: statusType,
					percent: index + 1
				}
			} else {
				return {
					status: false,
					percent: index + 1
				}
			}
		}
	},
	methods: {
		// 获取销售阶段
		// salesstageQueryList () {
		// 	this.$api.seeCrmService.salesstageQueryList({ isOriginal: -1 }).then(res => {
		// 		if (res.code !== 200) return
		// 		let data = res.data || []
		// 		data.forEach(item => {
		// 			item.name = item.stageName
		// 		})
		// 		this.stageListAll = data
		// 	})
		// }
	}
}
</script>

<style scoped lang="scss">
.chance-bg {
  background-color: #f9f9f9;
  height: 100vh;
}
.change-steps {
  background-color: #f9f9f9;
  z-index: 1;
  &.i-steps {
    padding: 5px 0;
  }
}
.chance-sts {
  height: 35px;
  line-height: 35px;
  font-size: 13px;
  color: #666;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 15px;
  border-bottom: 1px solid #efefef;
  z-index: 1;
  .sts-item {
    display: inline-block;
    height: 15px;
    line-height: 15px;
    padding-right: 5px;
    margin-right: 5px;
    border-right: 1px solid #999;
    &:last-child {
      border-right: none;
    }
  }
}
.chance-item {
  border-bottom: 1px solid #efefef;
  background-color: #fff;
  padding: 10px 15px;
  .item-progress {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .item-info {
    font-size: 14px;
    color: #333;
  }
}
.stage-bar{display: inline-block; width:8px; height: 2px; background-color: #e1e4e8}
</style>
