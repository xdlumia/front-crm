<!-- /**
 * @author 冀猛超
 * @description 公共自定义头部
 * @param {boolean} isSearch 是否显示搜索框
 * @param {string} placeholder 搜索框文案 默认为 搜索
 * @param {string} title 标题

    <NavBar title="首页"  />
 */ -->
<template>
    <div class='nav'>
        <div class='wfull' :style="{ height: `${statusHeight + titleBarHeight}rpx`}"></div>
            <div class='nav-fixed'>
                <div class='status' :style="{height: `${statusHeight}rpx`}"></div>
                <div class='navbar' :style="{height: `${titleBarHeight}rpx`}">

                    <div class="tools-box d-flex">
                        <navigator open-type='navigateBack' class="d-center tools-item">
                            <i-icon type="return" size="18" color='#333' class="b searchiconleft"/>
                        </navigator>
                        <div class="hfull d-center pl30 ml5 search-box-right">
                            <div>
                                <i-icon type="search" size="18" color='#999' class="b searchicon"/>
                                <input class="wfull searchname" type="text" placeholder="搜索成交记录">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="search-jl">
                <span class="d-text-black ml15 mt15">历史搜索</span>
                <span class="d-text-blue f13 mr15 mt15">清除</span>
            </div>
            <div class="search-history p15" style="padding-top: 10px;">
                <div class="d-bg-white p1 searchistory">
                    <span style="color: #666;" class="pl5">小米科技有限责任公司</span>
                    <uni-icon @click="deleteSearchList(index)" class="ml5 fr" type='closeempty' color="#999" size='20'/>
                </div>
            </div>
        </div>
        <button @click="searchData">搜索</button>
    </div>
</template>

<script>
export default {
	props: {
		// title: String, // 标题
		// isSearch: {
		// 	type: Boolean,
		// 	default: false
		// }, // 是否展示搜索
		// placeholder: {
		// 	type: String,
		// 	default: '搜索'
		// }
	},
	data () {
		return {
			statusHeight: 0,
			titleBarHeight: 0
		}
	},
	onReady () {
		let { systemInfo } = this.$store.state
		let titleBarHeight = 0
		if (systemInfo.model.indexOf('iPhone') !== -1) {
			titleBarHeight = 88
		} else {
			titleBarHeight = 96
		}

		this.titleBarHeight = titleBarHeight
		this.statusHeight = systemInfo.statusBarHeight * 2
		this.$local.save('navH', +this.titleBarHeight + +this.statusHeight)
	},
	computed: {
		isBack () {
			return true
		},
		pages () {
			let pageLen = getCurrentPages().length
			return pageLen
		}
	}

}
</script>

<style lang="scss" scoped>
.navbar{
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    padding: 12rpx 20rpx;
    box-sizing: border-box;

    .at-icon{
        line-height: 1.2;
        vertical-align: 0
    }
}

.nav-title, .nav-icon{
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    font-size: 28px;
    color: #000;
}

.tools-box{
    width: 530rpx;
    height: 62rpx;
    border: 1px solid #e4e4e4;
    border-radius: 100px;
    position: relative;
    box-sizing: border-box;
    z-index: 1;

    &:after{
        content: '';
        width: 2rpx;
        height: 32rpx;
        background: #e4e4e4;
        position: absolute;
        top: 50%;
        left: 80rpx;
        transform: translate(-50%, -50%);
    }
    .tools-item{
        width: 80rpx;
        position:relative;
    }
}

.nav-fixed{
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 9999;
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
    .p1{padding:1px}
    .search-box-right{flex:1;border-left:1px solid #DBDBDB;border-radius:20px;background:#F7F7F7;position:relative;}
    .searchname{height:40rpx;padding-left:60rpx}
    .searchicon{position:absolute;left:18rpx;top:-2rpx}
    .searchiconleft{position:absolute;top:-3rpx}
    .searchistory{border: 1px solid #EBEBEB;border-radius: 7px;}
</style>
<style>
/* .tools-item .i-icon{line-height: -0.2} */
</style>
