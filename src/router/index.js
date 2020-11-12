import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  ...getRoutes(),
]

function getRoutes() {
  const routes = []
  const requireRoutes = require.context('.', false, /\.routes\.js/)
  requireRoutes.keys().forEach(routePath => {
    routes.push(requireRoutes(routePath).default)
  })
  return routes
}

const router = new VueRouter({
  routes,
})

export default router
