<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <!--<div class="normal-player" v-show="this.$store.getters.isFullScreen">-->
    <!--获取全局数据 使用mapGetters后 只需this.xxx 即可获取-->
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom></PlayerBottom>
      </div>
      <div class="player-bg">
        <img src="http://p1.music.126.net/5vf3VOG7VppGmMHqQSKgQA==/109951164701857091.jpg?imageView&quality=89" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen'
    ])
  },
  methods: {
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.normal-player {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 666;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      height: 100%;
      filter: blur(10px);
    }
  }
}
</style>
