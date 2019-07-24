
<template>
    <div class="d-flex d-flex-wrap">
        <div class="d-relative">
            <img class='upload-img d-block' mode='aspectFill' src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uniapp4@2x.png" alt="">
            <div class='del-icon'>
                <i-icon type="delete_fill" size='20' color='#999' />
            </div>
        </div>
        <div class="upload-box d-center">
            <div>
                <i-icon size="24" type='add' color='#bdbdbd' />
                <div class='wfull ac f12 d-text-gray'>{{placeholder}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: '图片'
		},
		maxLen: {
			type: Number,
			default: 9
		}
	}
}
</script>

<style lang='scss' scoped>
.upload-img{
    width: 80px;
    height: 80px;
    margin-right: 5px;
    margin-bottom: 5px;

}

.upload-box{
    @extend .upload-img;
    border-radius: 3px;
    border: 1px dashed #d9d9d9;
    background: #fafafa;
    box-sizing: border-box;
    &.upload-box:nth-of-type(4n){
        margin-right: 0;
    }
}

.del-icon{
    position: absolute;
    right: 3px;
    top: 3px;
}
</style>
