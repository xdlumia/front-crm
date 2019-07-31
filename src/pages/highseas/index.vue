<template>
    <div class="highseas-page">
        <NavBar >
			<a url='./choose-highseas' class='d-center f16'>
				华北公海池<i-icon type="unfold" size='18' color='#000' />
			</a>
		</NavBar>
        <div>
            <div class="page-search-box d-flex" :style="'top: '+ navH">
                <div class="search-input d-center d-cell pl10">
                    <i-icon type="search" size="20" color='#c5c5c5' /><span class="d-text-qgray f14 ml5">搜索客户名称</span>
                </div>
            </div>
            <!-- <filter-diy @submit='submit' @clear='clear' /> -->
            <Filter :filterData='filterData' @filterSubmit='submit' ref='filter' :top='"calc("+ navH +" + 49px)"'>

            </Filter>
        </div>

		<div class='highseas-list-view d-relative'>
			<scroll-list
				:height="'calc(100vh - ' + navH +' - 40px - 49px)'"
				api="bizSystemService.getUserAuth"
				:params="queryForm"
				v-slot="{ row }"
			>
				<a  url='/pages/client/detail' class="pb10 pt10 pl15 pr15 highseas-item d-center d-bg-white">
                    <div class="d-cell">
                        <div class="f13 d-text-black">北京奥运会有限责任公司</div>
                        <div class="f12 d-text-qgray">退回时间：2019-06-03 15:33</div>
                        <div class="f12 d-text-qgray">退回次数：0</div>
                    </div>
                    <div class="d-center">
                        <div class="mr15">
                            <uni-tag text="领取" type='primary' inverted size='small'></uni-tag>
                        </div>
                        <div @click.stop='$routing.navigateTo("/pages/index/colleagueChoose")' class="mr10">
                            <uni-tag text="分配" type='primary' inverted size='small'></uni-tag>
                        </div>
                    </div>
                </a>
			</scroll-list>

			<div class="footer-fixed-menu d-center d-bg-white">
				<a url='./add-client' class="d-cell al">
					<uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">新建客户</span>
				</a>
				<a url='./setting' class="d-cell ar">
					<i-icon type='setup' size='18' color='#1890FF' /><span class="ml5 f13  d-text-gray">管理</span>
				</a>
			</div>
		</div>
    </div>
</template>

<script>
import Filter from '@/components/filter'
// import FilterDiy from './components/filter-diy'
export default {
	components: {
		Filter
		// FilterDiy
	},
	data () {
		return {
			queryForm: {},
			filterData: [
				{
					prop: 'a',
					current: { id: 0, name: '全部' },
					list: [
						{
							id: 0,
							name: '全部'
						},
						{
							id: 1,
							name: '我负责的'
						}
					]
				},
				{
					prop: 'b',
					current: { id: 0, name: '时间' },
					list: [
						{
							id: 0,
							name: '时间'
						},
						{
							id: 1,
							name: '最新跟进时期'
						}
					]
				}
			]
		}
	},
	onReady () {
		let selects = {}
		this.filterData.forEach(item => {
			selects[item.prop] = item.current || item.list[0]
		})
		this.filterSelect = selects
	},
	methods: {
		submit (item) {
			this.$refs.filter.hide()
		},
		clear () {
			this.$refs.filter.hide()
		}
	}
}
</script>

<style scoped lang="scss">

	.highseas-page{
		height: 100vh;
		background: #f2f2f2;
	}
	.highseas-list-view{
		margin-top: 87px;
		box-sizing: border-box;
		padding-bottom: 110px;
	}
	.highseas-item{
		border-bottom:1px solid #d7d7d7;
	}
	.highseas-tags{
		align-items: center;
	}

    .page-search-box{
        height: 29px;
        padding: 10px 15px;
        background: #f2f2f2;
        position: fixed;
        right: 0;
        left: 0;
		z-index: 10;
        .search-input{
            display: block;
            height: 100%;
            border-radius: 3px;
            background: #fff;
            line-height: 29px;
        }
    }

</style>
