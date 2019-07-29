<!-- /**
 * @新增required请求
 */ -->
<template>
    <div class="detail-panel-item f13">
        <div v-if="type === 'textarea'">
            <div v-if="labelWidth" class="uni-h50 uni-lh50 f13">
                <span v-if="required" class="d-text-red">*</span>
                <label class="d-elip d-text-black">{{label}}</label>
            </div>
            <div>
                <textarea
                    :disabled="disabled"
					:rows="3"
                    :focus="autofocus"
					style="min-height:55px; height:auto"
                    :value="value"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    class="i-input-textarea wfull uni-h100 f13"
                    @input="handleInputChange"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                ></textarea>
            </div>
        </div>
        <div v-else class="d-flex f13">
            <div v-if="labelWidth" :style="{width:labelWidth * 2 +'rpx'}" class="uni-h50 uni-lh50">
                <span v-if="required" class="d-text-red">*</span>
                <label class="d-elip d-text-black f13">{{label}}</label>
            </div>
            <div class="d-cell d-relative">
                <input
                    :type="type"
                    :disabled="disabled"
                    :focus="autofocus"
                    :value="value"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    class=" i-input-input uni-lh50 uni-h50 wfull f13"
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
	position: absolute;
	top: 50%;
	right: 0px;
	transform: translateY(-50%);
	color:#999
}
</style>
