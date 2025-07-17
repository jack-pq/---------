"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const router = common_vendor.useRouter();
    const cartCount = common_vendor.ref(3);
    const totalPrice = common_vendor.ref(56);
    const activeCategory = common_vendor.ref("all");
    const categories = common_vendor.ref([
      { id: "all", name: "全部" },
      { id: "milk-tea", name: "奶茶" },
      { id: "fruit-tea", name: "果茶" },
      { id: "coffee", name: "咖啡" },
      { id: "yogurt", name: "酸奶" },
      { id: "dessert", name: "甜点" },
      { id: "snacks", name: "小食" }
    ]);
    const recommendedProducts = common_vendor.ref([
      {
        id: "1",
        name: "珍珠奶茶",
        price: 16,
        description: "经典奶茶 · Q弹珍珠",
        image: "https://picsum.photos/id/292/300/200",
        tag: "热销",
        category: "recommend"
      },
      {
        id: "2",
        name: "草莓奶盖",
        price: 22,
        description: "新鲜草莓 · 芝士奶盖",
        image: "https://picsum.photos/id/1080/300/200",
        category: "recommend"
      }
    ]);
    const categoryProducts = common_vendor.ref([
      {
        id: "milk-tea",
        name: "奶茶",
        products: [
          {
            id: "3",
            name: "芋圆奶茶",
            price: 18,
            description: "香芋风味 · 软糯芋圆",
            image: "https://picsum.photos/id/431/120/120"
          },
          {
            id: "4",
            name: "抹茶奶茶",
            price: 20,
            description: "日式抹茶 · 鲜奶调制",
            image: "https://picsum.photos/id/312/120/120"
          },
          {
            id: "5",
            name: "巧克力奶茶",
            price: 19,
            description: "浓郁可可 · 丝滑口感",
            image: "https://picsum.photos/id/225/120/120"
          }
        ]
      },
      {
        id: "fruit-tea",
        name: "果茶",
        products: [
          {
            id: "6",
            name: "百香果茶",
            price: 17,
            description: "酸甜可口 · 富含维C",
            image: "https://picsum.photos/id/1060/120/120"
          },
          {
            id: "7",
            name: "芒果冰沙",
            price: 21,
            description: "新鲜芒果 · 清凉解暑",
            image: "https://picsum.photos/id/1080/120/120"
          }
        ]
      }
    ]);
    const navItems = common_vendor.ref([
      { icon: "icon-shouye", label: "首页", path: "home", active: false },
      { icon: "icon-fenlei", label: "点单", path: "order", active: true },
      { icon: "icon-gouwuche", label: "购物车", path: "cart", active: false },
      { icon: "icon-wode", label: "我的", path: "user", active: false }
    ]);
    const filteredCategories = common_vendor.computed(() => {
      if (activeCategory.value === "all") {
        return categoryProducts.value;
      }
      return categoryProducts.value.filter(
        (category) => category.id === activeCategory.value
      );
    });
    const switchCategory = (categoryId) => {
      activeCategory.value = categoryId;
    };
    const addToCart = (product) => {
      cartCount.value++;
      totalPrice.value += product.price;
      alert(`已将 ${product.name} 添加到购物车`);
    };
    const checkout = () => {
      router.push("/checkout");
    };
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    return {
      cartCount,
      totalPrice,
      activeCategory,
      categories,
      recommendedProducts,
      categoryProducts,
      navItems,
      filteredCategories,
      switchCategory,
      addToCart,
      checkout,
      navigateTo
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $setup.navigateTo("search")),
    b: $setup.cartCount > 0
  }, $setup.cartCount > 0 ? {
    c: common_vendor.t($setup.cartCount)
  } : {}, {
    d: common_vendor.o(($event) => $setup.navigateTo("cart")),
    e: common_vendor.f($setup.categories, (category, index, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: index,
        c: $setup.activeCategory === category.id ? 1 : "",
        d: $setup.activeCategory !== category.id ? 1 : "",
        e: common_vendor.o(($event) => $setup.switchCategory(category.id), index)
      };
    }),
    f: $setup.activeCategory === "all" || $setup.activeCategory === "recommend"
  }, $setup.activeCategory === "all" || $setup.activeCategory === "recommend" ? {
    g: common_vendor.f($setup.recommendedProducts, (product, index, i0) => {
      return common_vendor.e({
        a: product.image,
        b: product.name,
        c: product.tag
      }, product.tag ? {
        d: common_vendor.t(product.tag)
      } : {}, {
        e: common_vendor.t(product.name),
        f: common_vendor.t(product.description),
        g: common_vendor.t(product.price),
        h: common_vendor.o(($event) => $setup.addToCart(product), index),
        i: index
      });
    })
  } : {}, {
    h: common_vendor.f($setup.filteredCategories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: common_vendor.f(category.products, (product, index, i1) => {
          return {
            a: product.image,
            b: product.name,
            c: common_vendor.t(product.name),
            d: common_vendor.t(product.description),
            e: common_vendor.t(product.price),
            f: common_vendor.o(($event) => $setup.addToCart(product), index),
            g: index
          };
        }),
        c: category.id
      };
    }),
    i: $setup.cartCount > 0
  }, $setup.cartCount > 0 ? {
    j: common_vendor.t($setup.cartCount),
    k: common_vendor.o(($event) => $setup.navigateTo("cart")),
    l: common_vendor.t($setup.cartCount),
    m: common_vendor.t($setup.totalPrice.toFixed(2)),
    n: common_vendor.o((...args) => $setup.checkout && $setup.checkout(...args))
  } : {}, {
    o: common_vendor.f($setup.navItems, (nav, index, i0) => {
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/views/Order.js.map
