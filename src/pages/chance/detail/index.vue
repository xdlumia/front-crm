<template>
  <div>
    <NavBar title="机会销售详情" />
    <!-- 列表内容 -->
    <div class="pt10" style="height:100vh">
      <!-- 顶部信息 -->
      <div class="chance-datail-title pl15 pr15 f13">
        <div class="uni-flex uni-row">
          <div
            class="flex-item d-elip wfull f16"
            style="color:#333"
          >车公庄地铁 文华园小区朝南一局560万车公庄地铁 文华园小区朝南一局560万</div>
          <div class="flex-item datail-handle">
            <i-icon type="brush" size="18" class="ml5" color="#1890FF" />
            <i-icon type="like" size="20" class="ml15" color="#1890FF" />
          </div>
        </div>
        <div>客户名称: {{detailInfo.name}}</div>
        <div>负责人: {{detailInfo.name}}</div>
        <div>销售金额(元): {{detailInfo.name}}</div>
      </div>

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
        class="swiper-box"
        style="flex: 1;"
        :duration="300"
        @change="ontabchange"
      >
        <swiper-item>1</swiper-item>
        <swiper-item>
			<mPanel title="基本信息">
				<i-cell-group>
					<i-cell title="只显示箭头"></i-cell>
					<i-cell title="跳转到首页" is-link url="/pages/dashboard/index"></i-cell>
					<i-cell title="只有 footer 点击有效"></i-cell>
					<i-cell title="开关">
						<switch slot="footer" checked />
					</i-cell>
				</i-cell-group>
			</mPanel>
		</swiper-item>
        <swiper-item>3</swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
	components: {
		// mPager
	},
	data () {
		return {
			detailInfo: {
				name: '客户名称'
			},
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
		},

		// // 滚动到顶部刷新
		// scrolltoupper (e) {
		// 	console.log(e)
		// },
		// // 滚动到底部加载
		// scrolltolower (e) {
		// 	console.log(e)
		// },
		// 打开列表详情
		openDetail ({ id }) {
			this.$routing.navigateTo('/pages/customer/detail?id=' + id)
		}
	},
	created () {}
}
</script>

<style scoped lang="scss">
.chance-datail-title {
  background-color: #fff;
  color: #666;
  .datail-handle {
    min-width: 60px;
  }
}
.uni-tab {
  border-top: 1px solid #efefef;
  border-bottom:2px solid #efefef;
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
