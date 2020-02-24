<template>
  <div class="recommend">
   <div class="recommend-wrapper">
     <ScrollView>
       <div>
         <Banner :banners="banners"></Banner>
         <Personalized :personalized="personalized" title="推荐歌单" @select="fatherSelectItem" type="personalized"></Personalized>
         <Personalized :personalized="albums" title="最新专辑" @select="fatherSelectItem" type="albums"></Personalized>
         <SongList :songs="songs"></SongList>
       </div>
     </ScrollView>
   </div>
    // 给路由出口添加动画
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created () {
    getBanner()
      .then((data) => {
        this.banners = data.banners
        // console.log(this.banners)
      })
      .catch((data) => {
        // console.log(data)
      })
    getPersonalized()
      .then((data) => {
        // console.log(data)
        this.personalized = data.result
      })
      .catch((data) => {
        // console.log(data)
      })
    getNewAlbum()
      .then((data) => {
        // console.log(data)
        this.albums = data.albums.splice(0, 6)
        // console.log(this.albums)
      })
      .catch((data) => {
        // console.log(data)
      })
    getNewSong()
      .then((data) => {
        // console.log(data)
        // console.log(data)
        // this.songs = data.result
        let list = []
        data.result.forEach((value) => {
          let obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.song.album.picUrl
          let singer = ''
          for (let i = 0; i < value.song['artists'].length; i++) {
            if (i === 0) {
              singer = value.song['artists'][i].name
            } else {
              singer += '-' + value.song['artists'][i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch((data) => {
        // console.log(data)
      })
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 184px;
  right: 0;
  left: 0;
  bottom: 0;
  /*overflow: hidden;*/
  .recommend-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
