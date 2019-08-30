/*
 * @Author: web.王晓冬
 * @Date: 2019-08-27 14:24:03
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-08-30 16:01:47
 * @Description: i-input公共组件
 */
<!-- /**
 * @新增required请求
 */ -->
<template>
    <div class="detail-panel-item f13">
        <div v-if="type === 'textarea'">
            <div v-if="labelWidth" class="uni-h50 uni-lh50 f13">
				<uni-icon
					@click="handleLableClick"
					class="mr10"
					:type="labelIcon.type"
					:color="labelIcon.color"
					:size="labelIcon.size"
					v-if='labelIcon'
				/>
                <span v-if="required" class="d-text-red">*</span>
                <label class="d-elip d-text-black">{{label}}</label>
            </div>
            <div class="i-textarea-box">
                <textarea
                    :disabled="disabled"
					:rows="3"
                    :focus="autofocus"
					style="min-height:55px; height:auto"
                    :value="value"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    class="i-input-textarea wfull uni-h100 f13"
					:class='iClass'
                    @input="handleInputChange"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                ></textarea>
            </div>
        </div>
        <div v-else class="d-flex f13">
            <div v-if="labelWidth" :style="{width:labelWidth * 2 +'rpx'}" class="uni-h50 uni-lh50">
				<span @click.stop="handleLableClick">
					<uni-icon
						class="mr10"
						:type="labelIcon.type"
						:color="labelIcon.color"
						:size="labelIcon.size"
						v-if='labelIcon'
					/>
				</span>
                <span v-if="required" class="d-text-red">*</span>
                <slot name="label"><label class="d-elip d-text-black f13">{{label}}</label></slot>
            </div>
            <div class="d-cell d-relative d-flex">
                <input
                    :type="type"
                    :disabled="disabled"
                    :focus="autofocus"
                    :value="value"
                    :placeholder="placeholder"
                    :maxlength="maxlength == 300?32:maxlength"
                    class=" i-input-input uni-lh50 uni-h50 f13 wfull"
					:class='iClass'
                    @input="handleInputChange"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                />
				<div class="input-icon"><slot></slot></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		iClass: {
			type: String,
			default: ''
		},
		value: {
			type: String
		},
		// label
		label: {
			type: String
		},
		labelWidth: {
			default: 100
		},
		disabled: {
			type: Boolean,
			default: false
		},
		maxlength: {
			type: Number,
			default: 300
		},
		// 是否必填
		required: {
			default: false
		},
		// text || textarea || password || number
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		autofocus: {
			type: Boolean,
			default: false
		},
		labelIcon: {
			type: Object,
		},
		isSelect:Boolean
	},
	methods: {
		handleInputChange (event) {
            if(this.type==='number') {
                event.target.value = event.target.value.trim()
            }
			this.$emit('change', event.target.value)
			this.$emit('input', event.target.value)
		},

		handleInputFocus (event) {
			this.$emit('focus', event)
		},

		handleInputBlur (event) {
			this.$emit('blur', event)
		},
		handleLableClick(){
			this.$emit('handleLableClick')
		}
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.detail-panel-item {
	position: relative;
    font-size: 12px;
    padding:10px 15px;
    border-bottom: 1px solid #f2f2f2;
}
.input-icon{
	display: inline-block;
	color:#999;
}
.i-textarea-box{
	position: relative;
	height: 55px;
	.i-input-textarea{
		position:absolute;
		top:0;
		left:0;
		right:0;
	}
}
</style>
