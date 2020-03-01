import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './assets/css/base.scss'
// 导入自定义插件
import Loading from './plugin/loading/index'
// 统一管理多页面seo标签
import MetaInfo from 'vue-meta-info'
// 注册自定义插件
Vue.use(Loading, {
  title: '正在加载...'
})
// 使用MetaInfo插件
Vue.use(MetaInfo)
fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  // 可以通过配置loading来设置图片还未加载好之前的占位图片
  loading: require('./assets/images/loading.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
  // 以下代码是安装了预渲染插件vue-cli-plugin-prerender-spa之后自动添加的
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
