import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.mate.roles) {
    return roles.some(role => route.meta.roules.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        // 递归判断当前角色的权限 生成路由
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
    }
    res.push(tmp)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
}

const actions = {
  generateRoues({ commit }, roles) {
    return new Promise(resolve => {
      let accessdRoutes
      if (roles.includes('admin')) {
        // admin 管理员 拥有所有权限
        accessdRoutes = asyncRoutes || []
      } else {
        accessdRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessdRoutes)
      resolve(accessdRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
