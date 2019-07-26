<template>
  <div class="chance-bg">
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
        <div class="f13">负责人: {{detailInfo.name}}</div>
        <div class="d-text-blue f12">地址责任地址责任地址责任</div>
        <div class="f13">深圳市龙岗区坂田华为总部办公楼</div>
      </div>
      <!-- tabs切换组件 -->
      <detail-swiper style="margin-top:100px"></detail-swiper>
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
			// 步骤列表
			stepList: [
				{ label: '验证机会', index: 1 },
				{ label: '需求确定', index: 2 },
				{ label: '方案报价', index: 3 },
				{ label: '谈判审核', index: 4 }
			],
			current: '1',
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
		setpHandle (row, index) {
			this.current = index
		},
		handlerAction (item) {
			this[item] = !this[item]
		}
	},
	created () {}
}
</script>

<style lang="scss">
.change-steps {
  padding:5px 15px;
}
.chance-bg {
  background-color: #f9f9f9;
  height: 100vh;
}
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
