<template>
  <div class="bg-gray-50 h-screen overflow-hidden flex flex-col">
    <!-- 顶部导航 -->
    <div class="bg-white p-4 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">吊毛奶茶</h1>
        <div class="flex items-center space-x-4">
          <div class="relative w-full max-w-xs" id="search-container">
            <input
              type="text"
              placeholder="搜索饮品、配料"
              class="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              id="search-input"
              v-model="searchTerm"
              @keyup.enter="handleSearch"
            />
            <i class="iconfont icon-sousuo text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
          </div>
          <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center relative">
            <i class="iconfont icon-gouwuche text-gray-500"></i>
            <span
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
              >{{ cartCount }}</span
            >
          </div>
          <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <i class="iconfont icon-wode text-gray-500"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 轮播图 -->
    <div class="relative h-48 overflow-hidden" id="carousel">
      <div
        class="absolute inset-0 banner-gradient flex items-center p-6 text-white"
        :style="{ background: currentSlide.bg }"
      >
        <div>
          <h2 class="text-2xl font-bold mb-2">{{ currentSlide.title }}</h2>
          <p class="mb-4 opacity-90">{{ currentSlide.desc }}</p>
          <button
            class="bg-white text-primary px-4 py-2 rounded-full text-sm font-medium"
            @click="handleBannerClick"
          >
            立即查看
          </button>
        </div>
      </div>
      <div
        class="carousel-indicators absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2"
        id="carousel-indicators"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="w-2 h-2 rounded-full bg-white"
          :class="{ 'opacity-100': currentSlideIndex === index, 'opacity-50': currentSlideIndex !== index }"
          @click="goToSlide(index)"
        ></div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="bg-white py-4">
      <div class="grid grid-cols-4 gap-2 text-center px-4">
        <div
          class="card-hover text-center"
          v-for="(quickLink, index) in quickLinks"
          :key="index"
          @click="navigateTo(quickLink.path)"
        >
          <div
            class="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
            :class="quickLink.bgColor"
          >
            <i
              class="iconfont text-xl"
              :class="[quickLink.icon, quickLink.textColor]"
            ></i>
          </div>
          <p class="text-xs text-gray-700">{{ quickLink.label }}</p>
        </div>
      </div>
    </div>

    <!-- 推荐商品 -->
    <div class="flex-1 overflow-y-auto scrollbar-hide p-4">
      <h2 class="text-lg font-bold text-gray-800 mb-4">人气推荐</h2>
      <div class="grid grid-cols-2 gap-4 mb-6" id="product-container">
        <div
          class="bg-white rounded-xl shadow-sm overflow-hidden card-hover cursor-pointer"
          v-for="(product, index) in filteredProducts"
          :key="index"
          @click="navigateTo('order')"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-36 object-cover"
          />
          <div class="p-3">
            <h3 class="font-bold text-gray-800 mb-1">{{ product.name }}</h3>
            <p class="text-gray-500 text-xs mb-2">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-primary font-bold">¥{{ product.price }}</span>
              <div
                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                @click.stop="addToCart(product)"
              >
                <i class="iconfont icon-jia"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 新品上市 -->
      <h2 class="text-lg font-bold text-gray-800 mb-4">新品上市</h2>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="bg-white rounded-xl shadow-sm overflow-hidden card-hover cursor-pointer"
          v-for="(newProduct, index) in newProducts"
          :key="index"
          @click="navigateTo('order')"
        >
          <img
            :src="newProduct.image"
            :alt="newProduct.name"
            class="w-full h-36 object-cover"
          />
          <div class="p-3">
            <h3 class="font-bold text-gray-800 mb-1">{{ newProduct.name }}</h3>
            <p class="text-gray-500 text-xs mb-2">
              {{ newProduct.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-primary font-bold">¥{{ newProduct.price }}</span>
              <div
                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                @click.stop="addToCart(newProduct)"
              >
                <i class="iconfont icon-jia"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="border-t border-gray-200 bg-white py-2 px-6">
      <div class="flex justify-around">
        <div
          class="text-center"
          v-for="(navItem, index) in navItems"
          :key="index"
          @click="navigateTo(navItem.path)"
        >
          <i
            class="iconfont text-xl"
            :class="[navItem.icon, { 'text-primary': navItem.active, 'text-gray-400': !navItem.active }]"
          ></i>
          <p
            class="text-xs mt-1"
            :class="{ 'text-primary': navItem.active, 'text-gray-400': !navItem.active }"
          >
            {{ navItem.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    // 轮播图数据
    const slides = ref([
      { 
        title: '秋季新品上市', 
        desc: '限定款奶茶第二杯半价', 
        bg: 'linear-gradient(to right, rgba(22, 119, 255, 0.9), rgba(64, 169, 255, 0.7))' 
      },
      { 
        title: '会员专享', 
        desc: '充值100送20', 
        bg: 'linear-gradient(to right, rgba(255, 153, 0, 0.9), rgba(255, 193, 7, 0.7))' 
      },
      { 
        title: '周末特惠', 
        desc: '全场饮品8折起', 
        bg: 'linear-gradient(to right, rgba(72, 187, 120, 0.9), rgba(16, 185, 129, 0.7))' 
      }
    ]);
    
    const currentSlideIndex = ref(0);
    const currentSlide = computed(() => slides.value[currentSlideIndex.value]);
    
    // 快捷入口数据
    const quickLinks = ref([
      { 
        icon: 'icon-diancan', 
        label: '立即点单', 
        path: 'order', 
        bgColor: 'bg-orange-50', 
        textColor: 'text-orange-500' 
      },
      { 
        icon: 'icon-youhuiquan', 
        label: '优惠券', 
        path: 'coupons', 
        bgColor: 'bg-purple-50', 
        textColor: 'text-purple-500' 
      },
      { 
        icon: 'icon-dingdan', 
        label: '我的订单', 
        path: 'orders', 
        bgColor: 'bg-green-50', 
        textColor: 'text-green-500' 
      },
      { 
        icon: 'icon-jifen', 
        label: '个人中心', 
        path: 'user', 
        bgColor: 'bg-blue-50', 
        textColor: 'text-blue-500' 
      }
    ]);
    
    // 商品数据
    const products = ref([
      { 
        id: 1, 
        name: '珍珠奶茶', 
        description: '经典奶茶 · Q弹珍珠', 
        price: 16, 
        image: 'https://picsum.photos/id/292/300/200', 
        category: 'popular' 
      },
      { 
        id: 2, 
        name: '草莓奶盖', 
        description: '新鲜草莓 · 芝士奶盖', 
        price: 22, 
        image: 'https://picsum.photos/id/1080/300/200', 
        category: 'popular' 
      },
      { 
        id: 3, 
        name: '芋泥波波奶茶', 
        description: '香糯芋泥 · 黑糖波波', 
        price: 19, 
        image: 'https://picsum.photos/id/175/300/200', 
        category: 'new' 
      },
      { 
        id: 4, 
        name: '芒果多多', 
        description: '新鲜芒果 · 椰果', 
        price: 20, 
        image: 'https://picsum.photos/id/163/300/200', 
        category: 'new' 
      }
    ]);
    
    // 导航数据
    const navItems = ref([
      { icon: 'icon-shouye', label: '首页', path: 'home', active: true },
      { icon: 'icon-fenlei', label: '点单', path: 'order', active: false },
      { icon: 'icon-gouwuche', label: '购物车', path: 'cart', active: false },
      { icon: 'icon-wode', label: '我的', path: 'user', active: false }
    ]);
    
    // 搜索功能
    const searchTerm = ref('');
    
    const filteredProducts = computed(() => {
      if (!searchTerm.value) {
        return products.value.filter(product => product.category === 'popular');
      }
      
      const term = searchTerm.value.toLowerCase();
      return products.value.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    });
    
    const newProducts = computed(() => {
      return products.value.filter(product => product.category === 'new');
    });
    
    // 购物车
    const cartCount = ref(0);
    
    // 方法
    const goToSlide = (index) => {
      currentSlideIndex.value = index;
    };
    
    const handleBannerClick = () => {
      router.push('/promotion');
    };
    
    const handleSearch = () => {
      // 搜索逻辑
      console.log('搜索内容:', searchTerm.value);
    };
    
    const navigateTo = (path) => {
      router.push(`/${path}`);
    };
    
    const addToCart = (product) => {
      // 添加到购物车逻辑
      console.log('添加到购物车:', product);
      cartCount.value += 1;
    };
    
    // 生命周期钩子
    onMounted(() => {
      // 轮播图自动切换
      setInterval(() => {
        currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length;
      }, 5000);
      
      // 从localStorage加载购物车数量
      const cartData = JSON.parse(localStorage.getItem('milkTeaCart') || '[]');
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
  .banner-gradient {
    background: linear-gradient(to right, rgba(22, 119, 255, 0.9), rgba(64, 169, 255, 0.7));
  }
  .nav-item-active {
    color: #1677FF;
    border-bottom: 2px solid #1677FF;
  }
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
}
</style>