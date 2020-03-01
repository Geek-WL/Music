<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scroll">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value, index) in list" :key="index" ref="group">
            <h2 class="group-title">{{keys[index]}}</h2>
            <ul>
              <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click.stop="switchSinger(obj.id)">
                <img v-lazy="obj.img1v1Url" alt="">
                <p>{{obj.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <ul class="list-keys">
        <li
          v-for="(key, index) in keys"
          :key="key" @click="keyDown(index)"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :class="{'active': currentIndex===index}">{{key}}</li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api'
import ScrollView from '../components/ScrollView'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Singer',
  metaInfo: MetaInfo.singer,
  data () {
    return {
      list: [],
      keys: [],
      groupsTop: [],
      currentIndex: 0,
      // 开始滑动的距离
      beginOffsetY: 0,
      // 移动之后的距离
      moveOffsetY: 0,
      // 当前滚动的距离
      scrollY: 0
    }
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  methods: {
    _keyDown (index) {
      // console.log(this.groupsTop[index])
      this.$refs.scroll.scrollTo(0, -this.groupsTop[index], 200)
      this.currentIndex = index
    },
    touchstart (e) {
      // console.log(e.target.dataset.index)
      let index = parseInt(e.target.dataset.index)
      this._keyDown(index)
      this.beginOffsetY = e.touches[0].pageY
      // console.log(e.touches[0].pageY)
      // console.log(e)
    },
    touchmove (e) {
      // console.log(e.target.dataset.index)
      this.moveOffsetY = e.touches[0].pageY
      let offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      // console.log(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  watch: {
    list () {
      // 注意点: watch只能监听数据的变化，数据变化的时候不一定已经渲染完毕
      //        所以为了保证是渲染完毕之后再去获取，可以使用$nextTick方法实现
      this.$nextTick(() => {
        // console.log(this.$refs.group)
        this.$refs.group.forEach((item) => {
          this.groupsTop.push(item.offsetTop)
        })
        // console.log(this.groupsTop)
      })
    },
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  },
  components: {
    ScrollView
  },
  created () {
    getAllArtists()
      .then((result) => {
        this.keys = result.keys
        this.list = result.list
      })
      .catch((err) => {
        window.console.log(err)
      })
  },
  mounted () {
    this.$refs.scroll.scrolling((y) => {
      this.scrollY = y
      // console.log(y)
      // 1. 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        let preTop = this.groupsTop[i]
        let nextTop = this.groupsTop[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i

          // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
          let diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          // 2.判断计算的结果是否为 0 ~ 分组标题的高度值 如果满足，用计算的结果减去title的高(负数)，就是title该偏移的量
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          // console.log(this.fixTitleOffsetY)
          // 用于判断当前次的偏移位是否和上一次的相等，如果是，return
          if (fixTitleOffsetY === this.fixTitleOffsetY) return
          // 保存当前次的偏移位 用于下一次判断
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      // 处理最后一个区域
      this.currentIndex = this.groupsTop.length - 1
    })
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.singer {
  width: 100%;
  height: 100%;
  .singer-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 184px;
    /*background: skyblue;*/
    overflow: hidden;
    /*z-index: 1;*/
    @include bg_sub_color();
    .list-wrapper {
      /*width: 100%;*/
      /*height: 100%;*/
      .list-group {
        .group-title {
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item {
          display: flex;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
          }
          p {
            @include font_size($font_medium);
            @include font_color();
            display: flex;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }
    .list-keys {
      position: fixed;
      right: 10px;
      top: 60%;
      transform: translateY(-50%);
      li {
        padding: 3px 0;
        @include font_color();
        @include font_size($font_medium_s);
        &.active {
          text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_size($font_medium);
      color: #fff;
      @include bg_color();
    }
  }
}
  .v-enter {
    /*opacity: 0;*/
    transform: translateX(100%);
  }
  .v-enter-to {
    /*opacity: 1;*/
    transform: translateX(0%);
  }
  .v-enter-active {
    transition: transform 1s;
  }
  .v-leave {
    /*opacity: 1;*/
    transform: translateX(0%);
  }
  .v-leave-to {
    /*opacity: 0;*/
    transform: translateX(100%);
  }
  .v-leave-active {
    transition: transform 1s;
  }
</style>
