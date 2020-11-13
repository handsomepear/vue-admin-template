import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
Vue.use(VueRouter)

export const constantRoutes = [
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

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'], // or you can only set roles in sub nav
        },
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission',
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin'],
        },
      },
    ],
  },
]

const router = new VueRouter({
  constantRoutes,
})

export default router
