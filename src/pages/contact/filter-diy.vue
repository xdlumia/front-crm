<template>
  <div>
    <scroll-view class="diy-filter" :style='"height: calc(100vh - "+ navH + " - 40px)"' scroll-y>
      <filter-plane title="姓名">
        <div class="pb10 wfull">
          <input class="filter-input" name="name" v-model="name" placeholder="请输入关键字" type="text" />
        </div>
      </filter-plane>
      <filter-plane
        :title="item.title"
        :dataList="item.datalist"
        v-for="(item, index) in filterList"
        :key="index"
      />
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
let filterList = [];
['创建日期'].forEach(item => {
	filterList.push({
		title: item,
		datalist: [
			{
				id: 1,
				name: '数据测试'
			}
		]
	})
})

export default {
	components: {
		FilterPlane
	},
	data () {
		return {
			name: '',
			filterList: filterList,
			principal: []
		}
	},
	methods: {
		addPrincipal () {
			this.principal.push({
				name: '荒寂'
			})
		},
		clear () {
			this.$emit('clear')
		},
		submit () {
			this.$emit('submit')
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
