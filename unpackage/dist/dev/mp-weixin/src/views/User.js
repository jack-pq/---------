"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const router = common_vendor.useRouter();
    const userInfo = common_vendor.ref({
      name: "奶茶爱好者",
      membership: "银卡会员",
      avatar: "https://picsum.photos/id/64/200"
    });
    const userStats = common_vendor.ref({
      orders: 0,
      coupons: 0,
      points: 0
    });
    const orderTabs = common_vendor.ref([
      { icon: "icon-dingdan", label: "全部订单", path: "orders" },
      { icon: "icon-daiquhuo", label: "待取餐", path: "pending-orders" },
      { icon: "icon-shouhou", label: "售后", path: "after-sales" }
    ]);
    const services = common_vendor.ref([
      {
        icon: "icon-youhuiquan",
        label: "优惠券",
        path: "coupons",
        bgColor: "bg-blue-50",
        textColor: "text-accent"
      },
      {
        icon: "icon-jifen",
        label: "积分商城",
        path: "points-mall",
        bgColor: "bg-purple-50",
        textColor: "text-purple-500"
      },
      {
        icon: "icon-kefu",
        label: "联系客服",
        path: "customer-service",
        bgColor: "bg-green-50",
        textColor: "text-green-500"
      },
      {
        icon: "icon-help",
        label: "帮助中心",
        path: "help",
        bgColor: "bg-orange-50",
        textColor: "text-orange-500"
      }
    ]);
    const navItems = common_vendor.ref([
      { icon: "icon-shouye", label: "首页", path: "home", active: false },
      { icon: "icon-fenlei", label: "点单", path: "order", active: false },
      { icon: "icon-gouwuche", label: "购物车", path: "cart", active: false },
      { icon: "icon-wode", label: "我的", path: "user", active: true }
    ]);
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    return {
      userInfo,
      userStats,
      orderTabs,
      services,
      navItems,
      navigateTo
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $setup.navigateTo("settings")),
    b: common_vendor.t($setup.userInfo.name),
    c: common_vendor.t($setup.userInfo.membership),
    d: common_vendor.o(($event) => $setup.navigateTo("login")),
    e: common_vendor.t($setup.userStats.orders),
    f: common_vendor.t($setup.userStats.coupons),
    g: common_vendor.t($setup.userStats.points),
    h: common_vendor.f($setup.orderTabs, (orderTab, index, i0) => {
      return {
        a: common_vendor.n(orderTab.icon),
        b: common_vendor.t(orderTab.label),
        c: index,
        d: common_vendor.o(($event) => $setup.navigateTo(orderTab.path), index)
      };
    }),
    i: common_vendor.f($setup.services, (service, index, i0) => {
      return {
        a: common_vendor.n(service.icon),
        b: common_vendor.n(service.textColor),
        c: common_vendor.n(service.bgColor),
        d: common_vendor.t(service.label),
        e: index,
        f: common_vendor.o(($event) => $setup.navigateTo(service.path), index)
      };
    }),
    j: common_vendor.f($setup.navItems, (nav, index, i0) => {
      return {
        a: common_vendor.n(nav.icon),
        b: common_vendor.n(nav.active ? "text-primary" : "text-gray-400"),
        c: common_vendor.t(nav.label),
        d: nav.active ? 1 : "",
        e: !nav.active ? 1 : "",
        f: index,
        g: common_vendor.o(($event) => $setup.navigateTo(nav.path), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/views/User.js.map
