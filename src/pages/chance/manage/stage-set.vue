<template>
    <div class='stage-page'>
        <NavBar title='编辑销售阶段' />
        <i-cell-group class="f13">
            <div class="stage-cell f12 ac" v-if="!stageList.length" :key="index">暂无数据</div>
			<div class="stage-cell" v-for="(item, index) in stageList" :key="index">
				<i-row>
					<i-col span="3">
						<p><i class="stage-index">{{index+1}}</i></p>
					</i-col>
					<i-col span="3">
						<span @click="delStage(item,index)"><i-icon type="offline_fill" size="20" color="#eb4d3d" /></span>
					</i-col>
					<i-col span="3">
						<p @click="handlerAction(item)" class="f13">{{item.equityedge}}%</p>
					</i-col>
					<i-col span="2">
						<p @click="handlerAction(item)"><i-icon type="enter" size="20" color="#999" /></p>
					</i-col>
					<i-col span="9" i-class="col-class">
						<i-input class="stage-name" :label-width="0" v-model="item.stageName" placeholder="请输入名称"></i-input>
					</i-col>
					<i-col span="4" class="ar">
						<span v-if="index != 0" @click="farrowthinup(index,item)">
							<uni-icon type="arrowthinup" size="22" color="#999"/>
						</span>
						<span class="d-text-blue ml5" v-if="index != (stageList.length-1)" @click="farrowthindown(index,item)">
							<uni-icon type="arrowthindown" size="22" color="#999"/>
						</span>
					</i-col>
				</i-row>
			</div>

        </i-cell-group>
        <i-cell>
            <div class="ac d-text-gray" @click="addStage()">
                <i class="uni-icon uni-icon-plus-filled f16 mr5" style="color:#4788f4"></i>添加销售阶段
            </div>
        </i-cell>
        <p class="f12 d-text-qgray pl15 mt10 mb10"><i class="uni-icon uni-icon-info-filled f12 mr5"></i>最多可添加5个销售阶段</p>

        <i-cell-group>
            <div class="stage-cell" v-for="(item,index) of resultList" :key="index">
                <i-row>
                    <i-col span="8">
                        <span style="color:#fff">0</span>
                        <span class="ac">{{item.value}}</span>
                    </i-col>

                    <i-col span="16" i-class="col-class">
                        <span class="pl5 f13">{{item.title}}</span>
                    </i-col>

                </i-row>
            </div>
            <i-cell>
                <p class="f12 d-text-qgray"><i class="uni-icon uni-icon-info-filled f12 mr5"></i>结果阶段,无需设置</p>
            </i-cell>
        </i-cell-group>
        <!-- 保存 -->
        <div class="footer-fixed-menu">
            <i-button type="primary" i-class="f16" @click="submit()">保存</i-button>
        </div>
        <!-- 更多 action -->
        <i-actionSheet class="stage-set" :visible="moreShow" :actions="equityList" show-cancel @cancel="handlerAction()" @click="handleMore" />

    </div>
</template>

<script>
// import dragSort from './drag-sort'
export default {
	components: {

	},
	data () {
		return {
			moreShow: false,
			stageList: [],
			stageListDelete: [],
			equityList: [],
			tempRowStage: {},
			resultList: [
				{ title: '赢单', value: '100%' },
				{ title: '输单', value: '0%' },
				{ title: '无效', value: '' }
			]
		}
	},
	created () {
		this.salesstageQueryList()
		this.equityList = this.equityedgeList()
	},
	computed: {
		// 计算拖动按钮高度
		currentListLength () {
			return this.stageList.length
		}
	},
	methods: {
		// 向上移动
		farrowthinup (index, item) {
			this.stageList[index] = this.stageList.splice(index - 1, 1, item)[0]
		},
		// 向下移动
		farrowthindown (index, item) {
			this.stageList[index] = this.stageList.splice(index + 1, 1, item)[0]
		},
		// 获取阶段列表
		equityedgeList () {
			let list = []
			for (var i = 5; i <= 100; i += 5) {
				list.push({ name: i + '%' })
			}
			return list
		},
		// 获取销售阶段列表
		salesstageQueryList () {
			this.$api.seeCrmService.salesstageQueryList()
				.then(res => {
					let data = res.data || []
					// 未删除的数据
					this.stageList = data.filter(item => !item.isDelete)
					this.stageListDelete = data.filter(item => item.isDelete)
				})
		},
		// 添加阶段
		addStage () {
			if (this.stageList.length >= 5) {
				uni.showToast({ title: '最大只能添加5条', icon: 'none' })
				return
			}
			this.stageList.push({ equityedge: '', stageName: '' })
		},
		// 删除阶段列表
		delStage (row, index) {
			row.isDelete = 1 // isDelete 1为删除
			this.stageList.splice(index, 1)
			this.stageListDelete.push(row)
		},
		handlerAction (row) {
			if (row) {
				this.tempRowStage = row
			}
			this.moreShow = !this.moreShow
		},
		handleMore ({ target: { index } }) {
			this.tempRowStage.equityedge = this.equityList[index].name.replace('%', '')
			this.moreShow = !this.moreShow
		},
		// 提交表单
		submit () {
			// 验证
			for (let i = 0; i < this.stageList.length; i++) {
				if (!this.stageList[i].stageName || !this.stageList[i].equityedge) {
					this.$utils.toast.text('阶段赢率和名称是必填项')
					return
				}
				if (this.stageList[i + 1] && +this.stageList[i].equityedge >= +this.stageList[i + 1].equityedge) {
					this.$utils.toast.text('阶段赢率是递增关系')
					return
				}
			}
			// 修改排序
			this.stageList.forEach((item, index) => {
				item.positionNum = index + 1
			})
			// 组合没删除的数据和已删除的数据
			let params = [...this.stageList, ...this.stageListDelete]
			// 调用保存接口
			this.$api.seeCrmService.salesstageUpdateBatch(params)
				.then(res => {
					if (res.code !== 200) return
					// 返回上一页
					this.$routing.navigateBack()
				})
		}
	}
}
</script>

<style lang="scss" scoped>
// 拖动方法样式begin
.drag-sort {
  width: 100%;
}
.drag-sort-item {
  width: 100%;
}
.touch {
  height: 100%;
  width: 50px;
}
.active {
  box-shadow: 0 0 40rpx #DDDDDD;
  z-index: 99;
}
// 拖动方法样式end

    .stage-set{
        /deep/ .i-as{
            height: 80%;
        }
    }
    .stage-cell{
        position: relative;
        padding: 12px 15px;
        background: #fff;
        line-height: 1.4;
        font-size: 14px;
        overflow: hidden;
        border-bottom: 1px solid #f2f2f2;

    }
    .stage-page{
        .stage-name{
            /deep/ .detail-panel-item{
                padding:0;
                border:none
            }
        }
        /deep/ scoped-slots-default{width:100%}
        background: #f2f2f2;
        height: 100vh;
        color:#666;
        .stage-index{
            text-align: center;
            display: inline-block;
            line-height: 20px;
            color:#fff;
            font-size:12px;
            width:20px;
            height: 20px;
            border-radius:50%;
            background:#4788f4;
        };
        /deep/ .col-class{
            position: relative;
            &::before{
                content:'';
                position: absolute;
                left:-5px;
                top:-12px;
                bottom:-12px;
                border-left:1px solid #efefef
            }
        }
    }
</style>
