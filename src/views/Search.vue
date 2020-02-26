<template>
  <div class="search">
    <div class="search-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search">
    </div>
      <div class="search-suggest" v-show="keywords !== ''">
        <ScrollView>
          <ul>
            <li v-for="value in songs" :key="value.id" @click.stop="selectMusic(value.id)">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
              <p>{{value.name}} - {{value.artists[0].name}}</p>
            </li>
          </ul>
        </ScrollView>
      </div>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchList } from '../api'
import { mapActions } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      keywords: '',
      songs: []
    }
  },
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    search () {
      getSearchList({ keywords: this.keywords })
        .then(data => {
          console.log(data)
          this.songs = data.result.songs
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    }
  },
  // 自定义局部指令
  directives: {
    throttle: {
      // 指令的定义
      inserted: (el, obj) => {
        let timer = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timer && clearTimeout(timer)
          timer = setTimeout(() => {
            flag = true
            obj.value() // 相当于调用了你指令传入的函数
          }, 1000)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .search {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 184px;
    @include bg_sub_color();
    .search-box {
      display: flex;
      align-items: center;
      margin: 40px 20px;
      background: #ebecec;
      border-radius: 30px;
      img {
        width: 40px;
        height: 40px;
        margin: 0 20px;
      }
      input {
        height: 60px;
        border: none;
        outline: none;
        background: transparent;
        @include font_size($font_medium_s);
      }
    }
    .search-suggest {
      position: fixed;
      left: 0;
      bottom: 0;
      top: 300px;
      right: 0;
      overflow: hidden;
      li {
        display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium);
        }
      }
    }
  }

</style>
