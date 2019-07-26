<script>
export default {
	/** 以下是应用生命周期 */
	// 当uni-app 初始化完成时触发（全局只触发一次）
	onLaunch: function () {
		console.log('App Launch')
	},
	// 当 uni-app 启动，或从后台进入前台显示
	onShow: function () {
		console.log('onShow')
	},
	// 当 uni-app 从前台进入后台
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style>
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
</style>
