<!-- /**
 * @author 冀猛超
 * @description 公共自定义头部
 * @param {boolean} isSearch 是否显示搜索框
 * @param {string} placeholder 搜索框文案 默认为 搜索
 * @param {string} title 标题
 * @param {string} searchType 搜索类型 0 => 客户 1 => 机会 2 => 成交记录 3 => 联系人 4 => 公海池

    <NavBar title="首页"  />
 */ -->
<template>
    <div class='nav'>
        <div class='wfull' :style="{ height: `${navHeight - statusBarHeight}px`, 'padding-top': `${statusBarHeight}px` }"></div>
        <div class='nav-fixed'>
            <!-- <div class='status d-bg-white' :style="{height: `${statusBarHeight}rpx`}"></div> -->
            <div class='navbar' :style="{ height: `${navHeight}px`, 'padding-top': `${statusBarHeight}px`}">
                <div class="d-inline">
                    <div class="tools-box d-center" :class="!isHome ? 'noline' : ''" :style="{ height: `${navbarBtn.height}px`, 'margin-top': `${navbarBtn.top}px`, 'margin-left': `${navbarBtn.right}px`}" v-if="pages > 1">
                        <div class="tools-item">
                            <navigator open-type='navigateBack' class="d-center">
                                <i-icon type="return" size="24" color='#000' />
                            </navigator>
                        </div>
                        <div class="tools-item" v-if="isHome">
                            <navigator url='/pages/index/index' open-type='switchTab' class="d-center">
                                <i-icon type="homepage" size="24" color='#000' />
                            </navigator>
                        </div>
                    </div>
                </div>

                <div class='nav-title f16 d-text-black wfull' :style="{ height: `${navbarBtn.height}px`, 'top': `${navbarBtn.top + statusBarHeight}px`, 'padding-right': `${navbarBtn.left}px`}">
                    <div class="ac d-elip b f16" v-if="!isSearch" :style="{'text-indent': `${navbarBtn.left}px`, 'line-height':  `${navbarBtn.height}px`}">
                        {{title}}
                        <slot />
                    </div>

                    <a @click="getSearch" class="search-box ac d-center" v-else :style="{ height: `${navbarBtn.height}px`, 'margin-left': '70px', 'margin-right': '10px'  }">
                        <div style="margin-top:-6rpx" class="d-inline" v-if='!keyword'>
                            <i-icon type="search" size="18" color='#c5c5c5' />
                        </div>
                        <span class="f12" style="color: #575757;">{{keyword || placeholder}}</span>
                    </a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
	props: {
		title: String, // 标题
		isSearch: {
			type: Boolean,
			default: false
		}, // 是否展示搜索
		placeholder: {
			type: String,
			default: '搜索'
		},
		keyword: {
			type: String,
			default: ''
		},
		searchType: {
			type: String,
			default: ''
		},
		isHome: {
			type: Boolean,
			default: true
		}
	},
	data () {
		return {
			statusBarHeight: 0,
			navHeight: 0,
			navbarBtn: {}
		}
	},
	created () {
		// let haveBack;
		// if (getCurrentPages().length === 1) { // 当只有一个页面时，并且是从分享页进入
		//     haveBack = false;
		// } else {
		//     haveBack = true;
		// }
		// this.setData({
		//     haveBack: haveBack, // 获取是否是通过分享进入的小程序
		//     statusBarHeight: statusBarHeight,
		//     navbarHeight: headerPosi.bottom + btnPosi.bottom, // 胶囊bottom + 胶囊实际bottom
		//     navbarBtn: btnPosi
		// })

		/**
         * wx.getMenuButtonBoundingClientRect() 坐标信息以屏幕左上角为原点
         * 菜单按键宽度： 87
         * 菜单按键高度： 32
         * 菜单按键左边界坐标： 278
         * 菜单按键上边界坐标： 26
         * 菜单按键右边界坐标： 365
         * 菜单按键下边界坐标： 58
         */
		const { systemInfo } = this.$store.state
		console.log(systemInfo)
		const headerPosi = systemInfo.menuInfo // 胶囊位置信息
		let statusBarHeight = systemInfo.statusBarHeight

		let btnPosi = { // 胶囊实际位置，坐标信息不是左上角原点
			height: headerPosi.height,
			width: headerPosi.width,
			top: headerPosi.top - statusBarHeight, // 胶囊top - 状态栏高度
			bottom: headerPosi.bottom - headerPosi.height - statusBarHeight, // 胶囊bottom - 胶囊height - 状态栏height （胶囊实际bottom 为距离导航栏底部的长度）
			right: systemInfo.screenWidth - headerPosi.right, // 屏幕宽度 - 胶囊right
			left: systemInfo.screenWidth - headerPosi.left
		}

		this.navHeight = headerPosi.bottom + btnPosi.bottom
		this.navbarBtn = btnPosi
		this.statusBarHeight = systemInfo.statusBarHeight
		this.$local.save('navH', +this.navHeight * 2)
	},
	computed: {
		isBack () {
			return true
		},
		pages () {
			let pageLen = getCurrentPages().length
			return pageLen
		}
	},
	methods: {
		getSearch () {
			let that = this
			uni.$once('updatedate', (data) => {
				that.$emit('getSearch', data)
			})
			this.$routing.navigateTo('/pages/common/search?searchType=' + this.searchType)
		}
	}

}
</script>

<style lang="scss" scoped>
.navbar{
    position: relative;
    border-bottom: 1px solid #e4e4e4;
    // padding: 12rpx 20rpx;
    box-sizing: border-box;
    background: #fff;
    .at-icon{
        line-height: 1.2;
        vertical-align: 0
    }
}

.nav-title, .nav-icon{
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    font-size: 28px;
    color: #000;
}

.tools-box{
    // width: 82px;
    border: 0.5px solid #e4e4e4;
    border-radius: 100px;
    position: relative;
    box-sizing: border-box;
    z-index: 1;
    &.noline{
        &:after{
            display: none;
        }
    }

    &:after{
        content: '';
        width: 2rpx;
        height: 32rpx;
        background: #e4e4e4;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .tools-item{
        width: 50%;
        padding: 0 10px;
        box-sizing: border-box;
    }
}

.nav-fixed{
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 9999;
}

.nav-title{
    // padding: 0 202rpx;
    box-sizing: border-box;
}

.search-box{
    border-radius: 100px;
    border: 0.5px solid #d9d9d9;
    background: #f7f7f7;
    box-sizing: border-box;
}

</style>
