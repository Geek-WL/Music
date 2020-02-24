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
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '../tools/tools'
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
        let index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
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
      // 注意点：在ios系统中不会自动加载歌曲，所以oncanplay不会自动执行
      // 在pc端和安卓端，系统会自动加载歌曲，所以oncanplay会自动加载歌曲
      /*
      * 解决方案：如何监听ios中audio的歌曲是否已经准备好了？
      *         通过ondurationchange事件来监听(适用音频和视频)
      * ondurationchange事件什么时候执行：当歌曲加载完成之后，因为只有歌曲加载完成后才能获取到歌曲时长
      * */
      // this.$refs.audio.oncanplay = () => {
      this.$refs.audio.ondurationchange = () => {
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
      // window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
      setLocalStorage('favoriteList', newValue)
    },
    historyList (newValue, oldValue) {
      // window.localStorage.setItem('historyList', JSON.stringify(newValue))
      setLocalStorage('historyList', newValue)
    }
  },
  created () {
    // 还原收藏歌曲
    // let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    // console.log(getLocalStorage('favoriteList'))
    let favoriteList = getLocalStorage('favoriteList')
    if (favoriteList === null) return
    this.setFavoriteList(favoriteList)
    // 还原播放历史
    // let historyList = JSON.parse(window.localStorage.getItem('historyList'))
    // console.log(getLocalStorage('historyList'))
    let historyList = getLocalStorage('historyList')
    if (historyList === null) return
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
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
