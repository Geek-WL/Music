<template>
    <transition @enter="enter" @leave="leave" :css="false">
      <div class="list-player" v-show="this.isShowListPlayer">
        <div class="player-wrapper">
          <div class="player-top">
            <div class="top-left">
              <div class="mode loop" ref="mode" @click="mode">
              </div>
              <p v-if="this.modeType === 0">顺序播放</p>
              <p v-if="this.modeType === 1">单曲循环</p>
              <p v-if="this.modeType === 2">随机播放</p>
            </div>
            <div class="top-right">
              <div class="del"></div>
            </div>
          </div>
          <div class="player-middle">
            <ScrollView>
              <ul>
                <li class="item">
                  <div class="item-left">
                    <div class="item-play" @click="play" ref="play"></div>
                    <p>演员</p>
                  </div>
                  <div class="item-right">
                    <div class="item-favorite"></div>
                    <div class="item-del"></div>
                  </div>
                </li>
                <li class="item">
                  <div class="item-left">
                    <div class="item-play"></div>
                    <p>演员</p>
                  </div>
                  <div class="item-right">
                    <div class="item-favorite"></div>
                    <div class="item-del"></div>
                  </div>
                </li>
                <li class="item">
                  <div class="item-left">
                    <div class="item-play"></div>
                    <p>演员</p>
                  </div>
                  <div class="item-right">
                    <div class="item-favorite"></div>
                    <div class="item-del"></div>
                  </div>
                </li>
              </ul>
            </ScrollView>
          </div>
          <div class="player-bottom">
            <p @click="closeList">关闭</p>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'isShowListPlayer'
    ])
  },
  methods: {
    closeList () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.perspectiveUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: 500 }, function () {
        done()
      })
    },
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-wrapper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
         /* @include bg_img('../../assets/images/small_loop');*/
          &.loop {
            @include bg_img('../../assets/images/small_loop');
          }
          &.one {
            @include bg_img('../../assets/images/small_one');
          }
          &.random {
            @include bg_img('../../assets/images/small_shuffle');
          }
        }
      }
      .top-right {
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/small_del')
      }
      p {
        @include font_size($font_medium_s);
        @include font_color();
      }
    }
    .player-middle {
      .item {
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;

        border-top: 1px solid #ccc;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_play');
            margin-right: 20px;
            &.active {
              @include bg_img('../../assets/images/small_pause');
            }
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('../../assets/images/small_favorite')
          }
          .item-del {
            width: 53px;
            height: 53px;
            @include bg_img('../../assets/images/small_close')
          }
        }
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        @include font_size($font_large);
        color: #fff;
      }
    }
  }
}
</style>
