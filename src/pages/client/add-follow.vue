<template>
    <div class='add-follow-page'>
        <NavBar title='跟进客户' />
        <div class="mt10 d-bg-white">

            <picker :value="upTypeIndex" :range="upData" @change='change($event, "upTypeIndex")'>
                <div class="form-row isarrow d-center">
                        <div class="f13 d-text-black form-row-item form-row-label">
                            跟进类型
                        </div>
                        <div class="d-cell mr10 form-row-item">
                            <input type="text" disabled class='f12 d-text-gray' :placeholder="upData[upTypeIndex] || '请选择跟进类型'">
                        </div>
                </div>
            </picker>

            <div class="form-row isarrow d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    联系人
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" disabled class='f12 d-text-gray' placeholder="请选择">
                </div>
            </div>

            <div class="form-row isarrow d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    销售机会
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" disabled class='f12 d-text-gray' placeholder="请选择">
                </div>
            </div>

            <picker mode="date" @change='change($event, "timeData")'>
                <div class="form-row d-center">
                    <div class="f13 d-text-black form-row-item form-row-label">
                        下次联系时间
                    </div>
                    <div class="d-cell mr10 form-row-item">
                        <input type="text" disabled class='f12 d-text-gray' :placeholder="timeData || '请选择'">
                    </div>
                    <div> <i class="iconfont f16 iconshouye_chengjiaoshujurili" style="color: #5a5a5a;"></i></div>
                </div>
            </picker>
            <picker :value="levelTypeIndex" :range="levelData" @change='change($event, "levelTypeIndex")'>
                <div class="form-row isarrow d-center">
                    <div class="f13 d-text-black form-row-item form-row-label">
                        意向程度
                    </div>
                    <div class="d-cell mr10 form-row-item">
                        <input type="text" disabled class='f12 d-text-gray' :placeholder="levelData[levelTypeIndex] || '请选择'">
                    </div>
                </div>
            </picker>
        </div>

        <div class="mt10 pt10 pb10 pl15 pr15 d-bg-white">
            <div class='f13 mb10'><span class='d-text-red'>*</span>跟进内容</div>
            <textarea rows="5" class="f12 d-text-gray" style='width: auto; height:60px' placeholder="点击填写跟进内容"></textarea>
            <imagePick />
        </div>

        <div class="footer-fixed-menu">
            <i-button type="primary" i-class="f16">保存</i-button>
        </div>

    </div>
</template>
<script>
import imagePick from '@/components/image-pick'
export default {
	components: {
		imagePick
	},
	data () {
		return {
			upTypeIndex: '',
			upData: ['打电话', '发邮件', '发短信', '见面拜访', '活动'],
			timeData: '',
			levelData: ['无意向', '略有意向', '意向一般', '意向较高', '意向极高'],
			levelTypeIndex: ''
		}
	},
	methods: {
		change ({ mp: { detail } }, filed) {
			let index = detail.value
			this[filed] = index
		}
	}
}
</script>

<style lang="scss" scoped>
    .add-follow-page{
        background: #f2f2f2;
        height: 100vh;
    }
    .form-row{
        margin-top: -1px;
        border-top: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        height: 51px;
        padding-right: 15px;
        .form-row-label{
            width: 110px;
            text-indent: 15px;
        }
    }

    .isarrow{
        position: relative;
        &:after{
            content: " ";
            display: inline-block;
            width: 6px;
            height: 6px;
            position: absolute;
            top: 50%;
            right: 15px;
            border-width: 2px 2px 0 0;
            border-color: #dddee1;
            border-style: solid;
            transform: translateY(-50%) matrix(.71, .71, -.71, .71, 0, 0)
        }
    }

    .sub-btn{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 26px;
    }
</style>
