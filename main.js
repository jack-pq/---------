import { createRouter, createWebHistory } from 'vue-router'

// 导入所有页面组件
import Index from '@/src/views/index.vue'
import Coupons from '@/src/views/Coupons.vue'
import DataTables from '@/src/views/DataTables.vue'
import Help from '@/src/views/Help.vue'
import OrderList from '@/src/views/OrderList.vue'
import Order from '@/src/views/Order.vue'
import Orders from '@/src/views/Orders.vue'
import ProductFlow from '@/src/views/ProductFlow.vue'
import UI from '@/src/views/UI.vue'
import User from '@/src/views/User.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/coupons',
    name: 'coupons',
    component: Coupons
  },
  {
    path: '/data-tables',
    name: 'data-tables',
    component: DataTables
  },
  {
    path: '/help',
    name: 'help',
    component: Help
  },
  {
    path: '/order-list',
    name: 'order-list',
    component: OrderList
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/product-flow',
    name: 'product-flow',
    component: ProductFlow
  },
  {
    path: '/ui',
    name: 'ui',
    component: UI
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  // 可以添加404页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router