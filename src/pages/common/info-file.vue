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
				<upload-file>
					<i-icon type="add" size="24" color="#466bef"></i-icon>
				</upload-file>
			</span>
            <div class="detail-list" v-for="(item,index) of list" :key="index">
                <a :href="item.fileUrl" class="f13 d-elip mt5 d-text-gray iconfont iconadjunct"> {{item.filelName}}</a>
            </div>
			<uploadFile></uploadFile>
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
		}
	}

}
</script>

<style scoped lang="scss">

</style>
