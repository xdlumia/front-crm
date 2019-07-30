<template>
    <div class="highseas-page">
        <NavBar title='成交记录' />
        <div class="page-search-box d-flex">
            <div class="search-input d-center d-cell pl10">
                <!-- <i-icon type="search" size="20" color='#c5c5c5' /><span class="d-text-qgray f14 ml5"><input placeholder="搜成交记录名称" /></span> -->
                <i-icon style='position: absolute;left: 3px;top: 0px;' type="search" size="20" color='#c5c5c5' />
                <input style="padding-left: 15px;height: 29px;" placeholder="搜成交记录名称" />
            </div>
        </div>
        <div class="search-jl">
            <span class="d-text-black ml15">历史搜索</span>
            <span class="d-text-blue f13 mr15">清除</span>
        </div>
        <div class="search-history p15" style="padding-top: 10px;">
            <div class="d-bg-white p3" style="border: 1px solid #EBEBEB;border-radius: 7px;">
                <span style="color: #666;" class="pl5">小米科技有限责任公司</span>
                <uni-icon @click="deleteSearchList(index)" class="ml5 fr" type='closeempty' color="#999" size='20'/>
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
		}
	},
	onReady () {
	},
	methods: {
		deleteSearchList (index) {

		}
	}
}
</script>

<style scoped lang="scss">

    .highseas-page{
        height: 100vh;
        background: #f2f2f2;
    }

    .page-search-box{
        height: 29px;
        padding: 10px 15px;
        background: #f2f2f2;
        .search-input{
            position: relative;
            display: block;
            height: 100%;
            border-radius: 3px;
            background: #fff;
            line-height: 29px;
        }
    }
    .search-jl{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .search-history{
        display: flex;
        flex-wrap: wrap;
    }
    .p3{padding:3px}

</style>
