export default {
  path: '/about',
  name: 'About',
  component: () => import(/* webpackChunkName: "home" */ '../views/About'),
  children: [{ path: '/exit', component: () => import(/* webpackChunkName: "about" */ '../views/About') }],
}
