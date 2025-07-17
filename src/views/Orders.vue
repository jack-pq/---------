<template>
  <div class="bg-gray-50 h-screen overflow-hidden flex flex-col">
    <!-- 顶部导航 -->
    <div class="bg-white p-4 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">我的订单</h1>
        <div 
          class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
          @click="navigateTo('search')"
        >
          <i class="iconfont icon-sousuo text-gray-500"></i>
        </div>
      </div>
    </div>

    <!-- 订单状态筛选 -->
    <div class="bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide">
      <div class="flex space-x-6 px-4 min-w-max">
        <div 
          v-for="(tab, index) in orderTabs" 
          :key="index"
          class="pb-3 transition-colors cursor-pointer"
          :class="{
            'text-primary border-b-2 border-primary font-medium': activeTab === tab.id,
            'text-gray-500 hover:text-primary': activeTab !== tab.id
          }"
          @click="switchTab(tab.id)"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- 订单卡片 -->
      <div 
        v-for="(order, index) in filteredOrders" 
        :key="index"
        class="bg-white rounded-xl shadow-card overflow-hidden order-card"
      >
        <div class="p-4 border-b border-gray-100">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold text-gray-800">{{ order.store }}</h3>
            <span 
              class="text-sm font-medium"
              :class="{
                'text-primary': order.status === 'pending',
                'text-green-500': order.status === 'completed',
                'text-gray-500': order.status === 'canceled'
              }"
            >
              {{ orderStatusText[order.status] }}
            </span>
          </div>
          <p class="text-gray-500 text-xs">订单编号: {{ order.id }} | {{ order.date }}</p>
        </div>
        
        <div class="p-4">
          <!-- 订单商品 -->
          <div 
            v-for="(item, itemIndex) in order.items" 
            :key="itemIndex"
            class="flex items-center mb-3"
          >
            <img 
              :src="item.image" 
              :alt="item.name" 
              class="w-12 h-12 object-cover rounded mr-3"
            />
            <div class="flex-1">
              <h4 class="font-medium text-gray-800 text-sm">{{ item.name }}</h4>
              <p class="text-gray-500 text-xs">{{ item.description }}</p>
            </div>
            <span class="text-gray-800 font-medium">x{{ item.quantity }}</span>
          </div>
          
          <!-- 订单操作 -->
          <div class="flex justify-between items-center pt-3 border-t border-gray-100">
            <p class="text-gray-800 font-bold">总计: ¥{{ order.total }}</p>
            <div class="flex space-x-2">
              <button 
                v-if="order.status === 'pending'"
                class="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                @click="cancelOrder(order.id)"
              >
                取消订单
              </button>
              <button 
                v-if="order.status === 'pending'"
                class="px-3 py-1 bg-primary text-white rounded-full text-sm hover:bg-primary/90 transition-colors"
                @click="showPickupCode(order.id)"
              >
                取餐码
              </button>
              <button 
                v-if="order.status === 'completed' || order.status === 'canceled'"
                class="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                @click="reorder(order)"
              >
                再来一单
              </button>
              <button 
                v-if="order.status === 'completed'"
                class="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                @click="viewOrderDetails(order.id)"
              >
                查看详情
              </button>
            </div>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    // 订单状态文本
    const orderStatusText = {
      pending: '待取餐',
      completed: '已完成',
      canceled: '已取消'
    };
    
    // 订单选项卡
    const orderTabs = ref([
      { id: 'all', label: '全部订单' },
      { id: 'pending', label: '待付款' },
      { id: 'pickup', label: '待取餐' },
      { id: 'completed', label: '已完成' },
      { id: 'canceled', label: '已取消' }
    ]);
    
    // 当前激活的选项卡
    const activeTab = ref('all');
    
    // 订单数据
    const orders = ref([
      {
        id: '2023101500123',
        store: '吊毛奶茶(科技园店)',
        status: 'pending',
        date: '2023-10-15 14:30',
        total: 34,
        items: [
          {
            name: '芋圆奶茶',
            description: '中杯 · 七分糖 · 去冰',
            quantity: 1,
            price: 18,
            image: 'https://picsum.photos/id/431/80/80'
          },
          {
            name: '珍珠奶茶',
            description: '大杯 · 五分糖 · 少冰',
            quantity: 1,
            price: 16,
            image: 'https://picsum.photos/id/292/80/80'
          }
        ]
      },
      {
        id: '2023101400089',
        store: '吊毛奶茶(大学城店)',
        status: 'completed',
        date: '2023-10-14 10:15',
        total: 22,
        items: [
          {
            name: '草莓奶盖',
            description: '中杯 · 三分糖 · 去冰',
            quantity: 1,
            price: 22,
            image: 'https://picsum.photos/id/1080/80/80'
          }
        ]
      },
      {
        id: '2023101300056',
        store: '吊毛奶茶(科技园店)',
        status: 'canceled',
        date: '2023-10-13 16:45',
        total: 20,
        items: [
          {
            name: '抹茶奶茶',
            description: '中杯 · 五分糖 · 少冰',
            quantity: 1,
            price: 20,
            image: 'https://picsum.photos/id/312/80/80'
          }
        ]
      }
    ]);
    
    // 导航数据
    const navItems = ref([
      { icon: 'icon-shouye', label: '首页', path: 'home', active: false },
      { icon: 'icon-fenlei', label: '点单', path: 'order', active: false },
      { icon: 'icon-gouwuche', label: '购物车', path: 'cart', active: false },
      { icon: 'icon-wode', label: '我的', path: 'user', active: true }
    ]);
    
    // 计算属性：过滤后的订单
    const filteredOrders = computed(() => {
      if (activeTab.value === 'all') {
        return orders.value;
      }
      return orders.value.filter(order => order.status === activeTab.value);
    });
    
    // 方法
    const switchTab = (tabId) => {
      activeTab.value = tabId;
    };
    
    const cancelOrder = (orderId) => {
      if (confirm('确定要取消该订单吗？')) {
        const order = orders.value.find(o => o.id === orderId);
        if (order) {
          order.status = 'canceled';
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
</script>

<style>
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .order-card {
    transition: all 0.2s ease;
  }
  .order-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  }
}
</style>