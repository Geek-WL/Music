<template>
    <div class="detail-top">
      <div class="img-container">
        <img :src="path" alt="">
        <div class="mask" ref="mask"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    // 向父组件提供一个改变mask透明度的方法
    changMaskOp (num) {
      this.$refs.mask.style.opacity = num
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  .img-container {
    img {
      width: 100%;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      background: #000;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>
