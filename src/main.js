import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './assets/css/base.scss'
// 导入自定义插件
import Loading from './plugin/loading/index'
// 注册自定义插件
Vue.use(Loading, {
  title: '正在加载...'
})
fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  // 可以通过配置loading来设置图片还未加载好之前的占位图片
  loading: require('./assets/images/loading.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
