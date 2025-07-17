"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const router = common_vendor.useRouter();
    const searchTerm = common_vendor.ref("");
    const faqs = common_vendor.ref([
      {
        question: "如何修改订单信息？",
        answer: '订单提交后30分钟内可在"待付款"页面修改订单信息。超过30分钟或订单已支付，暂不支持修改，请联系客服处理。',
        active: false
      },
      {
        question: "优惠券如何使用？",
        answer: '在结算页面，点击"优惠券"选项，选择可用的优惠券即可抵扣相应金额。每张订单限用一张优惠券，不可叠加使用。',
        active: false
      },
      {
        question: "如何申请退款？",
        answer: '未取餐的订单可在"待取餐"页面申请退款，退款将在1-3个工作日内原路返回。已取餐的订单暂不支持退款，请联系客服处理。',
        active: false
      }
    ]);
    const orderSteps = common_vendor.ref([
      {
        title: "选择商品",
        description: "在点单页面选择您喜欢的商品，可自定义甜度、冰度等选项。"
      },
      {
        title: "确认订单",
        description: '在购物车页面确认商品信息，选择优惠券，点击"去结算"。'
      },
      {
        title: "支付订单",
        description: "选择支付方式，完成支付后等待取餐通知。"
      },
      {
        title: "到店取餐",
        description: "凭取餐码到店取餐，或等待配送上门（如有配送服务）。"
      }
    ]);
    const contacts = common_vendor.ref([
      {
        icon: "icon-kefu",
        text: "在线客服",
        bgColor: "bg-blue-50",
        textColor: "text-blue-500"
      },
      {
        icon: "icon-phone",
        text: "400-123-4567",
        bgColor: "bg-green-50",
        textColor: "text-green-500"
      },
      {
        icon: "icon-email",
        text: "service@diaomaon奶茶.com",
        bgColor: "bg-purple-50",
        textColor: "text-purple-500"
      }
    ]);
    const navItems = common_vendor.ref([
      { icon: "icon-shouye", label: "首页", path: "home", active: false },
      { icon: "icon-fenlei", label: "点单", path: "order", active: false },
      { icon: "icon-gouwuche", label: "购物车", path: "cart", active: false },
      { icon: "icon-wode", label: "我的", path: "user", active: true }
    ]);
    const filteredFaqs = common_vendor.computed(() => {
      if (!searchTerm.value) {
        return faqs.value;
      }
      const term = searchTerm.value.toLowerCase();
      return faqs.value.filter(
        (faq) => faq.question.toLowerCase().includes(term) || faq.answer.toLowerCase().includes(term)
      );
    });
    const toggleFaq = (index) => {
      faqs.value[index].active = !faqs.value[index].active;
    };
    const handleSearch = () => {
    };
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    return {
      searchTerm,
      faqs,
      orderSteps,
      contacts,
      navItems,
      filteredFaqs,
      toggleFaq,
      handleSearch,
      navigateTo
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $setup.navigateTo("user")),
    b: common_vendor.o([($event) => $setup.searchTerm = $event.detail.value, (...args) => $setup.handleSearch && $setup.handleSearch(...args)]),
    c: $setup.searchTerm,
    d: common_vendor.f($setup.filteredFaqs, (faq, index, i0) => {
      return {
        a: common_vendor.t(faq.question),
        b: faq.active ? 1 : "",
        c: common_vendor.t(faq.answer),
        d: faq.active ? "500px" : "0",
        e: faq.active ? 1 : 0,
        f: faq.active ? "1rem" : "0",
        g: index,
        h: faq.active ? 1 : "",
        i: common_vendor.o(($event) => $setup.toggleFaq(index), index)
      };
    }),
    e: common_vendor.f($setup.orderSteps, (step, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(step.title),
        c: common_vendor.t(step.description),
        d: index
      };
    }),
    f: common_vendor.f($setup.contacts, (contact, index, i0) => {
      return {
        a: common_vendor.n(contact.icon),
        b: common_vendor.n(contact.textColor),
        c: common_vendor.n(contact.bgColor),
        d: common_vendor.t(contact.text),
        e: index
      };
    }),
    g: common_vendor.f($setup.navItems, (nav, index, i0) => {
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/views/Help.js.map
