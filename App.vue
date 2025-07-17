<template>
  <!-- 主容器 -->
  <div id="app">
    <!-- 路由视图 -->
    <router-view />
    
    <!-- 全局加载状态 -->
    <div v-if="loading" class="global-loading">
      <div class="loading-content">
        <i class="iconfont icon-loading spin"></i>
        <span>加载中...</span>
      </div>
    </div>
    
    <!-- 全局弹窗容器 -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="showToast" class="global-toast">
          {{ toastMessage }}
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 全局状态
const loading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

// 显示全局Toast
const showGlobalToast = (message, duration = 2000) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, duration)
}

// 暴露全局方法
defineExpose({
  showGlobalToast
})
</script>

<style>
/* 全局样式 */
#app {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  max-width: 100vw;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 加载动画 */
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  background: white;
  padding: 20px 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.spin {
  animation: spin 1s linear infinite;
  margin-right: 10px;
  font-size: 20px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 全局Toast */
.global-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 999;
  max-width: 80%;
  text-align: center;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>