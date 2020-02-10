<!--此组件为推荐MV组件-->
<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
        <!--<img :src="value.picUrl" alt="">-->
        <img v-lazy="value.picUrl" alt="">
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    selectItem (id) {
      // console.log(id)
      this.$emit('select', id)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.personalized {
  @include bg_sub_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    border-bottom: 1px solid #ccc;
    //@include bg_sub_color();
    padding: 0 30px;
    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
    }
  }
  .personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0 0 0;
    .item {
      width: 200px;
      padding-bottom: 20px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      p {
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
      }
    }
  }
}
</style>
