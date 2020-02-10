<template>
    <div class="detail">
      <SubHeader :title="playList.name"></SubHeader>
      <DetailTop :path="playList.coverImgUrl"></DetailTop>
      <DetailBottom :playlist="playList.tracks"></DetailBottom>
    </div>
</template>

<script>
import SubHeader from '../components/SubHeader'
import DetailTop from '../components/DetailTop'
import DetailBottom from '../components/DetailBottom'
import { getPlayList } from '../api/index'
export default {
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom
  },
  data () {
    return {
      playList: []
    }
  },
  created () {
    getPlayList({ id: this.$route.params.id })
      .then((data) => {
        console.log(data)
        this.playList = data.playlist
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
  /*@import "src/assets/css/mixin";*/
  .detail {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    /*background: #fff;*/
    //@include bg_color()
    //@include bg_sub_color();
  }

</style>
