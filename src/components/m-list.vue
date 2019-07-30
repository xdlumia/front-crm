<!-- /**
 * @author 王晓冬
 * @param label 标题
 * @param label-width lable 宽度 默认80
 * @param disabled 是否禁用输入框
 * @param value v-model
 * @example 如下例子，在visible为true的时候，内容将会从 #tab-bar 显示区域底部弹出
 * <m-input label="姓名" disabled="true" v-model="contractInfo.name"></m-input>
 */ -->
<template>
    <li class="detail-panel-item">
        <label class="d-elip f13" v-if="labelWidth" :style="{width:labelWidth+'px'}">{{label}}</label>
        <p class="detail-panel-content d-elip f13"><slot>{{content}}</slot></p>
    </li>
</template>

<script>
export default {
	props: {
		content: {
			required: true
		},
		label: {
			type: String
		},
		labelWidth: {
			default: '100'
		}
	},
	data () {
		return {
		}
	},
	created () {
	},
	methods: {
	}
}
</script>

<style lang="scss">
.detail-panel-item{
    padding:0 15px;
    height: 50px;
    line-height: 50px;
    border-bottom:1px solid #e4e4e4;
    display: flex;
    font-size:14px;
    label{color:#a0a0a0;}
    .detail-panel-content{height: 50px;
      color:#333;
      line-height: 50px;
      width: 100%;
    }
}
</style>
