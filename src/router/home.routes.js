import Layout from '../layout'
export default {
  path: '/',
  component: Layout,
  name: 'Home',
  meta: {
    title: '首页',
  },
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
    },
  ],
}
