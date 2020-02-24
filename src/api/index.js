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
// 获取热门歌手
// export const getHotArtists = () => Network.get('top/artists?offset=0&limit=5')
// 简单封装 改变抛出的数据 直接为数组，方便后续渲染
export const getHotArtists = () => {
  return new Promise((resolve, reject) => {
    Network.get('top/artists?offset=0&limit=5')
      .then((result) => {
        // console.log(result)
        resolve(result.artists)
      })
      .catch(err => {
        // console.log(err)
        reject(err)
      })
  })
}
// 获取 字母开头的 歌手
export const getLetterArtists = (letter) => {
  let letterArtists = []
  return new Promise((resolve, reject) => {
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&cat=1001&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=1002&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=1003&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=2002&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&cat=2003&initial=${letter}`)
    ])
      .then(result => {
        // console.log(result)
        // resolve(result)
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 获取所有字母
export const getAllArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    let keys = ['热']
    let list = [getHotArtists()]
    for (let i = 65; i < 91; i++) { // 利用ascall码值生成字母
      let char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    // console.log(keys)
    Network.all(list)
      .then(function (result) {
        let obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
