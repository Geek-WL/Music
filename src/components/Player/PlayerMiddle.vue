<template>
    <swiper :options="swiperOption" class="banner">
      <swiper-slide class="cd">
        <div class="cd-wrapper" ref="cdwrapper">
          <img src="http://p1.music.126.net/5vf3VOG7VppGmMHqQSKgQA==/109951164701857091.jpg?imageView&quality=89" alt="">
        </div>
        <p>sadasdsadasd</p>
      </swiper-slide>
      <swiper-slide class="lyric">
        <ScrollView>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>21</li>
            <li>22</li>
            <li>23</li>
            <li>24</li>
            <li>25</li>
            <li>26</li>
            <li>27</li>
            <li>28</li>
            <li>29</li>
            <li>30</li>
            <li>31</li>
            <li>32</li>
            <li>33</li>
            <li>34</li>
            <li>35</li>
            <li>36</li>
            <li>37</li>
            <li>38</li>
            <li>39</li>
            <li>40</li>
            <li>41</li>
            <li>42</li>
            <li>43</li>
            <li>44</li>
            <li>45</li>
            <li>46</li>
            <li>47</li>
            <li>48</li>
            <li>49</li>
            <li>50</li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        // 从网络获取数据 以下配置必需
        observer: true,
        observerParents: true,
        observerSlideChildren: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdwrapper.classList.add('active')
      } else {
        this.$refs.cdwrapper.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  right: 0;
  left: 0;
  .cd {
    .cd-wrapper {
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      animation: sport 5s linear infinite;
      // 设置动画状态为暂停
      animation-play-state: paused;
      &.active {
      animation-play-state: running;
    }
    }
    p {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type{
        padding-bottom: 100px;
      }
    }
  }
}
  @keyframes sport {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
<style lang="scss">
  @import "src/assets/css/mixin";
  .my-bullet {
    // 默认分页器的原点为span标签
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    margin: 0 20px;
  }
  .my-bullet-active {
    width: 60px;
    @include bg_color();
  }
</style>
