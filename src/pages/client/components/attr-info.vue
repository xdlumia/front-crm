<!--
/**
* @author 冀猛超
* @name 业务属性
* @date 2019年8月02日
**/
-->
<template>
    <div class="d-relative">
        <scroll-view scroll-y :style="{height:height}" @scrolltolower='getListClientbusiness()'>
            <a
                :url='"/pages/client/attr-detail?id=" + item.id'
                class="attr-item pl15 pr15 d-bg-white mb10 pt10 pb10"
                v-for='(item, index) in list'
                :key='item.id'
            >
                <div class="f13 d-text-black b d-elip">{{item.headline}}</div>
                <div class="d-text-qgray f13 twowrap">{{item.text}}</div>
                <div class="mt10" v-if='item.masterPicArray && item.masterPicArray.length'>
                    <img class="attr-img" v-for='(imgItem, imgIndex) in item.masterPicArray' :key='imgIndex' :src="imgItem.fileUrl" alt="">
                </div>
                <div class='d-center'>
                    <span class="f12 d-text-qgray d-cell">{{item.createTime | timeToStr('hh:ii')}}</span>
                    <span class="f14 d-text-gray" @click.stop='delBusiness(item, index)'>删除</span>
                </div>
            </a>
            <i-load-more
                :tip=" !loading ?'没有更多了':'加载中'"
                :loading="loading"
            />
        </scroll-view>
        <div class="pl15 pr15">
           <a url='/pages/client/add-attr-info' class="add-attr-btn f14 d-text-black d-bg-white ac">+ 添加</a>
        </div>
    </div>
</template>

<script>
export default {
	props: {
		height: {
			type: String,
			default: ''
		},
		query: {
			type: String,
			default () {
				return {}
			}
		}
	},
	data () {
		return {
			params: {
				page: 1,
				limit: 15
			},
			list: [], // 数据列表
			followContent: '', // 跟进内容
			loading: true
		}
	},
	created () {
		this.getListClientbusiness()
	},
	methods: {
		// 获取业务属性列表
		async getListClientbusiness (page) {
			if (!this.loading && !page) return

			if (page) {
				this.params.page = page
			}

			try {
				let params = Object.assign({}, this.params, this.query)
				let resulte = await this.$api.seeCrmService.clientinfoListClientbusiness(params)
				if (resulte.code === 200) {
					// 如果传入了page 则重新赋值
					this.list = page ? resulte.data : [].concat(this.list, resulte.data)
					this.params.page++
					if (resulte.count <= this.list) {
						this.loading = false
					}
				}
			} catch (err) {
				this.list = []
			} finally {

			}
		},

		// 删除业务属性
		delBusiness (item, index) {
			try {
				this.$utils.showModal().then(async () => {
					let resulte = await this.$api.seeCrmService.clientinfoDeleteClientbusiness({ id: item.id })
					if (resulte.code === 200) {
						this.$utils.toast.text('删除成功')
						this.list.splice(index, 1)
					}
				})
			} catch (err) {
				this.$utils.toast.text('删除失败')
			}
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
