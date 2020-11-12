export default {
  path: '/home',
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
  children: [{ path: '/exit', component: () => import(/* webpackChunkName: "about" */ '../views/About') }],
}
