const state = {
  sidebar: {
    opened: false,
    withoutAnimation: false,
  },
}

const mutations = {
  TOOGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
