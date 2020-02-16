// 这个js文件就是用来管理请求各种接口地址的
import Network from './network'
// 获取轮播数据
export const getBanner = () => Network.get('banner?type=2')
// 获取推荐歌单数据
export const getPersonalized = () => Network.get('personalized?limit=6')
// 获取最新专辑数据
export const getNewAlbum = () => Network.get('album/newest')
// 获取最新音乐数据
export const getNewSong = () => Network.get('personalized/newsong')
// 获取推荐歌单详情页数据
export const getPlayList = (data) => Network.get('playlist/detail', data)
// 获取最新专辑详情页数据
export const getAlbum = (data) => Network.get('album', data)
// 获取歌曲详情数据
export const getSongDetail = (data) => Network.get('song/detail', data)
// 获取歌曲歌词
export const getSongLyric = (data) => Network.get('lyric', data)
// 获取音乐播放地址
export const getSongURL = (data) => Network.get('song/url', data)
