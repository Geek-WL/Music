<template>
    <div class="mini-player">
      <div class="player-wrapper">
        <div class="player-left">
          <img src="http://p1.music.126.net/5vf3VOG7VppGmMHqQSKgQA==/109951164701857091.jpg?imageView&quality=89" alt="">
          <div class="title">
            <h3>演员</h3>
            <p>薛之谦</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play"></div>
          <div class="list"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MiniPlayer'
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.mini-player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left {
      display: flex;
      padding-left: 30px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h3 {
          @include font_size($font_medium);
          @include font_color();
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play')
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')
      }
    }
  }
}
</style>
