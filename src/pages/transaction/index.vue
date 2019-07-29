<template>
    <div class="highseas-page">
        <NavBar title='成交记录' />
        <div>
            <div class="page-search-box d-flex" :style="'top: '+ navH">
                <div class="search-input d-center d-cell pl10">
                    <i-icon type="search" size="20" color='#c5c5c5' /><span class="d-text-qgray f14 ml5">搜成交记录名称</span>
                </div>
            </div>
            <!-- <filter-diy @submit='submit' @clear='clear' /> -->
            <Filter :filterData='filterData' @filterSubmit='submit' ref='filter' :top='"calc("+ navH +" + 49px)"'>
				<div  style="padding-bottom:50px">
					<filter-plane :title='transactionStatus.title' :dataList='transactionStatus.list'/>
					<div style="height:10px;background:#F2F2F2"></div>
					<filter-plane title='总金额'>
						<div class="d-flex wfull" style="justify-content:center;alibackground:#FFF;align-items:center;height:60px">
							<div class="page-search-box d-flex" style="background:#f5f6fa;width:90%;position:relative">
								<div class="search-input d-center d-cell pl10 wfull" style="display:flex !important;">
									<input type="text" placeholder='最小值' style="width:40%">
									<div style="width:20%;color:#999">——</div>
									<input type="text" placeholder='最大值' style="width:40%">
								</div>
							</div>
						</div>
					</filter-plane>
					<div style="height:10px;background:#F2F2F2"></div>
					<filter-plane title='成交时间' :dataList='transactionTime'/>
				</div>

                <div class='filter-btn d-center f18 d-text-blue'>
                    <div class='btn-item hfull d-cell ac' @click='clear'>清空</div>
                    <div class='btn-item hfull d-cell ac d-text-white' @click='submit' style='background: #4788F4'>完成</div>
                </div>
            </Filter>
        </div>

		<a url='/pages/transaction/detail' class='highseas-list-view d-relative'>
			<scroll-list
				:height="'calc(100vh - ' + navH +' - 40px - 49px)'"
				api="bizSystemService.getUserAuth"
				:params="queryForm"
				v-slot="{ row }"
			>
				<div class="pb10 pt10 pl15 pr15 highseas-item d-center d-bg-white">
                    <div class="d-cell">
                        <div class="f13 d-text-black">房屋租赁</div>
                        <div class="f12 d-text-qgray">客户：北京皇城责任有限公司</div>
                        <div class="f12 d-text-qgray">成交金额：86582元</div>
                    </div>
                    <div class="d-center">
                        <div class="f13 d-text-qgray">已成交</div>
                    </div>
                </div>
			</scroll-list>

			<div class="footer-fixed-menu d-center d-bg-white">
				<a url='/pages/transaction/transaction-add' class="d-cell al">
					<uni-icon type='plus' size='16' color='#1890FF' /><span class="ml5 f13  d-text-gray">新建成交</span>
				</a>
				<a class="d-cell ar">
					<i-icon type='setup' size='18' color='#1890FF' /><span class="ml5 f13  d-text-gray">管理成交记录</span>
				</a>
			</div>
		</a>
    </div>
</template>

<script>
import Filter from '@/components/filter'
import FilterPlane from '@/components/filter-plane'
export default {
	components: {
		Filter,
		FilterPlane
		// FilterDiy
	},
	data () {
		return {
			queryForm: {},
			transactionStatus: {
				title: '成交记录状态',
				list: [{
					name: '结束',
					id: '1'
				},
				{
					name: '进行中',
					id: '2'
				},
				{
					name: '进行中',
					id: '2'
				},
				{
					name: '进行中',
					id: '2'
				},
				{
					name: '进行中',
					id: '2'
				}]
			},
			transactionTime: [
				{
					name: '本周',
					id: '1'
				},
				{
					name: '本季',
					id: '2'
				},
				{
					name: '本年',
					id: '3'
				},
				{
					name: '上周',
					id: '4'
				},
				{
					name: '上月',
					id: '5'
				}
			],
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
						},
						{
							id: 2,
							name: '我参与的'
						},
						{
							id: 3,
							name: '我下属的'
						}
					]
				},
				{
					prop: 'b',
					current: { id: 0, name: '创建日期' },
					list: [
						{
							id: 0,
							name: '创建日期'
						},
						{
							id: 1,
							name: '最新修改日期'
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
        .search-input{
            display: block;
            height: 100%;
            border-radius: 3px;
            background: #fff;
            line-height: 29px;
        }
    }

    .filter-btn{
		position: absolute;
		width: 100%;
		background: #fff;
		height: 49px;
		bottom: 0;
		.btn-item{
			line-height: 49px;
		}
	}

	.diy-filter{
		padding-bottom: 50px;
		box-sizing: border-box;
		background: #f2f2f2;
	}

</style>
