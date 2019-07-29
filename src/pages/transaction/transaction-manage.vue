<template>
<div class="d-bg-white" style="heigth:100vh">
    <NavBar title="管理成交记录"/>
    <a url='/pages/common/information-set' class="toptrasaction">
       <span class="d-text-black fl ml15">成交记录信息设置</span>
       <uni-icon type='arrowright' size='16' color='#696969' class='fr mr15'/>
   </a>
   <div class="downtrasaction">
           <span class="d-text-gray f12 ml15">可以设置成交记录有哪些基本信息</span>
   </div>
   <a url='/pages/common/info-set' class="toptrasaction">
       <span class="d-text-black fl ml15">成交记录标签管理</span>
       <uni-icon type='arrowright' size='16' color='#696969' class='fr mr15'/>
   </a>
   <div class="downtrasaction">
           <span class="d-text-gray f12 ml15">可以自定义成交记录标签，比如成交状态</span>
   </div>
</div>
</template>
<script>
export default {
	components: {
	},
	data () {
		return {}
	},
	onLoad (option) {},
	methods: {

	},
	created () {},
	computed: {
	}
}
</script>

<style lang="scss" scoped>
.downtrasaction{height:40px;line-height:40px;background: #f2f2f2;}
.toptrasaction{height: 60px;line-height: 60px;}
</style>
<style lang="scss">
page {
  background-color: #f2f2f2;
  padding-bottom: 140upx;
}
</style>
