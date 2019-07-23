<template>
  <div class="circle-progress" :style="{width:width,height:width}">
    <div class="progress-load" :style="{'clip-path': currProgress,'background-color':color}">212</div>
    <div class="circle-progress-text">{{progress}}/{{maxNum}}</div>
  </div>
</template>
<script>
export default {
	name: 'ElProgress',
	props: {
		// 阶段最大值
		maxNum: {
			default: 4,
			type: Number
		},
		progress: {
			default: 2,
			type: Number
		},
		width: {
			default: '50px',
			type: String
		},
		color: {
			default: '#7fc25c',
			type: String
		}
	},
	computed: {
		currProgress () {
			let r = (this.progress / this.maxNum) * 100 * 4
			let k1 = 'polygon(50% 50%,50% 0%,'
			let k2 = k1 + '100% 0%,'
			let k3 = k2 + '100% 100%,'
			let k4 = k3 + '0% 100%,'
			let k5 = k4 + '0% 0%,'
			let clipPath = ''
			if (r <= 50) {
				r += 50
				clipPath = k1 + r + '% 0%)'
			} else if (r > 50 && r <= 150) {
				r -= 50
				clipPath = k2 + '100% ' + r + '%)'
			} else if (r > 150 && r <= 250) {
				r = 250 - r
				clipPath = k3 + r + '% 100%)'
			} else if (r > 250 && r <= 350) {
				r = 350 - r
				clipPath = k4 + '0% ' + r + '%)'
			} else if (r > 350 && r <= 400) {
				r -= 350
				clipPath = k5 + r + '% 0%)'
			}
			return clipPath
		}
	}
}
</script>
<style lang="scss" scoped>
.circle-progress {
  position: relative;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;
  .progress-load {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  .circle-progress-text {
    color:#666;
    position: absolute;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 1;
    top: 50%;
    left: 50%;
    width: 85%;
    height: 85%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
