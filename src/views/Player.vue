<template>
    <div class="player">
      <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
      <MiniPlayer></MiniPlayer>
      <ListPlayer ref="listplayer"></ListPlayer>
      <audio :src="this.currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
    </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import modeType from '../store/modeType'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeupdate (e) {
      // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime // e.target = audio
    },
    end () {
      // console.log('end.log')
      if (this.modeType === modeType.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === modeType.one) {
        this.$refs.audio.play() // 重新播放
      } else if (this.modeType === modeType.random) {
        let index = this.getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    },
    getRandomIntInclusive (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play()
        this.setHistorySong(this.currentSong)
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.$refs.audio.play()
          this.setHistorySong(this.currentSong)
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      // console.log(newValue)
      // console.log(JSON.stringify(newValue))
      window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
    },
    historyList (newValue, oldValue) {
      window.localStorage.setItem('historyList', JSON.stringify(newValue))
    }
  },
  created () {
    // 还原收藏歌曲
    let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    if (favoriteList === null) return
    this.setFavoriteList(favoriteList)
    // 还原播放历史
    let historyList = JSON.parse(window.localStorage.getItem('historyList'))
    if (historyList === null) return
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  }
}
</script>

<style scoped lang="scss">

</style>
