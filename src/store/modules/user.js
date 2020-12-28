import Cookies from 'js-cookie'
import { loginByUsername } from '@/api/'

const state = {
  token: '',
}
const mutations = {
  SET_TOKEN: function(state, payload) {
    state.token = payload
  },
}
const actions = {
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
