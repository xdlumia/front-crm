<!-- /**
 * @author 王晓冬
 * @param title 标题
 * @param border 标题
 */ -->
<template>
  <div class="panel-section" :style="{'margin-top':top+'px'}">
    <div class="panel-section-title">
      <h3 v-if="title">{{title}}</h3>
    </div>
    <div class="panel-content" :class="{'panel-border-none':!border}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		title: {
			type: String
		},
		border: {
			default: true
		},
		top: {
			default: 0
		}
	},
	data () {
		return {}
	},
	created () {},
	methods: {}
}
</script>

<style lang="scss" scoped>
.panel-section {
  .panel-section-title {
    line-height: 40px;
    height: 40px;
    background-color:#f8f9fc;
    padding:10px 0;
    box-sizing: border-box;
    h3 {
      height: 20px;
      line-height: 20px;
      margin-left:10px;
      padding-left:5px;
      background-color: #f8f9fc;
      font-size: 14px;
      color: #333;
      border-left: 3px solid #409eff;
    }
  }
  .panel-content {
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    border-top: 1px solid #e4e4e4;
    .detail-panel-item:last-child {
      border-bottom: none;
    }
  }
  .panel-border-none {
    border: none;
    background: none;
  }
}
</style>
