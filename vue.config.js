// 在nodejs中使用dom 得下载jsdom插件
const jsdom = require('jsdom')
const { JSDOM } = jsdom
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true // 压缩
            }
          }
        }
      ]
    }
  },
  // 以下代码是安装了预渲染插件vue-cli-plugin-prerender-spa之后自动添加的
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      // 添加对应路由地址，使该路由独立一个页面
      renderRoutes: [
        '/',
        '/recommend',
        '/singer',
        '/rank',
        '/search',
        '/account',
        '/detail'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // 预渲染内容写入之前的额外操作
        // console.log(route)
        // route是一个对象，主要有组件的路由地址和组件打包好后的html序列化字符串
        // 1.写入正则
        let reg = /<meta name="viewport.*user-scalable=no">/gi
        // 2.匹配错误的meta标签
        let res = route.html.match(reg)
        // replace方法返回一个新的字符串
        route.html = route.html.replace(res[1], '')

        // 在node中使用document(也可以用上述方法，即正则匹配对应字符串然后进行操作，但对于匹配较复杂的标签，推荐使用JSDOM插件来获取)
        // 1.根据字符串生成对应网页
        let html = new JSDOM(route.html)
        // 2.从创建好的网页中拿到document对象
        let dom = html.window.document
        // 3.找到对应元素，删除对应元素
        let loadingEle = dom.querySelector('.container')
        dom.body.removeChild(loadingEle)
        route.html = html.serialize()
        return route
      }
    }
  }
}
