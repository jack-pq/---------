"use strict";
const common_vendor = require("./common/vendor.js");
const Index = () => "./src/views/index.js";
const Coupons = () => "./src/views/Coupons.js";
const DataTables = () => "./src/views/DataTables.js";
const Help = () => "./src/views/Help.js";
const OrderList = () => "./src/views/OrderList.js";
const Order = () => "./src/views/Order.js";
const Orders = () => "./src/views/Orders.js";
const ProductFlow = () => "./src/views/ProductFlow.js";
const UI = () => "./src/views/UI.js";
const User = () => "./src/views/User.js";
const routes = [
  {
    path: "/",
    name: "home",
    component: Index
  },
  {
    path: "/coupons",
    name: "coupons",
    component: Coupons
  },
  {
    path: "/data-tables",
    name: "data-tables",
    component: DataTables
  },
  {
    path: "/help",
    name: "help",
    component: Help
  },
  {
    path: "/order-list",
    name: "order-list",
    component: OrderList
  },
  {
    path: "/order",
    name: "order",
    component: Order
  },
  {
    path: "/orders",
    name: "orders",
    component: Orders
  },
  {
    path: "/product-flow",
    name: "product-flow",
    component: ProductFlow
  },
  {
    path: "/ui",
    name: "ui",
    component: UI
  },
  {
    path: "/user",
    name: "user",
    component: User
  },
  // 可以添加404页面
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];
const router = common_vendor.createRouter({
  history: common_vendor.createWebHistory(process.env.BASE_URL),
  routes
});
module.exports = router;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
