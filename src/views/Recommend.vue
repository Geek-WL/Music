<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized :personalized="personalized" title="推荐歌单" @select="fatherSelectItem"></Personalized>
        <Personalized :personalized="albums" title="最新专辑"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>
    <router-view></router-view>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
import SongList from '../components/SongList'
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
        this.songs = data.result
      })
      .catch((data) => {
        // console.log(data)
      })
  },
  methods: {
    fatherSelectItem (id) {
      this.$router.push({
        path: `/recommend/detail/${id}`
      })
    }
  }
}
</script>

<style scoped>
.recommend {
  position: fixed;
  top: 184px;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
