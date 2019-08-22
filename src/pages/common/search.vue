<!-- /**
 * @author 徐贺
 * @description 公共搜索框
 */ -->
<template>
    <div class='nav'>
        <div class='wfull' :style="{ height: `${statusHeight + titleBarHeight}rpx`}"></div>
		<div class='nav-fixed d-relative'>
			<div class='status' :style="{height: `${statusHeight}rpx`}"></div>
			<div class='navbar' :style="{height: `${titleBarHeight}rpx`}">

				<div class="tools-box d-flex d-relative">
					<navigator open-type='navigateBack' class="d-center tools-item">
						<i-icon type="return" size="20" color='#333' class="b searchiconleft"/>
					</navigator>
					<div @click="isSearch = true" v-if="!isSearch" class="hfull d-center ml5 search-box-right">
						<div style="display:flex;align-items: center;justify-content: space-between;">
							<i-icon type="search" size="16" color='#999' class="b searchicon"/>
							<span class="f12" style="color:rgba(0, 0, 0, 0.647058823529412)">{{searchNameForm[busType]}}</span>
						</div>
					</div>
					<div v-if="isSearch" class="hfull wfull d-center ml5 search-box-right">
						<input v-model='searchInfo' @confirm="searchData" class="wfull searchname f12" type="search" :placeholder="searchNameForm[busType]" focus>
						<span @click="isSearch = false,searchInfo = ''" style="position:absolute;right:10px;z-index:999">
							<i-icon type="delete" size="16" color='#999' class="b searchicon"/>
						</span>
					</div>
				</div>
			</div>

			<div class="search-jl">
				<span class="d-text-black ml15 mt15">历史搜索</span>
				<span @click="deleteSearchList()" class="d-text-blue f13 mr15 mt15">清除</span>
			</div>
			<div class="search-history p15" style="padding-top: 10px;" v-if="searchHistoryList.length > 0">
				<div class="d-bg-white p1 searchistory mr5 mb5" v-for="(item,index) in searchHistoryList" :key="index">
					<span style="color: #666;" class="pl5 pr5" @click="clickToSearch(item)">{{item}}</span>
					<uni-icon @click="deleteSearchList(index)" class="fr" type='closeempty' color="#999" size='20'/>
				</div>
			</div>
			<div v-if="isSearch" style="width:100%;background:#FFF;z-index:999;" :style="{top:`${statusHeight + titleBarHeight}rpx`}" class="hfull d-absolute">
				<div @click="clickToSearch(item)" style="justify-content: space-between;height:40px;border-bottom:1px solid #EBEBEB;display:flex;align-items: center;color:#666" v-for="(item,index) in searchHistoryList" :key="index">
					<span>
						<i-icon type="search" size="16" color='#999' class="b searchicon ml15"/>
						<span class="ml10">{{item}}</span>
					</span>
					<uni-icon type='arrowthinup' class="fr mr15" color="#000" style="transform:rotate(-30deg);" size='20'/>
				</div>
			</div>
		</div>

    </div>
</template>

<script>
const searchType = {
	0: 'client', // 客户
	1: 'chance', // 机会
	2: 'trasaction', // 成交记录
	3: 'contact', // 联系人
	4: 'highseas' // 公海池
}
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
			isSearch: false,
			statusHeight: 0,
			titleBarHeight: 0,
			searchInfo: '',
			searchHistoryList: [],
			searchForm: {
				trasaction: [],
				chance: [],
				client: [],
				contact: [],
				highseas: []
			},
			searchNameForm: {
				0: '搜索客户',
				1: '搜索销售机会名称',
				2: '搜索成交记录名称',
				3: '搜索联系人',
				4: '搜客户名称'
			},
			optionType: 'client',
			busType: 0
		}
	},
	onLoad (option) {
		this.optionType = searchType[option.searchType] || 0
		this.busType = option.searchType
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

		this.searchForm = this.$local.fetch('searchForm') || {}
		if (Object.keys(this.searchForm).length > 0) {
			this.searchHistoryList = this.searchForm[this.optionType] || []
		}
		// console.log(this.searchForm)
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
		clickToSearch (item) {
			// console.log(item)
			uni.$emit('updatedate', { searchInfo: item })
			this.$routing.navigateBack()
		},
		// 进行搜索的方法
		searchData () {
			if (this.searchHistoryList.length > 0) {
				if (this.searchInfo && this.searchHistoryList.indexOf(this.searchInfo) < 0) {
					this.searchHistoryList.push(this.searchInfo)
				}
			} else {
				if (this.searchInfo) {
					this.searchHistoryList.push(this.searchInfo)
				}
			}
			this.searchForm[this.optionType] = this.searchHistoryList
			this.$local.save('searchForm', this.searchForm)

			uni.$emit('updatedate', { searchInfo: this.searchInfo })
			this.$routing.navigateBack()
		},
		// 删除和清空
		deleteSearchList (index) {
			if (index) {
				this.searchHistoryList.splice(index, 1)
			} else {
				this.searchHistoryList = []
			}
			this.searchForm[this.optionType] = this.searchHistoryList
			this.$local.save('searchForm', this.searchForm)
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
    .searchicon{line-height:1}
    .searchiconleft{position:absolute;line-height:1}
    .searchistory{border: 1px solid #EBEBEB;border-radius: 7px;}
</style>
<style>
/* .tools-item .i-icon{line-height: -0.2} */
</style>
