<template>
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>演员</h3>
      <p>薛之谦</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.header {
  width: 100%;
  height: 100px;
  /*background: red;*/
  /*position: relative;*/
  /*z-index: 666;*/
  //@include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left, .header-right {
    width: 84px;
    height: 84px;
    /*background: #000;*/
    margin-top: 8px;
  }
  .header-left {
    @include bg_img('../../assets/images/down')
  }
  .header-right {
    //@include bg_img('../../assets/images/more')
  }
  .header-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    @include font_size($font_medium);
    @include no-wrap();
    p {
      @include font_size($font_medium_s)
    }
  }
}
</style>
