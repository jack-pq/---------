"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const router = common_vendor.useRouter();
    const orderStatusText = {
      pending: "待取餐",
      completed: "已完成",
      canceled: "已取消"
    };
    const orderTabs = common_vendor.ref([
      { id: "all", label: "全部订单" },
      { id: "pending", label: "待付款" },
      { id: "pickup", label: "待取餐" },
      { id: "completed", label: "已完成" },
      { id: "canceled", label: "已取消" }
    ]);
    const activeTab = common_vendor.ref("all");
    const orders = common_vendor.ref([
      {
        id: "2023101500123",
        store: "吊毛奶茶(科技园店)",
        status: "pending",
        date: "2023-10-15 14:30",
        total: 34,
        items: [
          {
            name: "芋圆奶茶",
            description: "中杯 · 七分糖 · 去冰",
            quantity: 1,
            price: 18,
            image: "https://picsum.photos/id/431/80/80"
          },
          {
            name: "珍珠奶茶",
            description: "大杯 · 五分糖 · 少冰",
            quantity: 1,
            price: 16,
            image: "https://picsum.photos/id/292/80/80"
          }
        ]
      },
      {
        id: "2023101400089",
        store: "吊毛奶茶(大学城店)",
        status: "completed",
        date: "2023-10-14 10:15",
        total: 22,
        items: [
          {
            name: "草莓奶盖",
            description: "中杯 · 三分糖 · 去冰",
            quantity: 1,
            price: 22,
            image: "https://picsum.photos/id/1080/80/80"
          }
        ]
      },
      {
        id: "2023101300056",
        store: "吊毛奶茶(科技园店)",
        status: "canceled",
        date: "2023-10-13 16:45",
        total: 20,
        items: [
          {
            name: "抹茶奶茶",
            description: "中杯 · 五分糖 · 少冰",
            quantity: 1,
            price: 20,
            image: "https://picsum.photos/id/312/80/80"
          }
        ]
      }
    ]);
    const navItems = common_vendor.ref([
      { icon: "icon-shouye", label: "首页", path: "home", active: false },
      { icon: "icon-fenlei", label: "点单", path: "order", active: false },
      { icon: "icon-gouwuche", label: "购物车", path: "cart", active: false },
      { icon: "icon-wode", label: "我的", path: "user", active: true }
    ]);
    const filteredOrders = common_vendor.computed(() => {
      if (activeTab.value === "all") {
        return orders.value;
      }
      return orders.value.filter((order) => order.status === activeTab.value);
    });
    const switchTab = (tabId) => {
      activeTab.value = tabId;
    };
    const cancelOrder = (orderId) => {
      if (confirm("确定要取消该订单吗？")) {
        const order = orders.value.find((o) => o.id === orderId);
        if (order) {
          order.status = "canceled";
        }
      }
    };
    const showPickupCode = (orderId) => {
      alert(`订单 ${orderId} 的取餐码是: 1234`);
    };
    const reorder = (order) => {
      alert(`已将订单 ${order.id} 的商品重新加入购物车`);
    };
    const viewOrderDetails = (orderId) => {
      router.push(`/order-details/${orderId}`);
    };
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    return {
      orderStatusText,
      orderTabs,
      activeTab,
      orders,
      navItems,
      filteredOrders,
      switchTab,
      cancelOrder,
      showPickupCode,
      reorder,
      viewOrderDetails,
      navigateTo
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $setup.navigateTo("search")),
    b: common_vendor.f($setup.orderTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.label),
        b: index,
        c: $setup.activeTab === tab.id ? 1 : "",
        d: $setup.activeTab !== tab.id ? 1 : "",
        e: common_vendor.o(($event) => $setup.switchTab(tab.id), index)
      };
    }),
    c: common_vendor.f($setup.filteredOrders, (order, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(order.store),
        b: common_vendor.t($setup.orderStatusText[order.status]),
        c: order.status === "pending" ? 1 : "",
        d: order.status === "completed" ? 1 : "",
        e: order.status === "canceled" ? 1 : "",
        f: common_vendor.t(order.id),
        g: common_vendor.t(order.date),
        h: common_vendor.f(order.items, (item, itemIndex, i1) => {
          return {
            a: item.image,
            b: item.name,
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.description),
            e: common_vendor.t(item.quantity),
            f: itemIndex
          };
        }),
        i: common_vendor.t(order.total),
        j: order.status === "pending"
      }, order.status === "pending" ? {
        k: common_vendor.o(($event) => $setup.cancelOrder(order.id), index)
      } : {}, {
        l: order.status === "pending"
      }, order.status === "pending" ? {
        m: common_vendor.o(($event) => $setup.showPickupCode(order.id), index)
      } : {}, {
        n: order.status === "completed" || order.status === "canceled"
      }, order.status === "completed" || order.status === "canceled" ? {
        o: common_vendor.o(($event) => $setup.reorder(order), index)
      } : {}, {
        p: order.status === "completed"
      }, order.status === "completed" ? {
        q: common_vendor.o(($event) => $setup.viewOrderDetails(order.id), index)
      } : {}, {
        r: index
      });
    }),
    d: common_vendor.f($setup.navItems, (nav, index, i0) => {
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/views/Orders.js.map
