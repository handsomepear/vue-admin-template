import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
Vue.use(VueRouter)

export const constantRoutes = [...getRoutes()]

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

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })
const router = createRouter()

// 重置路由：所有的路由信息都是存放在matcher中的，新建一个路由实例 然后替换旧的路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
