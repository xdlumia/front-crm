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
      <!-- 当前阶段 -->
      <i-steps
        :current="current"
        class="change-steps d-fixed wfull pt5 pb5"
        :style="{top:`calc(${navH} + 39px)`}"
      >
      <!-- tabs切换组件 -->
      <detail-swiper></detail-swiper>
      <!-- 底部操作按钮 -->
      <div class="footer-fixed-menu d-center d-bg-white">
        <a class="d-cell al">
          <uni-icon type="plus" size="16" color="#1890FF" />
          <span class="ml5 f13 d-text-gray">添加跟进</span>
        </a>
        <a class="d-cell ar">
          <i-icon type="setup" size="18" color="#1890FF" />
          <span class="ml5 f13 d-text-gray">打电话</span>
        </a>
        <a class="d-cell ar">
          <i-icon type="setup" size="18" color="#1890FF" />
          <span class="ml5 f13 d-text-gray">更多</span>
        </a>
      </div>
      <!-- 更多 action -->
      <i-actionSheet :visible="moreShow" :actions="moreActions" show-cancel @cancel="handlerAction('moreShow')" />

    </div>
  </div>
</template>

<script>
import detailSwiper from './components/detail-swiper'
let moreActionsTitle = ['更多操作', '复制', '退回公海', '变更负责人', '删除', '日程']
let moreActions = moreActionsTitle.map(item => ({ name: item }))
export default {
	components: {
		detailSwiper
	},
	data () {
		return {
			detailInfo: {
				name: '客户名称'
			},
			moreShow: false,
			phoneShow: false,
			moreActions: moreActions
		}
	},
	onLoad (option) {},
	methods: {
		handlerAction (item) {
			this[item] = !this[item]
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
  border-bottom: 1px solid #efefef;
  .uni-tab-item {
    display: inline-block;
    line-height: 40px;
    height: 40px;
    margin-right: 10px;
    .uni-tab-item-title {
      padding-bottom: 6px;
      box-sizing: border-box;
      &.uni-tab-item-title-active {
        color: #409eff;
        border-bottom: 1px solid #409eff;
      }
    }
  }
}
</style>
