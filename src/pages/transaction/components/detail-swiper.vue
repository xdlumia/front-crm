<template>
  <div>
      <i-tabs :current="currIndex" :tabList='tabBars' @change="handleChange">
        <i-tab index="0">
            <detailInfo />
        </i-tab>
        <i-tab index="1">
            <correlationInfo />
        </i-tab>
    </i-tabs>
  </div>
</template>

<script>
import detailInfo from './detail-info'
import correlationInfo from './correlation-info'
export default {
	components: {
		detailInfo,
		correlationInfo
	},
	data () {
		return {
			tabBars: [
				{
					title: '详细信息'
				},
				{
					title: '相关信息'
				}
			],
			currIndex: 0
		}
	},
	onLoad (option) {},
	methods: {
		handleChange ({ index }) {
			this.currIndex = index
		}
	},
	created () {}
}
</script>

<style lang="scss">
.detail-tab {
    height: 39px;
    border-top: 1px solid #efefef;
    border-bottom:1px solid #efefef;
    .detail-tab-box{
        display: flex;
        justify-content: space-between;
    }
    .detail-tab-item {
        display: inline-block;
        line-height: 40px;
        height: 40px;
        margin-right: 10px;
        .detail-tab-item-title{
            height: 37px;
            padding: 0;
            display: inline-block;
            &.detail-tab-item-title-active{
                position: relative;
                color: #409EFF;
                border-bottom: 3px solid #409eff;
            }
        }
    }
}
</style>
