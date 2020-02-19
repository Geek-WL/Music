<template>
    <swiper :options="swiperOption" class="banner">
      <swiper-slide class="cd">
        <div class="cd-wrapper" ref="cdwrapper">
          <img :src="this.currentSong.picUrl" alt="">
        </div>
        <p>{{getFirstLyric()}}</p>
      </swiper-slide>
      <swiper-slide class="lyric" ref="lyric">
        <ScrollView ref="scrollview">
          <ul>
            <li v-for="(value,key) in this.currentLyric" :key="key" :class="{'active': currentLineNum === key}">{{value}}</li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        // 从网络获取数据 以下配置必需
        observer: true,
        observerParents: true,
        observerSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  methods: {
    // 获取第一句歌词
    getFirstLyric () {
      for (let key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    // 此方法为让点击进度条时立即显示跳转的歌词
    getActiveLineNum (lineNum) {
      let result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdwrapper.classList.add('active')
      } else {
        this.$refs.cdwrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      /*
      // 1.高亮歌词同步
      let lineNum = Math.floor(newValue) + ''
      let result = this.currentLyric[lineNum]
      // console.log(result)
      if (result !== undefined && result !== '') {
        this.currentLineNum = lineNum
        // 2.歌词滚动同步
        let currentLyricTop = document.querySelector('li.active').offsetTop
        let lyricHeight = this.$refs.lyric.$el.offsetHeight
        if (currentLyricTop > lyricHeight / 2) {
          this.$refs.scrollview.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        }
      }
      */
      let lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      let currentLyricTop = document.querySelector('li.active').offsetTop
      let lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollview.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollview.scrollTo(0, 0, 100)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  right: 0;
  left: 0;
  .cd {
    .cd-wrapper {
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      animation: sport 5s linear infinite;
      // 设置动画状态为暂停
      animation-play-state: paused;
      &.active {
      animation-play-state: running;
    }
    }
    p {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type{
        padding-bottom: 50%;
      }
      &.active {
        color: #fff;
        margin: 20px 0;
        @include font_size($font_large);
      }
    }
  }
}
  @keyframes sport {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
<style lang="scss">
  @import "src/assets/css/mixin";
  .my-bullet {
    // 默认分页器的原点为span标签
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    margin: 0 20px;
  }
  .my-bullet-active {
    width: 60px;
    @include bg_color();
  }
</style>
