<template>
  <div>
      <scroll-view id="tab-bar" class="pl15 pr15 uni-tab" :scroll-x="true" :show-scrollbar="false">
        <view
          v-for="(tab,index) in tabBars"
          :key="tab.id"
          class="uni-tab-item"
          :id="tab.id"
          :data-current="index"
          @click="ontabtap(index)"
        >
          <text
            class="uni-tab-item-title"
            :class="currIndex==index ? 'uni-tab-item-title-active' : ''"
          >{{tab.name}}</text>
        </view>
      </scroll-view>
      <swiper
        :current="currIndex"
        style="flex: 1;height:calc(100vh - 300px)"
		class="d-auto-y"
        :duration="300"
        @change="ontabchange">
        <swiper-item>1</swiper-item>
        <swiper-item>
			<!-- 详细信息 -->
			<detailInfo></detailInfo>
		</swiper-item>
        <swiper-item>
			<!-- 相关信息 -->
			<correlationInfo></correlationInfo>
		</swiper-item>
      </swiper>
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
					name: '跟进记录',
					id: '1'
				},
				{
					name: '详细信息',
					id: '2'
				},
				{
					name: '相关信息',
					id: '3'
				}
			],
			currIndex: 2
		}
	},
	onLoad (option) {},
	methods: {
		ontabtap (index) {
			this.currIndex = index
		},
		ontabchange (e) {
			let index = e.target.current || e.detail.current
			this.currIndex = index
		}
	},
	created () {}
}
</script>

<style scoped lang="scss">
.uni-tab {
  border-top: 1px solid #efefef;
  border-bottom:1px solid #efefef;
  .uni-tab-item {
    display: inline-block;
    line-height: 40px;
    height: 40px;
	margin-right: 10px;
	.uni-tab-item-title{
		padding-bottom:6px;
		box-sizing:border-box;
		&.uni-tab-item-title-active{color: #409EFF; border-bottom:1px solid #409EFF}
	}
  }
}

</style>
