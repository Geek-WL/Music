<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul>
          <li v-for="(value, key) in category.titles" :key="key">
            <h3 class="group-title">{{value}}</h3>
            <ul class="normal-group" v-if='value === "官方榜"'>
              <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectItem(obj.id)">
                <div class="rank-left">
                  <img v-lazy="obj.rank.coverImgUrl" alt="">
                  <p>{{obj.rank.updateFrerquency}}</p>
                </div>
                <div class="rank-right">
                  <p v-for="(song, index) in obj.rank.tracks" :key="song.first">{{index}}.{{song.first}}-{{song.second}}</p>
                </div>
              </li>
            </ul>
            <ul class="other-group" v-else>
              <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectItem(obj.id)">
                <div class="rank-top">
                  <img v-lazy="obj.rank.coverImgUrl" alt="">
                  <p>{{obj.rank.updateFrerquency}}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{obj.rank.name}}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <!--特定组件缓存-->
    <transition include="Singer, Search">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopListDetail } from '../api'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  data () {
    return {
      category: {}
    }
  },
  methods: {
    selectItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  },
  created () {
    getTopListDetail()
      .then((result) => {
        // console.log(result)
        this.category = result
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.rank {
  width: 100%;
  height: 100%;
  .rank-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 184px;
    /*background: skyblue;*/
    overflow: hidden;
    @include bg_sub_color();
    .group-title {
      padding: 10px 20px;
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
    .normal-group {
      li {
        display: flex;
        position: relative;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-left {
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #FFFFFF;
            @include font_size($font_medium_s)
          }
        }
        .rank-right {
          margin-left: 20px;
          p {
            @include font_color();
            @include font_size($font_medium_s);
            padding: 10px 0;
          }
        }
      }
    }
    .other-group {
      display: flex;
      flex-wrap: wrap;
      /*用flex布局 并且要让伸缩项自动换行 最好给每个伸缩项加上固定的宽度*/
      justify-content: space-between;
      li {
        position: relative;
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-top {
          img {
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #FFFFFF;
            @include font_size($font_medium_s)
          }
        }
        .rank-bottom {
          width: 200px;
          @include no-wrap();
          p {
            padding: 10px 0;
            text-align: center;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
      }
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
