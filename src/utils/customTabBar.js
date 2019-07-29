/**
 * @author 赵伦 2019-07-03
 * @description 自定义tabbar mixin
 */
/* eslint-disable */
import {  mapState } from 'vuex'
const tabList = [
    { pagePath: '/pages/card/index', name: 'card', text: '名片', targets: 'bc', show: true },
    { pagePath: '/pages/product/index', name: 'product', text: '产品', targets: 'bc', show: true },
    { pagePath: '/pages/customer/index', name: 'customer', text: '客户', targets: 'b', show: false },
    { pagePath: '/pages/message/index', name: 'website', text: '官网', targets: 'c', show: true, auth: true },
    { pagePath: '/pages/message/index', name: 'message', text: '消息', targets: 'b', show: false },
    { pagePath: '/pages/user/index', name: 'user', text: '我的', targets: 'bc', show: true }
]

export default {
    data() {
        return {
            customTabBarSetting: {
                icons: {
                    card: 'card',
                    product: 'product',
                    customer: 'customer',
                    message: 'news',
                    website: 'website',
                    user: 'my'
                }
            }
        }
    },
    onLoad() {
        this.resetTabBarItemStatus()
    },
    onShow() {
        this.resetTabBarItemStatus()
    },
    computed: {
        ...mapState(['customTabBar']),
        currentTabName() {
            return this.customTabBar.currentTabName
        },
        tabStatus() {
            return this.customTabBar.tabStatus || {}
        }
    },
    watch: {
        $currentSystemTarget() {
            this.resetTabBarItemStatus()
        },
        tabStatus() {
            this.resetTabBarItemStatus()
        }
    },
    methods: {
        /** 重置tabbar状态 */
        resetTabBarItemStatus() {
            let currentPage = getCurrentPages()[0]
            let tabIndex = 0
            let currentTabName;
            let tabs = tabList.map((item) => {
                /** 根据系统类型过滤菜单 */
                item.show = !!item.targets.match(this.$currentSystemTarget)
                if (item.show && !currentTabName && item.pagePath.match(currentPage.route)) {
                    currentTabName = item.name
                }
                return item
            }).filter(item => {
                let show = true;
                if (!item.show) show = false;
                if (show && item.auth) {
                    show = this.tabStatus[item.name];
                }
                return show;
            }).map((item, i) => {
                if (item.name == currentTabName) {
                    tabIndex = i
                }
                let icon = this.customTabBarSetting.icons[item.name]
                return {
                    ...item,
                    iconPath: `/static/img/${icon}-default.png`,
                    selectedIconPath: `/static/img/${icon}-active.png`
                }
            })
            if (currentPage&&currentPage.getTabBar) {
                let tabbar = currentPage.getTabBar()
                tabbar.setData({
                    selected: tabIndex,
                    list: tabs
                })
                tabbar.reloadBadge();
            }
        },
        /** 切换系统类型 */
        switchTarget(target) {
            this.$local.setItem('currentSystemTarget', target)
            this.resetTabBarItemStatus()
        },
        hideTabBar() {
            let currentPage = getCurrentPages()[0]
            currentPage.getTabBar().setData({
                hide: true
            })
            // uni.hideTabBar()
        },
        showTabBar() {
            let currentPage = getCurrentPages()[0]
            currentPage.getTabBar().setData({
                hide: false
            })
            // uni.hideTabBar()
        }
    }
}
