import modeType from './modeType'
export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isShowListPlayer: false,
  isPlaying: false,
  modeType: modeType.loop,
  //  保存歌曲详情数据
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: []
}
