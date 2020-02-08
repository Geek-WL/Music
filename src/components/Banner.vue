<template>
<!--swiper的bug,如果数据是从网络获取的,那么自动轮播到最后页之后就不动了-->
<!--只需在swiper标签上添加 v-if='数据.length > 0'-->
  <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      swiperOption: {
        loop: true, // 开启循环模式
        autoplay: {
          delay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时自动停止切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay
        },
        // 分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observerParents: true,
        observerSlideChildren: true
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="scss">
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>

<!--以下代码是为了覆盖swiper-pagination-bullet在swiper中的默认样式,由于上一个style中有scoped,无法覆盖,因此新增以下style-->
<style lang="scss">
  @import "src/assets/css/mixin";
  .banner {
    .swiper-pagination-bullet {
      width: 16px;
      height: 16px;
      background: #fff;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      @include bg_color()
    }
  }
</style>
