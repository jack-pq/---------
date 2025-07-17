/**
 * 饿了么风格工具函数
 */

/**
 * 格式化价格显示
 * @param {Number} price - 价格(分)
 * @returns {String} 格式化后的价格
 */
export function formatPrice(price) {
  return (price / 100).toFixed(2);
}

/**
 * 模拟饿了么的倒计时显示
 * @param {Number} seconds - 剩余秒数
 * @returns {String} 格式化时间 00:00:00
 */
export function formatCountDown(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  return [h, m, s]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');
}

/**
 * 获取饿了么主题色
 * @returns {Object} 主题色对象
 */
export function getThemeColors() {
  return {
    primary: '#409EFF',
    success: '#67C23A',
    warning: '#E6A23C',
    danger: '#F56C6C',
    info: '#909399'
  };
}

/**
 * 生成随机ID (模拟饿了么订单ID)
 * @returns {String} 随机ID
 */
export function generateRandomId() {
  return 'el' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}