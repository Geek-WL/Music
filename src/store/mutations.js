import { SET_FULL_SCREEN, SET_MINI_PLAYER, SET_IS_PLAYING, SET_MODE_TYPE, SET_LIST_PLAYER } from './mutations-type'
export default {
  // 变量/常量作为方法名的话需要加[]
  [SET_FULL_SCREEN] (state, flag) {
    state.isFullScreen = flag
  },
  [SET_MINI_PLAYER] (state, flag) {
    state.isShowMiniPlayer = flag
  },
  [SET_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODE_TYPE] (state, flag) {
    state.modeType = flag
  }
}
