<!-- /**
 * @author 王晓冬
 * @param title 标题
 * @param border 标题
 */ -->
<template>
  <div class="panel-section" :style="{'margin-top':top+'px'}">
    <div class="panel-section-title" :style="{'background-color':bg}">
      <h3 v-if="title" :style="{'border-left-color':color}">{{title}}
        <a v-if="url" :url="url" class="fr">
          <slot name="add"><i-icon class="fr" type="add" size="24" color="#466bef" /></slot>
        </a>
        <a v-else class="fr">
          <slot name="add"></slot>
        </a>
      </h3>
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
		},
		bg: {
			type: String,
			default: '#fff'
		},
		color: {
			type: String,
			default: '#409eff'
		},
		url: {
			type: String
		}
	},
	data () {
		return {}
	},
	created () {},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
.panel-section {
    border-top: 1px solid #e4e4e4;
  .panel-section-title {
    line-height: 40px;
    height: 40px;
    padding:10px 0;
    padding-right: 10px;
    box-sizing: border-box;
    h3 {
      height: 20px;
      line-height: 20px;
      margin-left:10px;
      padding-left:5px;
      font-size: 14px;
      color: #333;
      border-left: 3px solid #409eff;
    }
  }
  .panel-content {
    box-sizing: border-box;
    background: #fff;
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
