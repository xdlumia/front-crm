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
                <a :href="item.fileUrl" class="f13 d-elip mt5 d-text-gray iconfont iconadjunct"> {{item.filelName}}</a>
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
			this.$api.seeCrmService.fileinfoQueryList({ busId: this.query.busId, busType: this.query.busType })
				.then(res => {
					if (res.code !== 200) return
					this.list = res.data || []
				})
		},
		// 上传成功
		uploadSuccess (obj) {
			let params = {
				busId: this.query.busId, // 业务id
				busType: this.query.busType, // 业务类型,
				fileSize: obj.size, // 100000,
				fileType: obj.type, // 示例：文件类型,
				fileUrl: obj.path, // 示例：文件地址,
				filelName: obj.name, // 示例：文件名称,
				isDelete: 0 // 0
			}
			this.$api.seeCrmService.fileinfoSave(params)
				.then(res => {
					if (res.code !== 200) return
					this.fileinfoQueryList()
				})
		}
	},
	watch: {
		// 'query.busId': {
		// 	handler (val) {
		// 		this.fileinfoQueryList()
		// 	},
		// 	deep: true
		// }
	}

}
</script>

<style scoped lang="scss">

</style>
