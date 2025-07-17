<template>
  <div class="welcome-container">
    <div class="welcome-card">
      <h1 class="welcome-title">欢迎使用吊毛奶茶点单系统</h1>
      
      <div class="welcome-content">
        <div class="feature-item">
          <i class="iconfont icon-order feature-icon"></i>
          <div>
            <h3>快速点单</h3>
            <p>浏览菜单并快速下单您喜爱的奶茶饮品</p>
          </div>
        </div>
        
        <div class="feature-item">
          <i class="iconfont icon-coupon feature-icon"></i>
          <div>
            <h3>优惠券</h3>
            <p>查看并使用您的优惠券享受折扣</p>
          </div>
        </div>
        
        <div class="feature-item">
          <i class="iconfont icon-history feature-icon"></i>
          <div>
            <h3>订单历史</h3>
            <p>查看您的历史订单和消费记录</p>
          </div>
        </div>
      </div>
      
      <button 
        class="start-button"
        @click="startUsing"
      >
        开始使用
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    const startUsing = () => {
      router.push('/order')
    }
    
    return {
      startUsing
    }
  }
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.welcome-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.welcome-title {
  color: #1677FF;
  font-size: 28px;
  margin-bottom: 30px;
}

.welcome-content {
  margin-bottom: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  text-align: left;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
}

.feature-icon {
  font-size: 24px;
  color: #1677FF;
  margin-right: 15px;
  min-width: 30px;
}

.feature-item h3 {
  color: #1D2129;
  margin-bottom: 5px;
  font-size: 18px;
}

.feature-item p {
  color: #666;
  font-size: 14px;
}

.start-button {
  background: #1677FF;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-button:hover {
  background: #0958D9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(22, 119, 255, 0.3);
}
</style>