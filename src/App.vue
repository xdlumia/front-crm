<script>
export default {
	/** 以下是应用生命周期 */
	// 当uni-app 初始化完成时触发（全局只触发一次）
	onLaunch: function () {
	},
	// 当 uni-app 启动，或从后台进入前台显示
	onShow: function () {
	},
	// 当 uni-app 从前台进入后台
	onHide: function () {
	}
}
</script>

<style lang='scss'>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './assets/css/uni.css';
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
/* 底部浮动菜单*/
.footer-fixed-menu{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
}
.twowrap{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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
</style>
