<template>
  <div>
    <scroll-view class="diy-filter" :style='"height: calc(100vh - "+ navH + " - 40px)"' scroll-y>
      <filter-plane title="姓名">
        <div class="pb10 wfull" style="box-sizing:border-box">
          <input class="filter-input" name="linkmanName" v-model="filterData.linkmanName" placeholder="请输入关键字" type="text" />
        </div>
      </filter-plane>
      <filter-plane title='创建日期' v-model='filterData.createTimeType' isSingle :dataList='dateList'/>

    </scroll-view>
    <div class="filter-btn d-center f18 d-text-blue">
      <div class="btn-item hfull d-cell ac" @click="clear">清空</div>
      <div
        class="btn-item hfull d-cell ac d-text-white"
        @click="submit"
        style="background: #4788F4"
      >完成</div>
    </div>
  </div>
</template>
<script>
import FilterPlane from '@/components/filter-plane'
let dateList = [
	{ code: '0', content: '本周' },
	{ code: '5', content: '本月' },
	{ code: '1', content: '本季' }
]
export default {
	components: {
		FilterPlane
	},
	data () {
		return {
			dateList: dateList,
			filterData: {
				linkmanName: '', // 联系人名称
				createTimeType: '', // 创建日期
				sourceCode: []
			}
		}
	},
	methods: {
		clear () {
			Object.assign(this.filterData, this.$options.data().filterData)
		},
		submit (item) {
			this.$emit('submit', this.filterData)
		}
	}
}
</script>

<style lang="scss" scoped>
.filter-input {
  width: 100%;
  height: 30px;
  border: 3px solid #efefef;
  border-radius: 2px;
  padding: 0 15px;
  font-size: 12px;
  display: block;
}
.filter-btn {
  position: absolute;
  width: 100%;
  background: #fff;
  height: 49px;
  bottom: 0;
  .btn-item {
    line-height: 49px;
  }
}

.diy-filter {
  padding-bottom: 50px;
  box-sizing: border-box;
  background: #f2f2f2;
}
</style>
