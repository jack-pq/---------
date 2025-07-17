import { createRouter, createWebHistory } from 'vue-router'

// 导入所有页面组件
import Index from '@/views/Index.vue'
import Coupons from '@/views/Coupons.vue'
import DataTables from '@/views/DataTables.vue'
import Help from '@/views/Help.vue'
import OrderList from '@/views/OrderList.vue'
import Order from '@/views/Order.vue'
import Orders from '@/views/Orders.vue'
import ProductFlow from '@/views/ProductFlow.vue'
import UI from '@/views/UI.vue'
import User from '@/views/User.vue'

import Welcome from '@/views/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/home',
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