<!--
/**
* @author 王晓冬
* @name 附件
* @date 2019年7月299日
**/
-->
<template>
    <div>
        <mPanel top="10" title="附件" color="#4889f4">
			<span slot="add">
				<upload-file @success="uploadSuccess">
					<i-icon type="add" size="24" color="#466bef"></i-icon>
				</upload-file>
			</span>
            <div class="detail-list ac f12 d-text-gray" v-if="!list.length">暂无数据</div>
            <div class="detail-list" v-for="(item,index) of list" :key="index">
                <a :href="item.path" class="f13 d-elip mt5 d-text-gray iconfont iconadjunct"> {{item.name}}</a>
            </div>
        </mPanel>
    </div>
</template>

<script>
import uploadFile from '@/components/m-upload-file'
export default {
	props: ['query'],
	components: {
		uploadFile
	},
	data () {
		return {
			list: []
		}
	},
	onLoad (option) {
	},
	created () {
		this.fileinfoQueryList()
	},
	methods: {
		fileinfoQueryList () {
			this.$api.seeCrmService.fileinfoQueryList(this.query)
				.then(res => {
					this.list = res.data || []
				})
		},
		uploadSuccess (urlObj) {
			this.list.push(urlObj)
		}
	}

}
</script>

<style scoped lang="scss">

</style>
