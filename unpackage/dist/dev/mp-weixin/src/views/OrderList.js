"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const router = common_vendor.useRouter();
    const cartItems = common_vendor.ref([
      {
        id: "1",
        name: "芋圆奶茶",
        price: 18,
        description: "中杯 · 七分糖 · 去冰",
        quantity: 1,
        checked: true,
        image: "https://picsum.photos/id/431/100/100"
      },
      {
        id: "2",
        name: "珍珠奶茶",
        price: 16,
        description: "大杯 · 五分糖 · 少冰",
        quantity: 1,
        checked: true,
        image: "https://picsum.photos/id/292/100/100"
      },
      {
        id: "3",
        name: "草莓奶盖",
        price: 22,
        description: "中杯 · 三分糖 · 去冰",
        quantity: 1,
        checked: true,
        image: "https://picsum.photos/id/1080/100/100"
      }
    ]);
    const navItems = common_vendor.ref([
      { icon: "icon-shouye", label: "首页", path: "home", active: false },
      { icon: "icon-fenlei", label: "点单", path: "order", active: false },
      { icon: "icon-gouwuche", label: "购物车", path: "cart", active: true },
      { icon: "icon-wode", label: "我的", path: "user", active: false }
    ]);
    const selectedCount = common_vendor.computed(() => {
      return cartItems.value.filter((item) => item.checked).length;
    });
    const totalPrice = common_vendor.computed(() => {
      return cartItems.value.filter((item) => item.checked).reduce((total, item) => total + item.price * item.quantity, 0);
    });
    const isAllSelected = common_vendor.computed(() => {
      return cartItems.value.length > 0 && cartItems.value.every((item) => item.checked);
    });
    const increaseQuantity = (index) => {
      cartItems.value[index].quantity++;
      saveCartData();
    };
    const decreaseQuantity = (index) => {
      if (cartItems.value[index].quantity > 1) {
        cartItems.value[index].quantity--;
        saveCartData();
      }
    };
    const toggleItemChecked = (index) => {
      cartItems.value[index].checked = !cartItems.value[index].checked;
      saveCartData();
    };
    const toggleSelectAll = () => {
      const shouldSelectAll = !isAllSelected.value;
      cartItems.value.forEach((item) => {
        item.checked = shouldSelectAll;
      });
      saveCartData();
    };
    const removeItem = (index) => {
      if (confirm("确定要删除该商品吗？")) {
        cartItems.value.splice(index, 1);
        saveCartData();
      }
    };
    const clearCart = () => {
      if (confirm("确定要清空购物车吗？")) {
        cartItems.value = [];
        saveCartData();
      }
    };
    const checkout = () => {
      if (selectedCount.value === 0) {
        alert("请选择要结算的商品");
        return;
      }
      router.push("/orders");
    };
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    const saveCartData = () => {
      localStorage.setItem("milkTeaCart", JSON.stringify(cartItems.value));
    };
    const loadCartData = () => {
      const savedCart = localStorage.getItem("milkTeaCart");
      if (savedCart) {
        cartItems.value = JSON.parse(savedCart);
      }
    };
    loadCartData();
    return {
      cartItems,
      navItems,
      selectedCount,
      totalPrice,
      isAllSelected,
      increaseQuantity,
      decreaseQuantity,
      toggleItemChecked,
      toggleSelectAll,
      removeItem,
      clearCart,
      checkout,
      navigateTo
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $setup.clearCart && $setup.clearCart(...args)),
    b: $setup.cartItems.length > 0
  }, $setup.cartItems.length > 0 ? {
    c: common_vendor.f($setup.cartItems, (item, index, i0) => {
      return {
        a: item.checked ? 1 : "",
        b: !item.checked ? 1 : "",
        c: item.checked ? 1 : "",
        d: common_vendor.o(($event) => $setup.toggleItemChecked(index), index),
        e: item.image,
        f: item.name,
        g: common_vendor.t(item.name),
        h: common_vendor.t(item.price),
        i: common_vendor.t(item.description),
        j: common_vendor.o(($event) => $setup.decreaseQuantity(index), index),
        k: common_vendor.t(item.quantity),
        l: common_vendor.o(($event) => $setup.increaseQuantity(index), index),
        m: common_vendor.o(($event) => $setup.removeItem(index), index),
        n: index
      };
    })
  } : {
    d: common_vendor.o(($event) => $setup.navigateTo("order"))
  }, {
    e: $setup.cartItems.length > 0
  }, $setup.cartItems.length > 0 ? {
    f: $setup.isAllSelected ? 1 : "",
    g: !$setup.isAllSelected ? 1 : "",
    h: $setup.isAllSelected ? 1 : "",
    i: common_vendor.o((...args) => $setup.toggleSelectAll && $setup.toggleSelectAll(...args)),
    j: common_vendor.t($setup.selectedCount),
    k: common_vendor.t($setup.totalPrice.toFixed(2)),
    l: common_vendor.o((...args) => $setup.checkout && $setup.checkout(...args))
  } : {}, {
    m: common_vendor.f($setup.navItems, (nav, index, i0) => {
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
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/views/OrderList.js.map
