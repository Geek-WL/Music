<template>
    <div class="player">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
    </div>
</template>

<script>
import PlayerHeader from '../components/Player/PlayerHeader'
import PlayerMiddle from '../components/Player/PlayerMiddle'
export default {
  name: 'Player',
  components: {
    PlayerHeader,
    PlayerMiddle
  }
}
</script>

<style scoped lang="scss">
.player {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: skyblue;
}
</style>
