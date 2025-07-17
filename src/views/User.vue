<template>
  <div class="bg-gray-50 h-screen overflow-hidden flex flex-col">
    <!-- 顶部用户信息区域 -->
    <div class="bg-gradient-user text-white p-6 pb-12 relative">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold">个人中心</h1>
        <div 
          class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
          @click="navigateTo('settings')"
        >
          <i class="iconfont icon-setting text-white"></i>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <img 
          src="https://picsum.photos/id/64/200" 
          alt="用户头像" 
          class="w-16 h-16 rounded-full border-4 border-white/30"
        />
        <div>
          <h2 class="text-lg font-bold">{{ userInfo.name }}</h2>
          <div class="flex items-center mt-1">
            <span class="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              {{ userInfo.membership }}
            </span>
          </div>
          <p 
            class="text-white/80 text-sm cursor-pointer"
            @click="navigateTo('login')"
          >
            点击登录/注册
          </p>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex-1 overflow-y-auto -mt-8 px-4">
      <!-- 用户数据卡片 -->
      <div class="bg-white rounded-2xl shadow-card p-5 mb-5 card-hover">
        <div class="grid grid-cols-3 gap-2 text-center">
          <div>
            <p class="text-2xl font-bold text-primary">{{ userStats.orders }}</p>
            <p class="text-gray-500 text-sm">订单总数</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-primary">{{ userStats.coupons }}</p>
            <p class="text-gray-500 text-sm">优惠券</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-primary">{{ userStats.points }}</p>
            <p class="text-gray-500 text-sm">积分</p>
          </div>
        </div>
      </div>

      <!-- 功能菜单 -->
      <div class="bg-white rounded-2xl shadow-card mb-5">
        <div class="p-4 border-b border-gray-100">
          <h3 class="font-bold text-gray-800">我的订单</h3>
        </div>
        <div class="grid grid-cols-4 gap-2 p-4 text-center">
          <div 
            v-for="(orderTab, index) in orderTabs" 
            :key="index"
            class="card-hover"
            @click="navigateTo(orderTab.path)"
          >
            <div 
              class="w-10 h-10 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-2"
            >
              <i 
                class="iconfont" 
                :class="[orderTab.icon, 'text-primary']"
              ></i>
            </div>
            <p class="text-xs text-gray-600">{{ orderTab.label }}</p>
          </div>
        </div>
      </div>

      <!-- 其他功能 -->
      <div class="bg-white rounded-2xl shadow-card mb-5">
        <div class="p-4 border-b border-gray-100">
          <h3 class="font-bold text-gray-800">我的服务</h3>
        </div>
        <div class="divide-y divide-gray-100">
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="p-4 flex items-center justify-between card-hover cursor-pointer"
            @click="navigateTo(service.path)"
          >
            <div class="flex items-center space-x-3">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="service.bgColor"
              >
                <i 
                  class="iconfont" 
                  :class="[service.icon, service.textColor]"
                ></i>
              </div>
              <span>{{ service.label }}</span>
            </div>
            <i class="iconfont icon-arrow-right text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="border-t border-gray-200 bg-white py-2 px-6">
      <div class="flex justify-around">
        <div 
          v-for="(nav, index) in navItems" 
          :key="index"
          class="text-center"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    // 用户信息
    const userInfo = ref({
      name: '奶茶爱好者',
      membership: '银卡会员',
      avatar: 'https://picsum.photos/id/64/200'
    });
    
    // 用户统计数据
    const userStats = ref({
      orders: 0,
      coupons: 0,
      points: 0
    });
    
    // 订单选项卡
    const orderTabs = ref([
      { icon: 'icon-dingdan', label: '全部订单', path: 'orders' },
      { icon: 'icon-daiquhuo', label: '待取餐', path: 'pending-orders' },
      { icon: 'icon-shouhou', label: '售后', path: 'after-sales' }
    ]);
    
    // 服务列表
    const services = ref([
      { 
        icon: 'icon-youhuiquan', 
        label: '优惠券', 
        path: 'coupons',
        bgColor: 'bg-blue-50',
        textColor: 'text-accent'
      },
      { 
        icon: 'icon-jifen', 
        label: '积分商城', 
        path: 'points-mall',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-500'
      },
      { 
        icon: 'icon-kefu', 
        label: '联系客服', 
        path: 'customer-service',
        bgColor: 'bg-green-50',
        textColor: 'text-green-500'
      },
      { 
        icon: 'icon-help', 
        label: '帮助中心', 
        path: 'help',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-500'
      }
    ]);
    
    // 导航数据
    const navItems = ref([
      { icon: 'icon-shouye', label: '首页', path: 'home', active: false },
      { icon: 'icon-fenlei', label: '点单', path: 'order', active: false },
      { icon: 'icon-gouwuche', label: '购物车', path: 'cart', active: false },
      { icon: 'icon-wode', label: '我的', path: 'user', active: true }
    ]);
    
    // 导航方法
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
</script>

<style>
@layer utilities {
  .bg-gradient-user {
    background: linear-gradient(135deg, #1677FF 0%, #40A9FF 100%);
  }
  .card-hover {
    transition: all 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-5px);
  }
}
</style>