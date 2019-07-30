<template>
    <div class='stage-page'>
        <NavBar title='编辑销售阶段' />
        <i-cell-group class="f13">
            <!-- <dragSort  v-slot="{ row,index }" :list="resultList" @change="onDragSortChange"> -->
                <i-cell class="wfull" v-for="(item,index) of resultList" :key="index">
                    <i-row>
                        <i-col span="3">
                            <i class="stage-index">{{index}}</i>
                        </i-col>
                        <i-col span="3">
                            <span><i-icon type="offline_fill" size="20" color="#eb4d3d" /></span>
                        </i-col>
                        <i-col span="4">
                            <p @click="handlerAction()" class="f13">80%</p>
                        </i-col>
                        <i-col span="2">
                            <p @click="handlerAction()"><i-icon type="enter" size="20" color="#999" /></p>
                        </i-col>
                        <i-col span="8" i-class="col-class">
                        <span class="pl5 f13">{{row.title}}</span>
                        </i-col>
                        <i-col span="4" class="ar">
                            <i class="uni-icon uni-icon-bars f16"></i>
                        </i-col>
                    </i-row>
                </i-cell>
            <!-- </dragSort> -->

            <i-cell>
                <div class="ac d-text-gray" @click="addStage()">
                    <i class="uni-icon uni-icon-plus-filled f16 mr5" style="color:#4788f4"></i>添加销售阶段
                </div>
            </i-cell>
        </i-cell-group>
        <p class="f12 d-text-qgray pl15 mt10 mb10"><i class="uni-icon uni-icon-info-filled f12 mr5"></i>最多可添加5个销售阶段</p>

        <i-cell-group>
            <i-cell v-for="(item,index) of resultList" :key="index">
                <i-row>
                    <i-col span="8">
                        <span style="color:#fff">0</span>
                        <span class="ac">{{item.value}}</span>
                    </i-col>

                    <i-col span="16" i-class="col-class">
                        <span class="pl5 f13">{{item.title}}</span>
                    </i-col>

                </i-row>
            </i-cell>
            <i-cell>
                <p class="f12 d-text-qgray"><i class="uni-icon uni-icon-info-filled f12 mr5"></i>结果阶段,无需设置</p>
            </i-cell>
        </i-cell-group>
        <!-- 保存 -->
        <div class="footer-fixed-menu">
            <i-button type="primary" i-class="f16">保存</i-button>
        </div>
        <!-- 更多 action -->
        <i-actionSheet :visible="moreShow" :actions="moreActions" show-cancel @cancel="handlerAction('moreShow')" @click="handleMore" />

    </div>
</template>

<script>
let moreActionsTitle = ['0', '50', '100', '80', '90']
let moreActions = moreActionsTitle.map(item => ({ name: item }))
export default {

	data () {
		return {
			moreActions: moreActions,
			moreShow: false,
			upData: [{ name: '测试', id: 1 }, { name: '发邮件', id: 2 }, { name: '发短信', id: 3 }],
			resultList: [
				{ title: '赢单', value: '100%' },
				{ title: '输单', value: '0%' },
				{ title: '无效', value: '' }
			]
		}
	},
	methods: {
		addStage () {
			this.resultList.push({})
			console.log('添加阶段')
		},
		// onDragSortChange (e) {
		// 	console.log(e)
		// 	// frontData 插到谁后面
		// 	// data 操作的数据
		// },
		handlerAction (item) {
			this.moreShow = !this.moreShow
		}
	}
}
</script>

<style lang="scss" scoped>
    .stage-page{
        /deep/ scoped-slots-default{width:100%}
        background: #f2f2f2;
        height: 100vh;
        color:#666;
        .stage-index{
            text-align: center;
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
