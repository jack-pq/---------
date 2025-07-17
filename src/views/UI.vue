<template>
  <div class="container mx-auto py-8">
    <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-center text-dark mb-8">
      吊毛奶茶点单小程序 - UI设计方案
    </h1>
    
    <div class="module-container">
      <!-- 用户模块 -->
      <div class="phone-frame w-[375px] h-[812px] relative">
        <div class="capsule-button"></div>
        <UserComponent />
      </div>

      <!-- 下单模块 -->
      <div class="phone-frame w-[375px] h-[812px] relative">
        <div class="capsule-button"></div>
        <OrderComponent />
      </div>

      <!-- 优惠券模块 -->
      <div class="phone-frame w-[375px] h-[812px] relative">
        <div class="capsule-button"></div>
        <CouponsComponent />
      </div>

      <!-- 点单列表模块 -->
      <div class="phone-frame w-[375px] h-[812px] relative">
        <div class="capsule-button"></div>
        <OrderListComponent />
      </div>

      <!-- 订单模块 -->
      <div class="phone-frame w-[375px] h-[812px] relative">
        <div class="capsule-button"></div>
        <OrdersComponent />
      </div>
    </div>
  </div>
</template>

<script>
import UserComponent from './User.vue';
import OrderComponent from './Order.vue';
import CouponsComponent from './Coupons.vue';
import OrderListComponent from './OrderList.vue';
import OrdersComponent from './Orders.vue';

export default {
  name: 'UI',
  components: {
    UserComponent,
    OrderComponent,
    CouponsComponent,
    OrderListComponent,
    OrdersComponent
  }
};
</script>

<style>
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
  .phone-frame {
    border: 16px solid #1A1A1A;
    border-radius: 40px;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
  }
  .phone-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 24px;
    background: #1A1A1A;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .capsule-button {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 56px;
    height: 32px;
    background: #1A1A1A;
    border-radius: 16px;
    z-index: 100;
  }
  .module-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
  }
}
</style>