<!--
/**
* @author 冀猛超
* @name 跟进记录
* @date 2019年8月02日
**/
-->
<template>
    <div class="note-box">
        <div class="note-search-box d-center">
            <input class="search-input f13 d-text-black pl10 d-cell" v-model.trim='followContent' placeholder="请填写跟进内容，快速跟进" type="text">
            <div class='f13 d-text-blue ml15' @click='saveFollowup'>快速跟进</div>
        </div>
        <scroll-view scroll-y :style="{height: height}" @scrolltolower='getFollowup()'>

            <div class='d-bg-white' v-for='(item, index) in list' :key='item.id'>
                <div class="note-time-title pt15 pb15 f12 d-text-qgray">
                {{item.createTime | timeToStr('yyyy-mm-dd')}}
                </div>
                <i-swipeout  i-class="i-swipeout-demo-item" :operateWidth="80" @change='delFollowup(item, index)' :actions="[{
                    name : '删除',
                    color : '#fff',
                    fontsize : '14',
                    width : 50,
                    background : '#f5222d'
                }]">
                    <div slot="content">
                        <div class="pl15 pr15 pb10 pt10">
                            <div class="d-center">
                                <span class="f14 d-text-blue mr30">{{item.creatorName}}</span>
                                <span class="d-cell f12 d-text-gray">{{item.createTime | timeToStr('hh:ii')}}</span>
                                <span class='note-tag f12 d-text-white' v-show='item.followType'>{{item.followType | dictionary('CRM_GJLX')}}</span>
                            </div>
                            <div class="note-content mb5">
                                {{item.content}}
                            </div>
                            <div class='d-flex' v-if='item.files && item.files.length'>
                                <img class="note-img" v-for='imgItem in item.files' :key='imgItem.id' :src="imgItem.fileUrl" />
                            </div>
                            <div class="mb5" v-if='item.linkName'>
                                <uni-tag size='small' :text="'关联联系人：' + item.linkName" circle />
                            </div>
                            <div class="d-flex">
                                <div class="mr10">
                                    <uni-tag size='small' :text="item.intention | dictionary('CRM_YXCD')" circle />
                                </div>
                                <uni-tag size='small' :text="'下次通话时间：' + item.nextTime | timeToStr('yyyy-mm-dd')" circle/>
                            </div>
                        </div>
                    </div>
                </i-swipeout>
            </div>

            <i-load-more
                :tip=" !loading && !list.length ? '暂无数据' : !loading ? '没有更多了' : '加载中'"
                :loading="loading"
            />

        </scroll-view>
    </div>
</template>

<script>
export default {
	props: {
		height: {
			type: String,
			default: ''
		},
		// 跟进记录列表额外的参数
		query: {
			type: Object,
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
		this.getFollowup()
		uni.$on('updateFollow', () => {
			this.getFollowup(1)
		})
	},
	methods: {

		// 获取列表
		async getFollowup (page) {
			if (!this.loading && !page) return

			if (page) {
				this.params.page = page
			}

			try {
				let params = Object.assign({}, this.params, this.query)
				let resulte = await this.$api.seeCrmService.followupList(params)
				if (resulte.code === 200) {
					this.list = page ? resulte.data : [].concat(this.list, resulte.data)
					this.params.page++
					if (resulte.count <= this.list.length) {
						this.loading = false
					}
				}
			} catch (err) {
				this.list = []
			} finally {

			}
		},

		// 删除跟进记录
		delFollowup (item, index) {
			try {
				this.$utils.showModal().then(async () => {
					let resulte = await this.$api.seeCrmService.followupLogicDelete({ id: item.id })
					if (resulte.code === 200) {
						this.$utils.toast.text('删除成功')
						this.list.splice(index, 1)
					}
				})
			} catch (err) {
				this.$utils.toast.text('删除失败')
			} finally {

			}
		},

		// 快速跟进
		async saveFollowup () {
			let content = this.followContent
			if (!content) return this.$utils.toast.text('跟进内容不能为空')
			try {
				let resulte = await this.$api.seeCrmService.followupSave({
					...this.query,
					content: content
				})
				if (resulte.code === 200) {
					this.getFollowup(1)
					this.followContent = ''
				}
			} catch (err) {
				this.$utils.toast.text('添加失败')
			} finally {

			}
		}
	}
}
</script>

<style lang="scss" scoped>
    .note-box{
        .note-time-title{
            background: #f9f9f9;
            position: relative;
            padding-left: 36px;
            &:before{
                content: "";
                width: 10px;
                height: 10px;
                background: #fca444;
                border-radius: 100px;
                border: 3px solid #fbc68d;
                position: absolute;
                top: 50%;
                left: 7px;
                transform: translateY(-50%);
                z-index: 2;
            }

            &:after{
                content: '';
                width: 1px;
                position: absolute;
                top: 0;
                left: 15px;
                bottom: 0;
                background: #d9d9d9;
                z-index: 1;
            }
        }

        .note-img{
            display: block;
            width: 87px;
            height: 91px;
            margin: 0 8px 8px 0;
        }

        .note-tag{
            width: 69px;
            height: 21px;
            line-height: 21px;
            text-align: center;
            background: #fca544;
            border-radius: 3px;
        }

    }

    .note-search-box{
        height: 29px;
        padding: 10px 15px;
        background: #f2f2f2;
        .search-input{
            display: block;
            height: 100%;
            border-radius: 3px;
            background: #fff;
            line-height: 29px;
        }
    }
</style>
