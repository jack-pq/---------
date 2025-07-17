"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const router = common_vendor.useRouter();
    const slides = common_vendor.ref([
      {
        title: "秋季新品上市",
        desc: "限定款奶茶第二杯半价",
        bg: "linear-gradient(to right, rgba(22, 119, 255, 0.9), rgba(64, 169, 255, 0.7))"
      },
      {
        title: "会员专享",
        desc: "充值100送20",
        bg: "linear-gradient(to right, rgba(255, 153, 0, 0.9), rgba(255, 193, 7, 0.7))"
      },
      {
        title: "周末特惠",
        desc: "全场饮品8折起",
        bg: "linear-gradient(to right, rgba(72, 187, 120, 0.9), rgba(16, 185, 129, 0.7))"
      }
    ]);
    const currentSlideIndex = common_vendor.ref(0);
    const currentSlide = common_vendor.computed(() => slides.value[currentSlideIndex.value]);
    const quickLinks = common_vendor.ref([
      {
        icon: "icon-diancan",
        label: "立即点单",
        path: "order",
        bgColor: "bg-orange-50",
        textColor: "text-orange-500"
      },
      {
        icon: "icon-youhuiquan",
        label: "优惠券",
        path: "coupons",
        bgColor: "bg-purple-50",
        textColor: "text-purple-500"
      },
      {
        icon: "icon-dingdan",
        label: "我的订单",
        path: "orders",
        bgColor: "bg-green-50",
        textColor: "text-green-500"
      },
      {
        icon: "icon-jifen",
        label: "个人中心",
        path: "user",
        bgColor: "bg-blue-50",
        textColor: "text-blue-500"
      }
    ]);
    const products = common_vendor.ref([
      {
        id: 1,
        name: "珍珠奶茶",
        description: "经典奶茶 · Q弹珍珠",
        price: 16,
        image: "https://picsum.photos/id/292/300/200",
        category: "popular"
      },
      {
        id: 2,
        name: "草莓奶盖",
        description: "新鲜草莓 · 芝士奶盖",
        price: 22,
        image: "https://picsum.photos/id/1080/300/200",
        category: "popular"
      },
      {
        id: 3,
        name: "芋泥波波奶茶",
        description: "香糯芋泥 · 黑糖波波",
        price: 19,
        image: "https://picsum.photos/id/175/300/200",
        category: "new"
      },
      {
        id: 4,
        name: "芒果多多",
        description: "新鲜芒果 · 椰果",
        price: 20,
        image: "https://picsum.photos/id/163/300/200",
        category: "new"
      }
    ]);
    const navItems = common_vendor.ref([
      { icon: "icon-shouye", label: "首页", path: "home", active: true },
      { icon: "icon-fenlei", label: "点单", path: "order", active: false },
      { icon: "icon-gouwuche", label: "购物车", path: "cart", active: false },
      { icon: "icon-wode", label: "我的", path: "user", active: false }
    ]);
    const searchTerm = common_vendor.ref("");
    const filteredProducts = common_vendor.computed(() => {
      if (!searchTerm.value) {
        return products.value.filter((product) => product.category === "popular");
      }
      const term = searchTerm.value.toLowerCase();
      return products.value.filter(
        (product) => product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term)
      );
    });
    const newProducts = common_vendor.computed(() => {
      return products.value.filter((product) => product.category === "new");
    });
    const cartCount = common_vendor.ref(0);
    const goToSlide = (index) => {
      currentSlideIndex.value = index;
    };
    const handleBannerClick = () => {
      router.push("/promotion");
    };
    const handleSearch = () => {
      common_vendor.index.__f__("log", "at src/views/index.vue:316", "搜索内容:", searchTerm.value);
    };
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    const addToCart = (product) => {
      common_vendor.index.__f__("log", "at src/views/index.vue:325", "添加到购物车:", product);
      cartCount.value += 1;
    };
    common_vendor.onMounted(() => {
      setInterval(() => {
        currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length;
      }, 5e3);
      const cartData = JSON.parse(localStorage.getItem("milkTeaCart") || "[]");
      cartCount.value = cartData.reduce((total, item) => {
        return item.checked ? total + item.quantity : total;
      }, 0);
    });
    return {
      slides,
      currentSlideIndex,
      currentSlide,
      quickLinks,
      products,
      navItems,
      searchTerm,
      filteredProducts,
      newProducts,
      cartCount,
      goToSlide,
      handleBannerClick,
      handleSearch,
      navigateTo,
      addToCart
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.handleSearch && $setup.handleSearch(...args)),
    b: $setup.searchTerm,
    c: common_vendor.o(($event) => $setup.searchTerm = $event.detail.value),
    d: common_vendor.t($setup.cartCount),
    e: common_vendor.t($setup.currentSlide.title),
    f: common_vendor.t($setup.currentSlide.desc),
    g: common_vendor.o((...args) => $setup.handleBannerClick && $setup.handleBannerClick(...args)),
    h: $setup.currentSlide.bg,
    i: common_vendor.f($setup.slides, (slide, index, i0) => {
      return {
        a: index,
        b: $setup.currentSlideIndex === index ? 1 : "",
        c: $setup.currentSlideIndex !== index ? 1 : "",
        d: common_vendor.o(($event) => $setup.goToSlide(index), index)
      };
    }),
    j: common_vendor.f($setup.quickLinks, (quickLink, index, i0) => {
      return {
        a: common_vendor.n(quickLink.icon),
        b: common_vendor.n(quickLink.textColor),
        c: common_vendor.n(quickLink.bgColor),
        d: common_vendor.t(quickLink.label),
        e: index,
        f: common_vendor.o(($event) => $setup.navigateTo(quickLink.path), index)
      };
    }),
    k: common_vendor.f($setup.filteredProducts, (product, index, i0) => {
      return {
        a: product.image,
        b: product.name,
        c: common_vendor.t(product.name),
        d: common_vendor.t(product.description),
        e: common_vendor.t(product.price),
        f: common_vendor.o(($event) => $setup.addToCart(product), index),
        g: index,
        h: common_vendor.o(($event) => $setup.navigateTo("order"), index)
      };
    }),
    l: common_vendor.f($setup.newProducts, (newProduct, index, i0) => {
      return {
        a: newProduct.image,
        b: newProduct.name,
        c: common_vendor.t(newProduct.name),
        d: common_vendor.t(newProduct.description),
        e: common_vendor.t(newProduct.price),
        f: common_vendor.o(($event) => $setup.addToCart(newProduct), index),
        g: index,
        h: common_vendor.o(($event) => $setup.navigateTo("order"), index)
      };
    }),
    m: common_vendor.f($setup.navItems, (navItem, index, i0) => {
      return {
        a: common_vendor.n(navItem.icon),
        b: common_vendor.n({
          "text-primary": navItem.active,
          "text-gray-400": !navItem.active
        }),
        c: common_vendor.t(navItem.label),
        d: navItem.active ? 1 : "",
        e: !navItem.active ? 1 : "",
        f: index,
        g: common_vendor.o(($event) => $setup.navigateTo(navItem.path), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/views/index.js.map
