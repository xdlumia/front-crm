<template>
    <div class="d-relative">
        <scroll-view scroll-y :style="{height:height}">
            <a url='/pages/client/attr-detail' class="attr-item pl15 pr15 d-bg-white mb10 pt10 pb10">
                <div class="f13 d-text-black b">CRM管理系统如何解决销售和管理上痛点</div>
                <div class="d-text-qgray f13 twowrap">CRM管理系统如何解决销售和管理上痛点CRM管理系统如何解决销售和管理上痛点CRM管理系统如何解决销售和管理上痛点CRM管理系统如何解决销售和管理上痛点CRM管理系统如何解决销售和管理上痛点</div>
                <div class="mt10">
                    <img class="attr-img" src="http://file.515md.com:8888/%E4%BA%A7%E5%93%81/%E6%96%B0%E4%BA%A7%E5%93%81%E6%96%B9%E5%90%91/%E5%AE%A2%E6%88%B7%E7%AE%A1%E7%90%86v1.0.8/images/1_1客户公海池客户详情/u4305.png" alt="">
                </div>
                <div class='d-center'>
                    <span class="f12 d-text-qgray d-cell">19:38</span>
                    <span class="f14 d-text-gray">删除</span>
                </div>
            </a>
        </scroll-view>
        <div class="pl15 pr15">
           <div class="add-attr-btn f14 d-text-black d-bg-white ac">+ 添加</div>
        </div>
    </div>
</template>

<script>
export default {
	props: {
		height: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
    .attr-img{
        width: 108px;
        height: 64px;
        margin-right: 5px;
        border-top: 1px solid #f9f9f9;
        &:last-child{
            margin-bottom: 0;
        }
    }

    .add-attr-btn{
        height: 32px;
        border: 1px dashed #d9d9d9;
        line-height: 32px;
        border-radius: 5px;
        margin-top: 9px;
    }
</style>
