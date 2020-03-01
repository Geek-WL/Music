<template>
<!--appear 属性为 初始化就显示效果-->
   <transition appear>
     <div class="account">
       <AccountHeader @switchItem="switchItem"></AccountHeader>
       <AccountBottom :switchNum="switchNum"></AccountBottom>
     </div>
   </transition>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader'
import AccountBottom from '../components/Account/AccountBottom'
import MetaInfo from '../../vue-meta-info'

export default {
  name: 'Account',
  metaInfo: MetaInfo.account,
  components: {
    AccountHeader,
    AccountBottom
  },
  data () {
    return {
      switchNum: 0
    }
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/mixin";
.account {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /*background: #fff;*/
  @include bg_sub_color();
}
.v-enter {
  /*opacity: 0;*/
  transform: translateX(100%);
}
.v-enter-to {
  /*opacity: 1;*/
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  /*opacity: 1;*/
  transform: translateX(0%);
}
.v-leave-to {
  /*opacity: 0;*/
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>
