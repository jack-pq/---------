<template>
  <div class="bg-gray-50 h-screen overflow-hidden flex flex-col">
    <!-- 顶部导航 -->
    <div class="bg-gradient-order text-white p-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold">点单</h1>
        <div class="flex items-center space-x-3">
          <div 
            class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
            @click="navigateTo('search')"
          >
            <i class="iconfont icon-sousuo text-white"></i>
          </div>
          <div 
            class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative cursor-pointer"
            @click="navigateTo('cart')"
          >
            <i class="iconfont icon-gouwuche text-white"></i>
            <span 
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类导航 -->
    <div class="bg-white py-3 overflow-x-auto scrollbar-hide">
      <div class="flex space-x-6 px-4 min-w-max">
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="category-item pb-1 transition-colors cursor-pointer"
          :class="{
            'text-primary border-b-2 border-primary font-medium': activeCategory === category.id,
            'text-gray-500 hover:text-primary': activeCategory !== category.id
          }"
          @click="switchCategory(category.id)"
        >
          {{ category.name }}
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="flex-1 overflow-y-auto p-4">
      <!-- 推荐商品 -->
      <div 
        v-if="activeCategory === 'all' || activeCategory === 'recommend'"
        class="mb-6"
      >
        <h2 class="text-lg font-bold text-gray-800 mb-4">店长推荐</h2>
        <div class="grid grid-cols-2 gap-4">
          <!-- 商品卡片 -->
          <div 
            v-for="(product, index) in recommendedProducts" 
            :key="index"
            class="bg-white rounded-xl shadow-card overflow-hidden product-card"
          >
            <div class="relative">
              <img :src="product.image" :alt="product.name" class="w-full h-36 object-cover">
              <div 
                v-if="product.tag"
                class="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full"
              >
                {{ product.tag }}
              </div>
            </div>
            <div class="p-3">
              <h3 class="font-bold text-gray-800 mb-1">{{ product.name }}</h3>
              <p class="text-gray-500 text-xs mb-2">{{ product.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-primary font-bold">¥{{ product.price }}</span>
                <div 
                  class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer"
                  @click.stop="addToCart(product)"
                >
                  <i class="iconfont icon-jia"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他分类商品 -->
      <div 
        v-for="category in filteredCategories" 
        :key="category.id"
        class="mb-6"
      >
        <h2 class="text-lg font-bold text-gray-800 mb-4">{{ category.name }}系列</h2>
        <div class="space-y-3">
          <!-- 商品条目 -->
          <div 
            v-for="(product, index) in category.products" 
            :key="index"
            class="bg-white rounded-xl shadow-card overflow-hidden flex product-card"
          >
            <img :src="product.image" :alt="product.name" class="w-20 h-20 object-cover">
            <div class="flex-1 p-3 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-gray-800">{{ product.name }}</h3>
                <p class="text-gray-500 text-xs">{{ product.description }}</p>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-primary font-bold">¥{{ product.price }}</span>
                <div 
                  class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer"
                  @click.stop="addToCart(product)"
                >
                  <i class="iconfont icon-jia"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车栏 -->
    <div 
      v-if="cartCount > 0"
      class="border-t border-gray-200 bg-white py-3 px-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div 
            class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3 relative cursor-pointer"
            @click="navigateTo('cart')"
          >
            <i class="iconfont icon-gouwuche"></i>
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {{ cartCount }}
            </span>
          </div>
          <div>
            <p class="text-sm text-gray-500">共{{ cartCount }}件商品</p>
            <p class="text-primary font-bold">¥{{ totalPrice.toFixed(2) }}</p>
          </div>
        </div>
        <button 
          class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition-colors"
          @click="checkout"
        >
          去结算
        </button>
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
    
    // 购物车数据
    const cartCount = ref(3);
    const totalPrice = ref(56);
    
    // 分类数据
    const activeCategory = ref('all');
    
    const categories = ref([
      { id: 'all', name: '全部' },
      { id: 'milk-tea', name: '奶茶' },
      { id: 'fruit-tea', name: '果茶' },
      { id: 'coffee', name: '咖啡' },
      { id: 'yogurt', name: '酸奶' },
      { id: 'dessert', name: '甜点' },
      { id: 'snacks', name: '小食' }
    ]);
    
    // 推荐商品
    const recommendedProducts = ref([
      {
        id: '1',
        name: '珍珠奶茶',
        price: 16,
        description: '经典奶茶 · Q弹珍珠',
        image: 'https://picsum.photos/id/292/300/200',
        tag: '热销',
        category: 'recommend'
      },
      {
        id: '2',
        name: '草莓奶盖',
        price: 22,
        description: '新鲜草莓 · 芝士奶盖',
        image: 'https://picsum.photos/id/1080/300/200',
        category: 'recommend'
      }
    ]);
    
    // 其他分类商品
    const categoryProducts = ref([
      {
        id: 'milk-tea',
        name: '奶茶',
        products: [
          {
            id: '3',
            name: '芋圆奶茶',
            price: 18,
            description: '香芋风味 · 软糯芋圆',
            image: 'https://picsum.photos/id/431/120/120'
          },
          {
            id: '4',
            name: '抹茶奶茶',
            price: 20,
            description: '日式抹茶 · 鲜奶调制',
            image: 'https://picsum.photos/id/312/120/120'
          },
          {
            id: '5',
            name: '巧克力奶茶',
            price: 19,
            description: '浓郁可可 · 丝滑口感',
            image: 'https://picsum.photos/id/225/120/120'
          }
        ]
      },
      {
        id: 'fruit-tea',
        name: '果茶',
        products: [
          {
            id: '6',
            name: '百香果茶',
            price: 17,
            description: '酸甜可口 · 富含维C',
            image: 'https://picsum.photos/id/1060/120/120'
          },
          {
            id: '7',
            name: '芒果冰沙',
            price: 21,
            description: '新鲜芒果 · 清凉解暑',
            image: 'https://picsum.photos/id/1080/120/120'
          }
        ]
      }
    ]);
    
    // 导航数据
    const navItems = ref([
      { icon: 'icon-shouye', label: '首页', path: 'home', active: false },
      { icon: 'icon-fenlei', label: '点单', path: 'order', active: true },
      { icon: 'icon-gouwuche', label: '购物车', path: 'cart', active: false },
      { icon: 'icon-wode', label: '我的', path: 'user', active: false }
    ]);
    
    // 计算属性
    const filteredCategories = computed(() => {
      if (activeCategory.value === 'all') {
        return categoryProducts.value;
      }
      return categoryProducts.value.filter(
        category => category.id === activeCategory.value
      );
    });
    
    // 方法
    const switchCategory = (categoryId) => {
      activeCategory.value = categoryId;
    };
    
    const addToCart = (product) => {
      cartCount.value++;
      totalPrice.value += product.price;
      alert(`已将 ${product.name} 添加到购物车`);
    };
    
    const checkout = () => {
      router.push('/checkout');
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
  .bg-gradient-order {
    background: linear-gradient(135deg, #1677FF 0%, #40A9FF 100%);
  }
  .product-card {
    transition: all 0.2s ease;
  }
  .product-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  }
}
</style>