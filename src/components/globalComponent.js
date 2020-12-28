import Vue from 'vue'

// 获取一个需要require的文件的执行环境
/**
 * arg1: 读取文件的路径
 * arg2: 是否遍历文件路径的子目录
 * arg3: 匹配文件的正则
 */
const requireComponent = require.context('.', true, /\.vue$/)

// keys() 获取到所匹配到的文件相对路径
requireComponent.keys().forEach(filePath => {
  // 获取到对应路径的模块
  const config = requireComponent(filePath)
  // 默认取文件夹的名字为组件名，如果没有文件夹 则取文件名为组件名
  const componentName = filePath.replace(/^\.(\/(.*))?\/(.*)\.vue$/, function($1, $2, $3, $4) {
    return $3 || $4
  })

  // 注册全局组件
  Vue.component(componentName, config.default || config)
})

// function changeStr(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1)
// }
