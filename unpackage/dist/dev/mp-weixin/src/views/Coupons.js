"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const router = common_vendor.useRouter();
    const activeTab = common_vendor.ref("available");
    const coupons = common_vendor.ref([
      {
        id: "1",
        type: "money",
        typeText: "满30减",
        value: 10,
        valueDisplay: "10",
        unit: "元",
        name: "满30元减10元优惠券",
        expiryDate: "2023-12-31",
        description: "全场饮品通用，不可叠加使用",
        minAmount: 30,
        bgClass: "bg-gradient-coupon-1",
        status: "available"
      },
      {
        id: "2",
        type: "discount",
        typeText: "discount",
        value: 8.5,
        valueDisplay: "8.5",
        unit: "折",
        name: "全场8.5折优惠券",
        expiryDate: "2023-11-15",
        description: "限奶茶系列使用，单笔最高减15元",
        minAmount: 0,
        bgClass: "bg-gradient-coupon-2",
        status: "available"
      },
      {
        id: "3",
        type: "free",
        typeText: "免费",
        value: "中杯奶茶",
        valueDisplay: "中杯奶茶",
        unit: "兑换券",
        name: "免费中杯奶茶兑换券",
        expiryDate: "2023-10-30",
        description: "限指定饮品使用，需任意消费",
        minAmount: 0,
        bgClass: "bg-gradient-coupon-3",
        status: "available"
      },
      {
        id: "4",
        type: "money",
        typeText: "满20减",
        value: 5,
        valueDisplay: "5",
        unit: "元",
        name: "满20元减5元优惠券",
        expiryDate: "2023-09-30",
        description: "全场饮品通用，不可叠加使用",
        minAmount: 20,
        bgClass: "bg-gradient-gray-1",
        status: "expired"
      }
    ]);
    const navItems = common_vendor.ref([
      { icon: "icon-shouye", label: "首页", path: "home", active: false },
      { icon: "icon-fenlei", label: "点单", path: "order", active: false },
      { icon: "icon-gouwuche", label: "购物车", path: "cart", active: false },
      { icon: "icon-wode", label: "我的", path: "user", active: true }
    ]);
    const availableCoupons = common_vendor.computed(() => {
      return coupons.value.filter((coupon) => coupon.status === "available");
    });
    const expiredCoupons = common_vendor.computed(() => {
      return coupons.value.filter((coupon) => coupon.status === "expired");
    });
    const switchTab = (tab) => {
      activeTab.value = tab;
    };
    const useCoupon = (coupon) => {
      localStorage.setItem("selectedCoupon", JSON.stringify({
        id: coupon.id,
        type: coupon.type,
        value: coupon.value,
        minAmount: coupon.minAmount
      }));
      router.push("/order");
      alert(`已选择${coupon.type === "money" ? "满" + coupon.minAmount + "减" + coupon.value : coupon.type === "discount" ? coupon.value + "折" : coupon.value}优惠券`);
    };
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    return {
      activeTab,
      availableCoupons,
      expiredCoupons,
      navItems,
      switchTab,
      useCoupon,
      navigateTo
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.availableCoupons.length),
    b: $setup.activeTab === "available" ? 1 : "",
    c: $setup.activeTab !== "available" ? 1 : "",
    d: common_vendor.o(($event) => $setup.switchTab("available")),
    e: common_vendor.t($setup.expiredCoupons.length),
    f: $setup.activeTab === "expired" ? 1 : "",
    g: $setup.activeTab !== "expired" ? 1 : "",
    h: common_vendor.o(($event) => $setup.switchTab("expired")),
    i: $setup.activeTab === "available"
  }, $setup.activeTab === "available" ? {
    j: common_vendor.f($setup.availableCoupons, (coupon, index, i0) => {
      return {
        a: common_vendor.t(coupon.typeText),
        b: common_vendor.t(coupon.valueDisplay),
        c: common_vendor.t(coupon.unit),
        d: common_vendor.n(coupon.bgClass),
        e: common_vendor.t(coupon.name),
        f: common_vendor.t(coupon.expiryDate),
        g: common_vendor.t(coupon.description),
        h: common_vendor.o(($event) => $setup.useCoupon(coupon), index),
        i: index
      };
    })
  } : {}, {
    k: $setup.activeTab === "expired"
  }, $setup.activeTab === "expired" ? {
    l: common_vendor.f($setup.expiredCoupons, (coupon, index, i0) => {
      return {
        a: common_vendor.t(coupon.typeText),
        b: common_vendor.t(coupon.valueDisplay),
        c: common_vendor.t(coupon.unit),
        d: common_vendor.t(coupon.name),
        e: common_vendor.t(coupon.expiryDate),
        f: common_vendor.t(coupon.description),
        g: index
      };
    })
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/views/Coupons.js.map
