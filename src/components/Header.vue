<template>
 <!--
 <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">网易云音乐</p>
    <div class="header-right" @click.stop="accountClick"></div>
  </div>
  -->
  <div class="header" @click="changeTheme">
    <!--注意点：不能直接给插槽设置样式，设置样式前需在插槽外包裹一层元素-->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <slot name="center"></slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index === this.themes.length) this.index = 0
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.header {
  width: 100%;
  height: 100px;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .left, .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    * {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
