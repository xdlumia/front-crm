<template>
	<div class="score-manage-page">
		<NavBar title="客户评分"/>

		<div class="pb20" v-for='(item, index) in scoreData' :key='index'>
			<div class='d-bg-white'>
				<i-select labelWidth='230' :props="{label:'name',value:'id'}" label="字段名称一" :options="upData" />
				<i-input labelWidth='230' label="权重" type='number' placeholder="请输入" ><span>%</span></i-input>
			</div>
			<div class='d-center score-rule pl15 pr15'>
				<div class="d-cell f13 d-text-black">评分规则条件</div>
				<div class="btn-score f12" @click='addChildField(index)'>添加字段</div>
			</div>

			<div class="mb5 d-bg-white" v-for='(subItem, subIndex) in item.child' :key='subIndex'>
				<i-select labelWidth='230' :props="{label:'name',value:'id'}" label="行业一" :options="upData" />
				<div class="d-center">
					<i-input labelWidth='230' label="计算评分为" type='number' placeholder="请输入" ><span>%</span></i-input>
				</div>
			</div>
		</div>

		<div class="d-center mt20">
			<div class="btn-score f12" @click="addParentField">添加更多字段</div>
		</div>

		<div class="pl15 pr15 sub-btn">
            <i-button type="primary" i-class="f16">保存</i-button>
        </div>

	</div>
</template>
<script>
export default {
	components: {
	},
	data () {
		return {
			upData: [
				{
					name: '1', id: 1
				}
			],
			scoreData: [{ child: [] }]
		}
	},
	onLoad (option) {
	},
	methods: {
		addParentField () {
			this.scoreData.push({
				child: []
			})
		},
		addChildField (parentIndex) {
			this.scoreData[parentIndex].child.push({})
		}
	},
	created () {},
	computed: {
	}
}
</script>

<style lang="scss" scoped>
.score-manage-page{
	height: 100vh;
	background: #f2f2f2;
	padding-bottom: 80px;
	box-sizing: border-box;
}

.score-rule{
	height: 46px;

}
.btn-score{
	padding: 0 20px;
	height: 27px;
	border-radius: 3px;
	border: 1px solid #1890ff;
	text-align: center;
	line-height: 27px;
	color: #1890ff;
	background: #fff;
}

.sub-btn{
	position: fixed;
	left: 0;
    right: 0;
	bottom: 26px;
}
</style>
