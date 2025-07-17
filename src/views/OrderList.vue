<template>
  <div class="bg-gray-50 h-screen overflow-hidden flex flex-col">
    <!-- 顶部导航 -->
    <div class="bg-white p-4 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">购物车</h1>
        <button 
          class="text-gray-500 text-sm"
          @click="clearCart"
        >
          <i class="iconfont icon-delete mr-1"></i>清空购物车
        </button>
      </div>
    </div>

    <!-- 购物车商品列表 -->
    <div class="flex-1 overflow-y-auto scrollbar-hide">
      <!-- 商品列表 -->
      <div 
        v-if="cartItems.length > 0"
        class="bg-white divide-y divide-gray-100"
      >
        <!-- 商品项 -->
        <div 
          v-for="(item, index) in cartItems" 
          :key="index"
          class="p-4 flex product-item group"
        >
          <!-- 选择框 -->
          <div 
            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-3 flex-shrink-0 cursor-pointer hover:border-primary transition-colors"
            :class="{ 'bg-primary': item.checked }"
            @click="toggleItemChecked(index)"
          >
            <i 
              class="iconfont icon-check"
              :class="{ 'text-white': item.checked, 'text-gray-300': !item.checked }"
            ></i>
          </div>
          
          <!-- 商品图片 -->
          <img 
            :src="item.image" 
            :alt="item.name" 
            class="w-16 h-16 object-cover rounded-lg mr-3 flex-shrink-0"
          />
          
          <!-- 商品信息 -->
          <div class="flex-1">
            <div class="flex justify-between">
              <h3 class="font-bold text-gray-800">{{ item.name }}</h3>
              <span class="text-primary font-bold">¥{{ item.price }}</span>
            </div>
            
            <p class="text-gray-500 text-xs mb-2">{{ item.description }}</p>
            
            <div class="flex justify-between items-center">
              <!-- 数量控制 -->
              <div class="flex items-center border border-gray-200 rounded-full w-24 hover:border-primary transition-colors">
                <button 
                  class="w-8 h-8 flex items-center justify-center text-gray-500"
                  @click="decreaseQuantity(index)"
                >
                  <i class="iconfont icon-jian"></i>
                </button>
                <span class="w-8 text-center text-sm">{{ item.quantity }}</span>
                <button 
                  class="w-8 h-8 flex items-center justify-center text-gray-500"
                  @click="increaseQuantity(index)"
                >
                  <i class="iconfont icon-jia"></i>
                </button>
              </div>
              
              <!-- 删除按钮 -->
              <button 
                class="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                @click="removeItem(index)"
              >
                <i class="iconfont icon-shanchu"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空购物车状态 -->
      <div 
        v-else
        class="items-center justify-center flex-col h-full py-10 flex"
      >
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="iconfont icon-gouwuchekong text-gray-300 text-3xl"></i>
        </div>
        <p class="text-gray-500 mb-4">购物车是空的</p>
        <button 
          class="bg-primary text-white px-4 py-2 rounded-full text-sm"
          @click="navigateTo('order')"
        >
          去点单
        </button>
      </div>
    </div>

    <!-- 结算栏 -->
    <div 
      v-if="cartItems.length > 0"
      class="border-t border-gray-200 bg-white py-3 px-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div 
            class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-2 cursor-pointer"
            :class="{ 'bg-primary': isAllSelected }"
            @click="toggleSelectAll"
          >
            <i 
              class="iconfont icon-check"
              :class="{ 'text-white': isAllSelected, 'text-gray-300': !isAllSelected }"
            ></i>
          </div>
          <span class="text-sm text-gray-600">全选 ({{ selectedCount }})</span>
        </div>
        
        <div class="text-right mr-4">
          <p class="text-sm text-gray-500">合计: <span class="text-primary font-bold text-lg">¥{{ totalPrice.toFixed(2) }}</span></p>
          <p class="text-xs text-gray-400">不含配送费</p>
        </div>
        
        <button 
          class="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap shadow-md hover:shadow-lg"
          @click="checkout"
        >
          去结算
        </button>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="border-t border-gray-100 bg-white py-2 px-6">
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
    
    // 购物车数据
    const cartItems = ref([
      {
        id: '1',
        name: '芋圆奶茶',
        price: 18,
        description: '中杯 · 七分糖 · 去冰',
        quantity: 1,
        checked: true,
        image: 'https://picsum.photos/id/431/100/100'
      },
      {
        id: '2',
        name: '珍珠奶茶',
        price: 16,
        description: '大杯 · 五分糖 · 少冰',
        quantity: 1,
        checked: true,
        image: 'https://picsum.photos/id/292/100/100'
      },
      {
        id: '3',
        name: '草莓奶盖',
        price: 22,
        description: '中杯 · 三分糖 · 去冰',
        quantity: 1,
        checked: true,
        image: 'https://picsum.photos/id/1080/100/100'
      }
    ]);
    
    // 导航数据
    const navItems = ref([
      { icon: 'icon-shouye', label: '首页', path: 'home', active: false },
      { icon: 'icon-fenlei', label: '点单', path: 'order', active: false },
      { icon: 'icon-gouwuche', label: '购物车', path: 'cart', active: true },
      { icon: 'icon-wode', label: '我的', path: 'user', active: false }
    ]);
    
    // 计算属性
    const selectedCount = computed(() => {
      return cartItems.value.filter(item => item.checked).length;
    });
    
    const totalPrice = computed(() => {
      return cartItems.value
        .filter(item => item.checked)
        .reduce((total, item) => total + (item.price * item.quantity), 0);
    });
    
    const isAllSelected = computed(() => {
      return cartItems.value.length > 0 && 
             cartItems.value.every(item => item.checked);
    });
    
    // 方法
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
      cartItems.value.forEach(item => {
        item.checked = shouldSelectAll;
      });
      saveCartData();
    };
    
    const removeItem = (index) => {
      if (confirm('确定要删除该商品吗？')) {
        cartItems.value.splice(index, 1);
        saveCartData();
      }
    };
    
    const clearCart = () => {
      if (confirm('确定要清空购物车吗？')) {
        cartItems.value = [];
        saveCartData();
      }
    };
    
    const checkout = () => {
      if (selectedCount.value === 0) {
        alert('请选择要结算的商品');
        return;
      }
      router.push('/orders');
    };
    
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    
    // 保存购物车数据到localStorage
    const saveCartData = () => {
      localStorage.setItem('milkTeaCart', JSON.stringify(cartItems.value));
    };
    
    // 从localStorage加载购物车数据
    const loadCartData = () => {
      const savedCart = localStorage.getItem('milkTeaCart');
      if (savedCart) {
        cartItems.value = JSON.parse(savedCart);
      }
    };
    
    // 初始化时加载购物车数据
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
  .product-item {
    transition: all 0.2s ease;
  }
  .product-item:hover {
    background-color: #FFF7F0;
  }
}
</style>