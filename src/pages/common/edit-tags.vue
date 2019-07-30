<!-- 编辑标签-->
<!-- 徐贺 -->
<template>
<div class="d-bg-white">
    <NavBar title="编辑标签"/>
  <div style="height: 10px;background: #f2f2f2;"></div>
  <div class="toptrasaction">
       <span class="d-text-black fl ml15">标签名称</span>
       <span class='fr mr15'>
         <span class="d-text-gray f12">成交状态</span>
         <uni-icon type='arrowright' size='16' color='#696969'/>
       </span>
   </div>
   <div style="height: 10px;background: #f2f2f2;"></div>

  <div class="moreinfo" style="justify-content: space-between;">
       <div>
         <div class="hfull flexcenter fl">
        <uni-icon @click="deleteMoreList(index)" class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20'/>
      </div>
      <div class="d-text-black ml5 fl">已成交</div>
       </div>
    <div class="fr mr15">
      <div class="ac d-text-blue m5 fr">
        <uni-icon type='bars' size='18' color='#999' />
      </div>
    </div>
  </div>

  <div class="moreinfo" style="justify-content: space-between;">
       <div>
         <div class="hfull flexcenter fl">
        <uni-icon @click="deleteMoreList(index)" class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20'/>
      </div>
      <div class="d-text-black ml5 fl">未成交</div>
       </div>
    <div class="fr mr15">
      <div class="ac d-text-blue m5 fr">
        <uni-icon type='bars' size='18' color='#999' />
      </div>
    </div>
  </div>

  <div class="moreinfo d-flex" v-for="(item,index) in infoList" :key='index'>
    <div class="hfull flexcenter">
      <uni-icon @click="deleteMoreList(index)" class="ml15 fr" type='minus-filled' color="#EB4D3D" size='20'/>
    </div>
    <input v-model="userName" placeholder="输入选项名称" class="ml5" style="flex: 1;"/>
    <div style="calc(100vw - 310px)" class="hfull flexcenter mr15">
      <div class="ac d-text-blue m5 subButton">
        <span class="f13">确定</span>
      </div>
    </div>
  </div>

   <div class="moreinfo" @click="moreAdd">
    <div class="ml15">
      <uni-icon type='plus-filled' size='18' color='#4889F4' />
      <span class="d-text-black ml10">添加标签选项</span>
    </div>
  </div>
</div>
</template>
<script>
export default {
	components: {
	},
	data () {
		return {
			infoList: [{ name: 1, id: 1 }]
		}
	},
	onLoad (option) {
	},
	methods: {
		moreAdd () {
			this.infoList.push({ name: 1, id: 1 })
		},
		deleteMoreList (index) {
			this.infoList.splice(index, 1)
		}
	},
	created () {},
	computed: {
	}
}
</script>

<style lang="scss" scoped>
.toptrasaction{height: 60px;line-height: 60px;}
.moreinfo{height: 60px;border-bottom:1px solid #f2f2f2;display: flex;align-items: center;border-top:1px solid #F2F2F2;}
.subButton{width: 63px;height: 25px;line-height: 25px;border: 1px dashed #4889F4;border-radius: 5px;}
.flexcenter{display: flex;justify-content: center;align-items: center;}
</style>
<style lang="scss">
page {
  background-color: #f2f2f2;
  padding-bottom: 140upx;
}
</style>
