import router from './router'
import store from './store'

import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = to.meta.title
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 当前是否已经获取到了用户的角色信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // 去获取用户的信息 包括用户的角色
        try {
          const { roles } = await store.dispatch('user/getInfo')
          // 根据用户角色获取到有权限的路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 将路由表追加到路由当中
          router.addRoutes(accessRoutes)
          // 添加成功之后 replace 当前的路由路径。
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token 并且重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
