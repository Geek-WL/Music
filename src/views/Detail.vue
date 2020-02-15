<template>
    <div class="detail">
      <SubHeader :title="playList.name" class="detail-header"></SubHeader>
      <DetailTop :path="playList.coverImgUrl" ref="top"></DetailTop>
      <div class="bottom">
        <ScrollView ref="scrollview">
          <DetailBottom :playlist="playList.tracks"></DetailBottom>
        </ScrollView>
      </div>
    </div>
</template>

<script>
import SubHeader from '../components/Detail/DetailHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import { getAlbum, getPlayList } from '../api/index'
export default {
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data () {
    return {
      playList: {}
    }
  },
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playList = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'albums') {
      getAlbum({ id: this.$route.params.id })
        .then(data => {
          // console.log(data)
          this.playList = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    let defaultHeight = this.$refs.top.$el.offsetHeight

    this.$refs.scrollview.scrolling((offsetY) => {
      // console.log(offsetY)
      if (offsetY < 0) {
        // let scale = 10 * Math.abs(offsetY) / defaultHeight
        let scale = Math.floor(Math.abs(offsetY)) / defaultHeight
        console.log(scale)
        // 注意点：高斯模糊效果非常消耗性能，不推荐在移动端中使用
        //       如果非要在移动端中使用，那么建议只使用一次
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
        this.$refs.top.changMaskOp(scale)
      } else {
        let scale = 1 + offsetY / defaultHeight
        // console.log(this)
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/mixin";
  .detail {
    @include bg_sub_color();
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    /*background: #fff;*/
    //@include bg_color()
    //@include bg_sub_color();
    .detail-header {
      position: relative;
      z-index: 6;
    }
    .bottom {
      position: fixed;
      top: 500px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

</style>
