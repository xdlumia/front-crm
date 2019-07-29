import uuid from 'uuid'
import { mapState } from 'vuex'
import local from './localStorage'
// 分享相关
export default {
	computed: {
		...mapState(['currentCardInfo', 'currentPrdInfo', 'sharedInfo'])
	},
	onShareAppMessage: function ({ from }) {
		console.error(from)
		// from >> button按钮点击分享 menu右上角菜单
		let type = local.getItem('targetType')
		let data = {}
		if (from === 'button' && type === 'card') {
			data = this.parseCardShareInfo(this.currentCardInfo)
		} else if (from === 'menu' && this.sharedInfo.type === 'card') {
			data = this.parseCardShareInfo(this.sharedInfo)
		} else if (from === 'button' && type === 'product') {
			data = this.parseProductShareInfo(this.currentPrdInfo)
		} else if (from === 'menu' && this.sharedInfo.type === 'product') {
			data = this.parseProductShareInfo(this.sharedInfo)
		} else {
			data = this.sharedInfo
		}
		console.error({ ...data })
		return { ...data }
	},
	methods: {
		async parseCardShareInfo (cardInfo) {
			let targetCode = cardInfo.businessCode || cardInfo.cardCode || 'G0Q9S0MP20190710000005'
			let uid = uuid()
			this.$api.seeRealCustomerService.rcbusinesscardForwardCardCallBack({
				forwardCode: uid,
				targetCode: targetCode
			})
			if (!cardInfo.cardForwardPicUrl) {
				let { data } = await this.$api.seeRealCustomerService.htmlToimage({
					targetType: 1,
					targetId: cardInfo.id
				})
				cardInfo.cardForwardPicUrl = data
			}

			// console.log({
			//     title: cardInfo.userName,
			//     imageUrl: 'http://oss-a-develop.oss-cn-beijing.aliyuncs.com/1008/pic/201907/1563358524886pKCAdz7SBZ.jpg',
			//     path: `/pages/card/index?targetCode=${targetCode}&forwardCode=${uid}&forwardType=card&forwardUserId=${this.$userInfo.id}`
			// })
			// 这里会打印2次，目前还不知道原因
			console.error({
				title: cardInfo.userName,
				imageUrl: cardInfo.cardForwardPicUrl,
				path: `/pages/card/index?targetCode=${targetCode}&forwardCode=${uid}&forwardType=card&forwardUserId=${this.$userInfo.id}`
			})
			return {
				title: cardInfo.userName,
				imageUrl: 'http://oss-a-develop.oss-cn-beijing.aliyuncs.com/1008/pic/201907/1563358524886pKCAdz7SBZ.jpg',
				path: `/pages/card/index?targetCode=${targetCode}&forwardCode=${uid}&forwardType=card&forwardUserId=${this.$userInfo.id}`
			}
		},
		parseProductShareInfo (prdInfo) {
			let targetCode = prdInfo.productCode || prdInfo.businessCode
			let uid = uuid()
			this.$api.seeRealCustomerService.rcproductForwardProductCallBack({
				forwardCode: uid,
				targetCode: targetCode
			})
			let cover = prdInfo.procuctCover ? prdInfo.procuctCover : prdInfo.productCoverUrl
			return {
				title: prdInfo.productName,
				imageUrl: (cover && cover.filePath) ? cover.filePath : '',
				path: `/pages/product/detail?targetCode=${targetCode}&forwardCode=${uid}&forwardType=product&forwardUserId=${this.$userInfo.id}`
			}
		}
	}
}
