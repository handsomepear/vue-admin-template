import Vue from 'vue'
import { checkJurisdiction } from '../common/jurisdiction'

Vue.directive('permission', {
  inserted(el, binding) {
    // 获取到指令绑定的值
    const permission = binding.value
    if (permission) {
      const hasPermission = checkJurisdiction(permission)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('指令需要绑定value')
    }
  },
})
