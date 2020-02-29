<template>
  <Header class="header">
    <template v-slot:left>
      <div class="header-left"></div>
    </template>
    <template v-slot:center>
      <p class="header-title">网易云音乐</p>
    </template>
    <template v-slot:right>
      <div class="header-right" @click.stop="accountClick"></div>
    </template>
  </Header>
</template>

<script>
import Header from './Header'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    accountClick () {
      this.$router.push('/account')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .header {
    .header-left {
      @include bg_img('../assets/images/logo')
    }
    .header-right {
      @include bg_img('../assets/images/account')
    }
    .header-title {
      text-align: center;
      line-height: 100px;
      color: #fff;
      font-weight: bold;
      @include font_size($font_large)
    }
  }
</style>
