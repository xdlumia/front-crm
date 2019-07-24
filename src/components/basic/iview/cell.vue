<template>
  <div @click="handleTap" class="i-class i-cell " :class="{'i-cell-last' :isLastCell,'i-cell-access' : isLink != null}">
    <div class="i-cell-icon">
      <slot name="icon"></slot>
    </div>
    <div class="i-cell-bd">
      <div v-if="title" class="i-cell-text">{{ title }}</div>
      <div v-if="label" class="i-cell-desc">{{ label }}</div>
      <slot></slot>
    </div>
    <div @click="navigateTo" class="i-cell-ft">
      <div v-if="value">{{ value }}</div>
      <div v-else>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      name: 'panel',
      components: {},
      props: {
      // 左侧标题
          title: {
              type: String
          },
          // 标题下方的描述信息
          label: {
              type: String
          },
          // 右侧内容
          value: {
              type: String
          },
          // 只有点击 footer 区域才触发 tab 事件
          onlyTapFooter: {
              type: Boolean
          },
          // 是否展示右侧箭头并开启尝试以 url 跳转
          isLink: {
              type: null,
              default: undefined
          },
          // 链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch
          linkType: {
              type: String,
              default: 'navigateTo'
          },
          url: {
              type: String,
              default: ''
          }
      },
      data () {
          return {
              isLastCell: true
          }
      },
      computed: {},
      methods: {
          navigateTo () {

          },
          handleTap () {
              if (!this.data.onlyTapFooter) {
                  this.navigateTo()
              }
          },

          updateIsLastCell (isLastCell) {
              this.isLastCell = isLastCell
          }
      }
  }
</script>
<style type="less" scoped>
  .i-cell {
    position: relative;
    padding: 12px 15px;
    display: flex;
    background: #fff;
    align-items: center;
    line-height: 1.4;
    font-size: 14px;
    overflow: hidden;
    border-bottom: 1px solid #f2f2f2;
  }

  .i-cell::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 1px solid #e9eaec;
    border-bottom-width: 1px;
    left: 15px;
    right: 0
  }

  .i-cell-last::after {
    display: none
  }

  .i-cell-icon {
    margin-right: 5px
  }

  .i-cell-icon:empty {
    display: none
  }

  .i-cell-bd {
    flex: 1
  }

  .i-cell-text {
    line-height: 24px;
    font-size: 14px
  }

  .i-cell-desc {
    line-height: 1.2;
    font-size: 12px;
    color: #80848f
  }

  .i-cell-ft {
    position: relative;
    text-align: right;
    color: #495060
  }

  .i-cell-access .i-cell-ft {
    padding-right: 13px
  }

  .i-cell-access .i-cell-ft::after {
    content: " ";
    display: inline-block;
    width: 6px;
    height: 6px;
    position: absolute;
    top: 50%;
    right: 2px;
    border-width: 2px 2px 0 0;
    border-color: #dddee1;
    border-style: solid;
    transform: translateY(-50%) matrix(.71, .71, -.71, .71, 0, 0)
  }
</style>


