<template>
  <div>
      <i-tabs :current="currIndex" :tabList='tabBars' @change="handleChange">
        <i-tab index="0">
            <notesInfo :height="'calc(100vh - 49px - 217px - 50px - ' + navH + ')'" />
        </i-tab>
        <i-tab index="1">
            <detailInfo :height="'calc(100vh  - 217px - 50px - ' + navH + ')'" />
        </i-tab>
        <i-tab index="2">
            <correlationInfo :height="'calc(100vh  - 217px - 50px - ' + navH + ')'" />
        </i-tab>
        <i-tab index='3'>
            <attrInfo :height="'calc(100vh - 217px - 100px - ' + navH + ')'" />
        </i-tab>
    </i-tabs>
  </div>
</template>
<script>
import detailInfo from './detail-info'
import notesInfo from './notes-info'
import correlationInfo from './correlation-info'
import attrInfo from './attr-info'
export default {
	components: {
		detailInfo,
		notesInfo,
		correlationInfo,
		attrInfo
	},
	data () {
		return {
			tabBars: [
				{
					title: '跟进记录'
				},
				{
					title: '详细信息'
				},
				{
					title: '相关信息'
				},
				{
					title: '业务属性'
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
