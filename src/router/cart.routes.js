export default {
  path: '/cart',
  name: 'Cart',
  meta: {
    title: '购物车',
  },
  component: () => import(/* webpackChunkName: "home" */ '../views/Cart'),
}
