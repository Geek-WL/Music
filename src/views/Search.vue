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
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hots" :key="value.first" @click.stop="selectedHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <div class="search-history">
      <ul>
        <li v-for="(value) in searchHistory" :key="value">
          <div class="history-left">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
            <p>{{value}}</p>
          </div>
          <div class="history-right">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" @click.stop="delHistory(value)">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchList, getHotSearch } from '../api'
import { mapActions } from 'vuex'
import { getLocalStorage, setLocalStorage } from '../tools/tools'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Search',
  metaInfo: MetaInfo.search,
  created () {
    getHotSearch()
      .then((data) => {
        // console.log(data)
        this.hots = data.result.hots
      })
      .catch((err) => {
        console.log(err)
      })
    // 判断local有无搜索历史
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) return
    this.searchHistory = getLocalStorage('searchHistory')
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistory: []
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
      if (this.keywords === '') return // 当关键词被删除时，为空不需要发送请求
      getSearchList({ keywords: this.keywords })
        .then(data => {
          // console.log(data)
          this.songs = data.result.songs
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])

      if (this.searchHistory.includes(this.keywords)) return
      this.searchHistory.unshift(this.keywords)
      // 保存历史到local 下次刷新时重新赋值给this.searchHistory
      setLocalStorage('searchHistory', this.searchHistory)
      this.keywords = ''
    },
    selectedHot (value) {
      // console.log(e)
      this.keywords = value
      // 手动给input的value 直接赋值无法监听到对应的input事件 因此需要手动发送请求
      this.search()
    },
    delHistory (name) {
      // this.searchHistory.splice(index, 1)
      this.searchHistory = this.searchHistory.filter(function (item) {
        return item !== name
      })
      setLocalStorage('searchHistory', this.searchHistory)
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
      @include bg_sub_color();
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
    .search-hot {
      h3 {
        @include font_color();
        @include font_size($font_medium);
        padding: 10px 20px;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        li {
          /*width: 60px;*/
          height: 60px;
          line-height: 60px;
          border: 1px solid #ccc;
          border-radius: 30px;
          padding: 0 20px;
          margin: 5px 15px;
          @include font_color();
          @include font_size($font_medium_s)
        }
      }
    }
    .search-history {
      li {
        padding: 20px 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .history-left {
          display: flex;
          img {
            width: 40px;
            height: 40px;
          }
          p {
            margin-left: 20px;
            @include font_color();
            @include font_size($font_medium_s)
          }
        }
        .history-right {
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }

</style>
