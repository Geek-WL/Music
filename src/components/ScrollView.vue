<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        // this.y为滚动的垂直距离
        // 往下拉为正数  反之为负数
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 1000)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  },
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true, // 侦听鼠标滚轮事件。
      scrollbars: false, // 是否显示滚动条
      probeType: 3, // 监听滚动的位置
      // 解决拖拽卡顿问题
      scrollX: false,
      scroll: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })
    // setTimeout(() => {
    //   console.log(this.iscroll.maxScrollY)
    //   this.iscroll.refresh()
    //   console.log(this.iscroll.maxScrollY)
    // }, 5000)
    // 第一步：创建一个观察者对象
    /*
    * MutationObserver构造函数只要监听到了指定内容发生了变化，就会执行传入的回调函数
    * mutationList: 发生变化的数组
    * observer：观察者对象
    * */
    let observer = new MutationObserver((mutationList, observer) => {
      // console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh()
      // console.log(this.iscroll.maxScrollY)
    })
    // 第二步：告诉观察者对象我们需要观察什么内容
    let config = {
      childList: true, // 观察子节点的变化，添加或者删除
      subtree: true, // 默认为false，设置为true可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 第三步：告诉观察者对象，我们需要观察谁，需要观察什么内容
    /*
    * 参数1：观察的对象
    * 参数2：观察的内容(配置)
    * */
    observer.observe(this.$refs.wrapper, config)
    // 以上代码用于解决iscroll根据数据变化自动调用refresh方法更新包裹的内容高度
  }
}
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
