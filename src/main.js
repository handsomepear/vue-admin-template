import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './components/globalComponent'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/common.scss'
import '@/assets/element.variables.scss'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
