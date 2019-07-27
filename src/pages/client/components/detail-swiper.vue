<template>
  <div>
      <scroll-view style="background-color:#fff;" id="tab-bar" class="detail-tab" :scroll-x="true" :show-scrollbar="false">
          <div class="pl15 pr15 detail-tab-box">
            <div
                v-for="(tab,index) in tabBars"
                :key="tab.id"
                class="detail-tab-item d-relative d-text-black"
                :id="tab.id"
                :data-current="index"
                @click="ontabtap(index)"
            >
                    <text
                        class="detail-tab-item-title"
                        :class="currIndex==index ? 'detail-tab-item-title-active' : ''"
                    >{{tab.name}}</text>
                </div>
          </div>

      </scroll-view>
      <swiper
        :current="currIndex"
        :style="'flex:1;height:calc(100vh - 217px - ' + navH + ')'"
        class="d-auto-y"
        :duration="300"
        @change="ontabchange">
        <swiper-item>
            <notesInfo />
        </swiper-item>
        <swiper-item>
            <!-- 详细信息 -->
            <detailInfo></detailInfo>
        </swiper-item>
        <swiper-item>
            <!-- 相关信息 -->
            <correlationInfo></correlationInfo>
        </swiper-item>
        <swiper-item>
            <attrInfo />
        </swiper-item>
      </swiper>
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
				},
				{
					name: '业务属性',
					id: '4'
				}
			],
			currIndex: 0
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
