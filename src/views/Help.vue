<template>
  <div class="phone-frame bg-background">
    <div class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
      <i class="iconfont icon-ellipsis text-dark"></i>
    </div>
    <div class="h-full flex flex-col overflow-hidden">
      <!-- 顶部导航 -->
      <div class="bg-white p-4 shadow-sm z-10">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <i 
              class="iconfont icon-arrow-left text-gray-500 mr-2" 
              @click="navigateTo('user')"
            ></i>
            <h1 class="text-xl font-bold text-dark text-balance">帮助中心</h1>
          </div>
          <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <i class="iconfont icon-sousuo text-gray-500"></i>
          </div>
        </div>
      </div>

      <!-- 帮助内容 -->
      <div class="flex-1 overflow-y-auto scrollbar-hide p-4">
        <!-- 搜索框 -->
        <div class="relative mb-6">
          <input 
            type="text" 
            placeholder="搜索帮助内容..." 
            v-model="searchTerm"
            @input="handleSearch"
            class="w-full py-3 px-4 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
          >
          <i class="iconfont icon-sousuo text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"></i>
        </div>

        <!-- 常见问题 -->
        <div class="bg-white rounded-2xl shadow-card mb-6 transition-all duration-300 hover:shadow-hover">
          <div class="p-4 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-800">常见问题</h2>
          </div>
          <div class="divide-y divide-gray-100">
            <div 
              v-for="(faq, index) in filteredFaqs" 
              :key="index"
              class="faq-item p-4" 
              :class="{ 'active': faq.active }"
              @click="toggleFaq(index)"
            >
              <div class="flex justify-between items-center">
                <h3 class="font-medium text-gray-800">{{ faq.question }}</h3>
                <i 
                  class="iconfont icon-arrow-down text-gray-400 faq-icon transition-transform"
                  :class="{ 'transform rotate-180': faq.active }"
                ></i>
              </div>
              <div 
                class="faq-answer text-gray-600 text-sm"
                :style="{ 
                  maxHeight: faq.active ? '500px' : '0', 
                  opacity: faq.active ? 1 : 0,
                  paddingTop: faq.active ? '1rem' : '0'
                }"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

        <!-- 订单指南 -->
        <div class="bg-white rounded-xl shadow-card mb-6">
          <div class="p-4 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-800">订单指南</h2>
          </div>
          <div class="p-4 space-y-4">
            <div 
              v-for="(step, index) in orderSteps" 
              :key="index"
              class="flex"
            >
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mr-3 mt-1 transition-transform hover:scale-110">
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="font-medium text-gray-800 mb-1">{{ step.title }}</h3>
                <p class="text-gray-600 text-sm">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系我们 -->
        <div class="bg-white rounded-2xl shadow-card transition-all duration-300 hover:shadow-hover">
          <div class="p-4 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-800">联系我们</h2>
          </div>
          <div class="p-4">
            <p class="text-gray-600 text-sm mb-4">如有其他问题，欢迎联系我们的客服团队</p>
            <div class="flex flex-col space-y-3">
              <div 
                v-for="(contact, index) in contacts" 
                :key="index"
                class="flex items-center"
              >
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center mr-3 transition-transform hover:scale-110"
                  :class="contact.bgColor"
                >
                  <i 
                    class="iconfont" 
                    :class="[contact.icon, contact.textColor]"
                  ></i>
                </div>
                <span class="text-gray-800">{{ contact.text }}</span>
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
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    // 搜索功能
    const searchTerm = ref('');
    
    // 常见问题数据
    const faqs = ref([
      {
        question: '如何修改订单信息？',
        answer: '订单提交后30分钟内可在"待付款"页面修改订单信息。超过30分钟或订单已支付，暂不支持修改，请联系客服处理。',
        active: false
      },
      {
        question: '优惠券如何使用？',
        answer: '在结算页面，点击"优惠券"选项，选择可用的优惠券即可抵扣相应金额。每张订单限用一张优惠券，不可叠加使用。',
        active: false
      },
      {
        question: '如何申请退款？',
        answer: '未取餐的订单可在"待取餐"页面申请退款，退款将在1-3个工作日内原路返回。已取餐的订单暂不支持退款，请联系客服处理。',
        active: false
      }
    ]);
    
    // 订单指南数据
    const orderSteps = ref([
      {
        title: '选择商品',
        description: '在点单页面选择您喜欢的商品，可自定义甜度、冰度等选项。'
      },
      {
        title: '确认订单',
        description: '在购物车页面确认商品信息，选择优惠券，点击"去结算"。'
      },
      {
        title: '支付订单',
        description: '选择支付方式，完成支付后等待取餐通知。'
      },
      {
        title: '到店取餐',
        description: '凭取餐码到店取餐，或等待配送上门（如有配送服务）。'
      }
    ]);
    
    // 联系我们数据
    const contacts = ref([
      {
        icon: 'icon-kefu',
        text: '在线客服',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-500'
      },
      {
        icon: 'icon-phone',
        text: '400-123-4567',
        bgColor: 'bg-green-50',
        textColor: 'text-green-500'
      },
      {
        icon: 'icon-email',
        text: 'service@diaomaon奶茶.com',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-500'
      }
    ]);
    
    // 导航数据
    const navItems = ref([
      { icon: 'icon-shouye', label: '首页', path: 'home', active: false },
      { icon: 'icon-fenlei', label: '点单', path: 'order', active: false },
      { icon: 'icon-gouwuche', label: '购物车', path: 'cart', active: false },
      { icon: 'icon-wode', label: '我的', path: 'user', active: true }
    ]);
    
    // 过滤后的FAQ
    const filteredFaqs = computed(() => {
      if (!searchTerm.value) {
        return faqs.value;
      }
      
      const term = searchTerm.value.toLowerCase();
      return faqs.value.filter(
        faq => 
          faq.question.toLowerCase().includes(term) || 
          faq.answer.toLowerCase().includes(term)
      );
    });
    
    // 方法
    const toggleFaq = (index) => {
      faqs.value[index].active = !faqs.value[index].active;
    };
    
    const handleSearch = () => {
      // 搜索逻辑已通过计算属性实现
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
  .text-balance {
    text-wrap: balance;
  }
  .phone-frame {
    position: relative;
    width: 375px;
    height: 812px;
    margin: 0 auto;
    border: 16px solid #000;
    border-radius: 40px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
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
    background: #000;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .faq-item {
    transition: all 0.3s ease;
  }
  .faq-answer {
    transition: all 0.3s ease;
  }
}
</style>