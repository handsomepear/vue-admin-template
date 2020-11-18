// 实现一套换肤的功能
import Vue from 'vue'
import generatorColors from './color'
import colorMap from './colorMap'
const version = require('element-ui/package.json').version
const primaryColor = localStorage.getItem('themeColor') || '#20a0ff'
document.body.style.setProperty('--primary-color', primaryColor)

export const state = Vue.observable({
  primaryColor: primaryColor, // 初始颜色
  originStyle: '', // 最终替换生成的样式代码
  isFirstAppend: true, // 是不是首次添加
})

getIndexStyle()

export const mutations = {
  setPrimaryColor(color) {
    state.primaryColor = color
    document.body.style.setProperty('--primary-color', color)
    localStorage.setItem('themeColor', color)
  },
}

// 获取文件内容
function getFile(url, isBlob = false) {
  return new Promise((resolve, reject) => {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.responseType = isBlob ? 'blob' : ''
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState !== 4) return
      if (xmlHttp.status === 200) {
        const urlArr = xmlHttp.responseURL.split('/')
        resolve({
          data: xmlHttp.response,
          url: urlArr[url.length - 1],
        })
      } else {
        reject(new Error(xmlHttp.statusText))
      }
    }
    xmlHttp.open('GET', url)
    xmlHttp.send()
  })
}
// 1. 将默认主题中的颜色替换成关键词
function getStyleTemplate(data) {
  for (let k in colorMap) {
    const value = colorMap[k]
    data = data.replace(new RegExp(k, 'ig'), value)
  }
  return data
}

// cssText
function writeStyle(cssText) {
  const colors = Object.assign({}, { primary: primaryColor }, generatorColors(primaryColor))
  for (let k in colors) {
    // 将关键词再转换成色值
    cssText = cssText.replace(new RegExp('(:|\\s+)' + k, 'g'), '$1' + colors[k])
  }
  if (state.isFirstAppend) {
    // 首次添加
    const style = document.createElement('style')
    style.innerText = cssText
    document.head.appendChild(style)
    state.isFirstAppend = false
  } else {
    document.head.lastChild.innerText = cssText
  }
}

// 获取其它的样式
export function getSeparatedStyles() {
  getFile(`//unpkg.com/element-ui@${version}/lib/theme-chalk/`).then(({ data }) => console.log(data))
}

export function getIndexStyle() {
  getFile(`//unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`).then(({ data }) => {
    const originStyle = getStyleTemplate(data)
    writeStyle(originStyle)
  })
}
