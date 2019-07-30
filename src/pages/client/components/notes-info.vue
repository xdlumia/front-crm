<template>
    <div class="note-box">
        <div class="note-search-box d-center">
            <input class="search-input f13 d-text-black pl10 d-cell" placeholder="请填写跟进内容，快速跟进" type="text">
            <div class='f13 d-text-blue ml15'>快速跟进</div>
        </div>
        <scroll-view scroll-y :style="{height: height}">
            <div class="d-bg-white" >
                <div class="note-time-title pt15 pb15 f12 d-text-qgray">
                    2019-05-25
                </div>
                <i-swipeout  i-class="i-swipeout-demo-item" :operateWidth="80" :actions="[{
                    name : '删除',
                    color : '#fff',
                    fontsize : '14',
                    width : 50,
                    background : '#f5222d'
                }]">
                    <div slot="content">
                        <div class="pl15 pr15 pb10 pt10">
                            <div class="d-center">
                                <span class="f14 d-text-blue mr30">徐莉莉</span>
                                <span class="d-cell f12 d-text-gray">10:25</span>
                                <span class='note-tag f12 d-text-white'>电话跟进</span>
                            </div>
                            <div class="note-content mb5">
                                 客户终于成交了
                            </div>
                            <div class='d-flex'>
                                <img class="note-img" src="http://file.515md.com:8888/%E4%BA%A7%E5%93%81/%E6%96%B0%E4%BA%A7%E5%93%81%E6%96%B9%E5%90%91/%E5%AE%A2%E6%88%B7%E7%AE%A1%E7%90%86v1.0.8/images/1_1客户公海池客户详情/u4074.png" alt="">
                            </div>
                            <div class="mb5">
                                <uni-tag size='small' text="关联联系人：王东亮" circle />
                            </div>
                            <div class="d-flex">
                                <div class="mr10">
                                    <uni-tag size='small' text="意向极高" circle />
                                </div>
                                <uni-tag size='small' text="下次通话时间：2019-10-10" circle/>
                            </div>
                        </div>
                    </div>
                </i-swipeout>
            </div>
        </scroll-view>
    </div>
</template>

<script>
export default {
	props: {
		height: {
			type: String,
			default: ''
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
