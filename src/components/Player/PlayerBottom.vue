<template>
    <div class="player-bottom">
      <div class="bottom-progress">
        <span ref="eleCurrentTime">00:00</span>
        <div class="progress-bar" @click="progressClick" ref="progressBar">
          <div class="progress-line" ref="progressLine">
            <div class="progress-dot">
            </div>
          </div>
        </div>
        <span ref="eleTatolTime">00:00</span>
      </div>
      <div class="bottom-controll">
        <div class="mode loop" @click="mode" ref="mode"></div>
        <div class="prev" @click="prev"></div>
        <div class="play" @click="play" ref="play"></div>
        <div class="next" @click="next"></div>
        <div class="favorite" @click="favorite" :class="{'active': isFavorite(currentSong)}"></div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
import { formartTime } from '../../tools/tools'

export default {
  name: 'PlayerBottom',
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurTime',
      'setFavoriteSong'
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
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (song) {
      let result = this.favoriteList.find(function (currentValue) {
        return currentValue.id === song.id
      })
      return result !== undefined
    },
    progressClick (e) {
      // console.log(e)
      // let normalLeft = e.target.offsetLeft
      // let eventLeft = e.pageX
      // let clickLeft = eventLeft - normalLeft
      // console.log(clickLeft)
      // console.log(e.offsetX)
      // 1.设置进度条前景的宽度
      // let scale = e.offsetX / e.target.offsetWidth
      // 解决target指向问题(点击的目标可能是progress-bar的子元素)
      // let scale = e.offsetX / parseInt(getComputedStyle(this.$refs.progressBar).width)
      let scale = e.offsetX / this.$refs.progressBar.offsetWidth
      // console.log(getComputedStyle(this.$refs.progressBar).width)
      // console.log(scale)
      this.$refs.progressLine.style.width = scale * 100 + '%'
      // 2.重新设置开始播放的当前时间
      let currentTime = scale * this.totalTime
      // console.log(currentTime)
      this.setCurTime(currentTime)
      // this.currentTime = currentTime 不能直接修改父组件传来的数据,要修改得去父组件修改
      // 先把计算好的time传入vuex，父组件拿到vuex的time设置给currentTime
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
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
    },
    totalTime (newValue, oldValue) {
      let time = formartTime(newValue)
      this.$refs.eleTatolTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      // 1.格式化当前播放的时间
      let time = formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // 2.根据当前播放的时间progress-line和progress-bar的比例
      // console.log(this.currentTime)
      let scale = newValue / this.totalTime * 100 // 百分比
      this.$refs.progressLine.style.width = scale + '%'
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_samll);
      @include font_color();
    }
    .progress-bar {
      flex-grow: 1;
      /*width: 100%;*/
      height: 10px;
      background: #fff;
      /*padding: 0 20px;*/
      /*margin: 0 20px;*/
      .progress-line {
        width: 0;
        height: 100%;
        background: #ccc;
        position: relative;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controll {
    width: 80%;
    margin: 0 auto;
    /*background: skyblue;*/
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
     /* @include bg_img('../../assets/images/loop');*/
      &.loop {
        @include bg_img('../../assets/images/loop');
      }
      &.one {
        @include bg_img('../../assets/images/one');
      }
      &.random {
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev {
      @include bg_img('../../assets/images/prev');
    }
    .play {
      @include bg_img('../../assets/images/play');
      &.active {
        @include bg_img('../../assets/images/pause');
      }
    }
    /*.pause {
      @include bg_img('../../assets/images/pause');
    }*/
    .next {
      @include bg_img('../../assets/images/next');
    }
    .favorite {
      @include bg_img('../../assets/images/un_favorite');
      &.active {
        @include bg_img('../../assets/images/favorite');
      }
    }
  }
}
</style>
