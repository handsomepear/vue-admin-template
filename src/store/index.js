import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import { loginByUsername } from '@/api/'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    SET_TOKEN: function(state, payload) {
      state.token = payload
    },
  },
  actions: {
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(res => {
            const data = res.data
            Cookies.get('Token', res.data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
  modules: {},
})
