"use strict";
const common_vendor = require("../../common/vendor.js");
const UserComponent = () => "./User.js";
const OrderComponent = () => "./Order.js";
const CouponsComponent = () => "./Coupons.js";
const OrderListComponent = () => "./OrderList.js";
const OrdersComponent = () => "./Orders.js";
const _sfc_main = {
  name: "UI",
  components: {
    UserComponent,
    OrderComponent,
    CouponsComponent,
    OrderListComponent,
    OrdersComponent
  }
};
if (!Array) {
  const _component_UserComponent = common_vendor.resolveComponent("UserComponent");
  const _component_OrderComponent = common_vendor.resolveComponent("OrderComponent");
  const _component_CouponsComponent = common_vendor.resolveComponent("CouponsComponent");
  const _component_OrderListComponent = common_vendor.resolveComponent("OrderListComponent");
  const _component_OrdersComponent = common_vendor.resolveComponent("OrdersComponent");
  (_component_UserComponent + _component_OrderComponent + _component_CouponsComponent + _component_OrderListComponent + _component_OrdersComponent)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/src/views/UI.js.map
