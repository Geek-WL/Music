<template>
  <div class="recommend">
    <Banner :banners="banners"></Banner>
    <Personalized :personalized="personalized" title="推荐歌单"></Personalized>
    <Personalized :personalized="albums" title="最新专辑"></Personalized>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum } from '../api/index'
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: []
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
        console.log(data)
        this.albums = data.albums.splice(0, 6)
        console.log(this.albums)
      })
      .catch((data) => {
        // console.log(data)
      })
  }
}
</script>

<style scoped>

</style>
