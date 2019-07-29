<template>
    <div class='addup-page'>
        <NavBar title='新建客户信息' />
        <div class="d-bg-white">

            <picker :value="upTypeIndex" :range="upData" @change='change($event, "upTypeIndex")'>
                <div class="form-row d-center">
                    <div class="f13 d-text-black form-row-item form-row-label">
                        <span class='d-text-red'>*</span>客户名称
                    </div>
                    <div class="d-cell mr10 form-row-item">
                        <input type="text" class='f12 d-text-gray' placeholder="请填写客户名称">
                    </div>
                </div>
            </picker>

            <div class="form-row d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    <span class='d-text-red'>*</span>手机号
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="number" class='f12 d-text-gray' placeholder="请选择">
                </div>
            </div>

            <div class="form-row isarrow d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    <span class='d-text-red'>*</span>所属部门
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" disabled class='f12 d-text-gray' placeholder="请选择">
                </div>
            </div>

            <div class="form-row d-center">
                <div class="f13 d-text-black form-row-item form-row-label">
                    详细地址
                </div>
                <div class="d-cell mr10 form-row-item">
                    <input type="text" disabled class='f12 d-text-gray' placeholder="请填写详细地址">
                </div>
                <div @click="chooseMap" class="ml15 ac hfull pl15 d-center" style="border-left: 1px solid #F2F2F2;">
                    <i-icon type="coordinates" size="22" color="#999" />
                </div>
            </div>

            <picker :value="levelTypeIndex" :range="levelData" @change='change($event, "levelTypeIndex")'>
                <div class="form-row isarrow d-center">
                    <div class="f13 d-text-black form-row-item form-row-label">
                        客户级别
                    </div>
                    <div class="d-cell mr10 form-row-item">
                        <input type="text" disabled class='f12 d-text-gray' :placeholder="levelData[levelTypeIndex] || '请选择'">
                    </div>
                </div>
            </picker>
            <picker :value="levelTypeIndex" :range="levelData" @change='change($event, "levelTypeIndex")'>
                <div class="form-row isarrow d-center">
                    <div class="f13 d-text-black form-row-item form-row-label">
                        行业
                    </div>
                    <div class="d-cell mr10 form-row-item">
                        <input type="text" disabled class='f12 d-text-gray' :placeholder="levelData[levelTypeIndex] || '请选择'">
                    </div>
                </div>
            </picker>
            <picker :value="levelTypeIndex" :range="levelData" @change='change($event, "levelTypeIndex")'>
                <div class="form-row isarrow d-center">
                    <div class="f13 d-text-black form-row-item form-row-label">
                        来源
                    </div>
                    <div class="d-cell mr10 form-row-item">
                        <input type="text" disabled class='f12 d-text-gray' :placeholder="levelData[levelTypeIndex] || '请选择'">
                    </div>
                </div>
            </picker>
            <picker :value="levelTypeIndex" :range="levelData" @change='change($event, "levelTypeIndex")'>
                <div class="form-row isarrow d-center">
                    <div class="f13 d-text-black form-row-item form-row-label">
                        标签
                    </div>
                    <div class="d-cell mr10 form-row-item">
                        <input type="text" disabled class='f12 d-text-gray' :placeholder="levelData[levelTypeIndex] || '请选择'">
                    </div>
                </div>
            </picker>
        </div>

        <div class="pt10 pb10 pl15 pr15 d-bg-white">
            <div class='f13 mb10'>备注</div>
            <textarea rows="5" class="f12 d-text-gray" style='width: auto; height:60px' placeholder="点击填写"></textarea>
        </div>

        <div class="d-center pl15 pr15 mt5">
            <div class='d-cell'>
                <i-icon size="18" color="#999" type='prompt_fill' />
                <span class=" ml10 f12 d-text-black">提交之后同时新建联系人</span>
            </div>
            <i-switch :value="switch1" @change='handleChange' slot="footer">
                <i-icon type="right" slot="open"></i-icon>
                <i-icon type="close" slot="close"></i-icon>
            </i-switch>
        </div>

        <div class='d-center d-text-black mt10'>
            <i-icon type='add' size="20" color='#333' /> <span class='ml15'>添加更多条目</span>
        </div>

        <div class="pl15 pr15 sub-btn">
            <i-button type="primary" i-class="f16">保存</i-button>
        </div>

    </div>
</template>
<script>
export default {
	data () {
		return {
			switch1: false,
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
		},

		handleChange ({ value }) {
			this.switch1 = value
		}
	}
}
</script>

<style lang="scss" scoped>
    .addup-page{
        background: #f2f2f2;
        height: 100vh;
        padding-bottom: 75px;
        box-sizing: border-box;
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
