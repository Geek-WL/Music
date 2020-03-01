import Vue from 'vue'
import VueRouter from 'vue-router'

// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'

// vue组件异步加载(按需加载)
const Recommend = (resolve) => {
  import('../views/Recommend').then(module => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('../views/Detail').then(module => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then(module => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then(module => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then(module => {
    resolve(module)
  })
}
const Account = (resolve) => {
  import('../views/Account').then(module => {
    resolve(module)
  })
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/account',
    component: Account
  }
]

const router = new VueRouter({
  // history模式部署在服务器，需要后端进行一些配置，不然一刷新会出现Not Found错误
  // 虽然可以使用hash模式(不会出现上述问题)，但hash模式不利于浏览器seo
  // 并且如果使用了预渲染插件，那么必须为history模式
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
