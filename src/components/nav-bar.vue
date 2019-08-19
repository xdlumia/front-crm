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
        <div class='wfull' :style="{ height: `${statusHeight + titleBarHeight}rpx`}"></div>
        <div class='nav-fixed'>
            <div class='status' :style="{height: `${statusHeight}rpx`}"></div>
            <div class='navbar' :style="{height: `${titleBarHeight}rpx`}">

                <div class="tools-box d-center" v-if="pages > 1">
                    <navigator open-type='navigateBack' class="d-center tools-item">
                        <i-icon type="return" size="24" color='#000' />
                    </navigator>
                    <navigator url='/pages/index/index' open-type='switchTab' class="d-center tools-item">
                        <i-icon type="homepage" size="24" color='#000' />
                    </navigator>
                </div>

                <div class='nav-title f16 d-text-black wfull'>
                    <div class="ac d-elip b f16" v-if="!isSearch">
                        {{title}}
                        <slot />
                    </div>

                    <a @click="getSearch" class="search-box ac" v-else>
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
		}
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
    width: 162rpx;
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
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .tools-item{
        width: 50%;
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

.nav-title{
    padding: 0 202rpx;
    box-sizing: border-box;
}

.search-box{
    border-radius: 100px;
    border: 1px solid #d9d9d9;
    background: #f7f7f7;
    height: 62rpx;
    line-height: 62rpx;
}

</style>
