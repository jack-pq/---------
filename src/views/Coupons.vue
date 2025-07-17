<template>
  <div class="bg-gray-50 h-screen overflow-hidden flex flex-col">
    <!-- 顶部导航 -->
    <div class="bg-white p-4 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">我的优惠券</h1>
        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <i class="iconfont icon-help text-gray-500"></i>
        </div>
      </div>
    </div>

    <!-- 选项卡 -->
    <div class="bg-white border-b border-gray-100">
      <div class="flex">
        <div 
          class="flex-1 py-3 text-center font-medium coupon-tab" 
          :class="{ 'text-primary border-b-2 border-primary': activeTab === 'available', 'text-gray-500': activeTab !== 'available' }"
          @click="switchTab('available')"
        >
          可用优惠券 ({{ availableCoupons.length }})
        </div>
        <div 
          class="flex-1 py-3 text-center font-medium coupon-tab" 
          :class="{ 'text-primary border-b-2 border-primary': activeTab === 'expired', 'text-gray-500': activeTab !== 'expired' }"
          @click="switchTab('expired')"
        >
          已过期 ({{ expiredCoupons.length }})
        </div>
      </div>
    </div>

    <!-- 优惠券列表 -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- 可用优惠券 -->
      <div v-if="activeTab === 'available'">
        <div 
          v-for="(coupon, index) in availableCoupons" 
          :key="index"
          class="bg-white rounded-xl shadow-card overflow-hidden coupon-corner hover:shadow-md transition-shadow duration-300"
        >
          <div class="flex">
            <div 
              class="w-2/5 text-white p-5 flex flex-col justify-center items-center"
              :class="coupon.bgClass"
            >
              <p class="text-sm opacity-90">{{ coupon.typeText }}</p>
              <p class="text-3xl font-bold">{{ coupon.valueDisplay }}</p>
              <p class="text-xs opacity-90 mt-1">{{ coupon.unit }}</p>
            </div>
            <div class="w-3/5 p-4">
              <h3 class="font-bold text-gray-800 mb-1">{{ coupon.name }}</h3>
              <p class="text-gray-500 text-xs mb-3">有效期至：{{ coupon.expiryDate }}</p>
              <p class="text-gray-500 text-xs mb-4">{{ coupon.description }}</p>
              <button 
                class="w-full py-2 border border-primary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                @click="useCoupon(coupon)"
              >
                立即使用
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 过期优惠券 -->
      <div v-if="activeTab === 'expired'">
        <div 
          v-for="(coupon, index) in expiredCoupons" 
          :key="index"
          class="bg-white rounded-xl shadow-card overflow-hidden coupon-corner opacity-60"
        >
          <div class="flex">
            <div class="w-2/5 bg-gradient-gray-1 text-white p-5 flex flex-col justify-center items-center">
              <p class="text-sm opacity-90">{{ coupon.typeText }}</p>
              <p class="text-3xl font-bold">{{ coupon.valueDisplay }}</p>
              <p class="text-xs opacity-90 mt-1">{{ coupon.unit }}</p>
            </div>
            <div class="w-3/5 p-4">
              <h3 class="font-bold text-gray-800 mb-1">{{ coupon.name }}</h3>
              <p class="text-gray-500 text-xs mb-3">已过期：{{ coupon.expiryDate }}</p>
              <p class="text-gray-500 text-xs mb-4">{{ coupon.description }}</p>
              <button class="w-full py-2 border border-gray-300 text-gray-400 rounded-full text-sm font-medium cursor-not-allowed">
                已过期
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 优惠券使用说明 -->
      <div class="bg-white rounded-xl p-4 text-sm text-gray-500">
        <p class="mb-2"><i class="iconfont icon-info-circle text-primary mr-1"></i> 优惠券使用说明</p>
        <ul class="list-disc list-inside space-y-1 text-xs">
          <li>每张订单限用一张优惠券，不可叠加使用</li>
          <li>优惠券不可兑换现金，不设找零</li>
          <li>过期优惠券将自动失效，请及时使用</li>
          <li>如有疑问，请联系客服咨询</li>
        </ul>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="border-t border-gray-200 bg-white py-2 px-6">
      <div class="flex justify-around">
        <div 
          class="text-center" 
          v-for="(nav, index) in navItems" 
          :key="index"
          @click="navigateTo(nav.path)"
        >
          <i 
            class="iconfont text-xl" 
            :class="[nav.icon, nav.active ? 'text-primary' : 'text-gray-400']"
          ></i>
          <p 
            class="text-xs mt-1" 
            :class="{ 'text-primary': nav.active, 'text-gray-400': !nav.active }"
          >
            {{ nav.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    // 选项卡状态
    const activeTab = ref('available');
    
    // 优惠券数据
    const coupons = ref([
      {
        id: '1',
        type: 'money',
        typeText: '满30减',
        value: 10,
        valueDisplay: '10',
        unit: '元',
        name: '满30元减10元优惠券',
        expiryDate: '2023-12-31',
        description: '全场饮品通用，不可叠加使用',
        minAmount: 30,
        bgClass: 'bg-gradient-coupon-1',
        status: 'available'
      },
      {
        id: '2',
        type: 'discount',
        typeText: 'discount',
        value: 8.5,
        valueDisplay: '8.5',
        unit: '折',
        name: '全场8.5折优惠券',
        expiryDate: '2023-11-15',
        description: '限奶茶系列使用，单笔最高减15元',
        minAmount: 0,
        bgClass: 'bg-gradient-coupon-2',
        status: 'available'
      },
      {
        id: '3',
        type: 'free',
        typeText: '免费',
        value: '中杯奶茶',
        valueDisplay: '中杯奶茶',
        unit: '兑换券',
        name: '免费中杯奶茶兑换券',
        expiryDate: '2023-10-30',
        description: '限指定饮品使用，需任意消费',
        minAmount: 0,
        bgClass: 'bg-gradient-coupon-3',
        status: 'available'
      },
      {
        id: '4',
        type: 'money',
        typeText: '满20减',
        value: 5,
        valueDisplay: '5',
        unit: '元',
        name: '满20元减5元优惠券',
        expiryDate: '2023-09-30',
        description: '全场饮品通用，不可叠加使用',
        minAmount: 20,
        bgClass: 'bg-gradient-gray-1',
        status: 'expired'
      }
    ]);
    
    // 导航数据
    const navItems = ref([
      { icon: 'icon-shouye', label: '首页', path: 'home', active: false },
      { icon: 'icon-fenlei', label: '点单', path: 'order', active: false },
      { icon: 'icon-gouwuche', label: '购物车', path: 'cart', active: false },
      { icon: 'icon-wode', label: '我的', path: 'user', active: true }
    ]);
    
    // 计算属性
    const availableCoupons = computed(() => {
      return coupons.value.filter(coupon => coupon.status === 'available');
    });
    
    const expiredCoupons = computed(() => {
      return coupons.value.filter(coupon => coupon.status === 'expired');
    });
    
    // 方法
    const switchTab = (tab) => {
      activeTab.value = tab;
    };
    
    const useCoupon = (coupon) => {
      // 存储选中的优惠券信息
      localStorage.setItem('selectedCoupon', JSON.stringify({
        id: coupon.id,
        type: coupon.type,
        value: coupon.value,
        minAmount: coupon.minAmount
      }));
      
      // 跳转到订单页面
      router.push('/order');
      
      // 显示使用提示
      alert(`已选择${coupon.type === 'money' ? '满' + coupon.minAmount + '减' + coupon.value : 
            coupon.type === 'discount' ? coupon.value + '折' : coupon.value}优惠券`);
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
</script>

<style>
@layer utilities {
  .bg-gradient-gray-1 {
    background: linear-gradient(135deg, #CCCCCC 0%, #999999 100%);
  }
  .bg-gradient-coupon-1 {
    background: linear-gradient(135deg, #1677FF 0%, #40A9FF 100%);
  }
  .bg-gradient-coupon-2 {
    background: linear-gradient(135deg, #0958D9 0%, #1890FF 100%);
  }
  .bg-gradient-coupon-3 {
    background: linear-gradient(135deg, #0047AB 0%, #0066CC 100%);
  }
  .coupon-corner {
    position: relative;
  }
  .coupon-corner::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background: #F3F4F6;
    border-radius: 50%;
  }
  .coupon-dash {
    background-image: linear-gradient(to right, #fff 50%, transparent 50%);
    background-position: bottom;
    background-size: 12px 1px;
    background-repeat: repeat-x;
  }
}
</style>