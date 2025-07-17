<template>
  <div class="container">
    <h1>奶茶点单小程序产品流程图</h1>

    <!-- 用户下单流程图 -->
    <div class="flow-section">
      <h2><span class="iconfont icon-user-flow"></span>用户下单流程</h2>
      <p class="flow-description">展示用户从进入小程序到完成订单的完整流程</p>
      <div class="flow-diagram">
        <svg width="1200" height="300" viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg">
          <!-- 开始节点 -->
          <g transform="translate(50, 150)">
            <circle cx="0" cy="0" r="30" fill="#4CAF50" stroke="#388E3C" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="white" font-weight="bold">开始</text>
          </g>

          <!-- 箭头1 -->
          <line x1="80" y1="150" x2="150" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="150,147 160,150 150,153" fill="#999"/>

          <!-- 进入小程序 -->
          <g transform="translate(200, 150)">
            <rect x="-60" y="-25" width="120" height="50" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#1976D2">进入小程序</text>
          </g>

          <!-- 箭头2 -->
          <line x1="260" y1="150" x2="330" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="330,147 340,150 330,153" fill="#999"/>

          <!-- 选择商品 -->
          <g transform="translate(380, 150)">
            <rect x="-60" y="-25" width="120" height="50" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#1976D2">选择商品</text>
          </g>

          <!-- 箭头3 -->
          <line x1="440" y1="150" x2="510" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="510,147 520,150 510,153" fill="#999"/>

          <!-- 加入购物车 -->
          <g transform="translate(560, 150)">
            <rect x="-60" y="-25" width="120" height="50" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#1976D2">加入购物车</text>
          </g>

          <!-- 箭头4 -->
          <line x1="620" y1="150" x2="690" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="690,147 700,150 690,153" fill="#999"/>

          <!-- 去结算 -->
          <g transform="translate(740, 150)">
            <rect x="-60" y="-25" width="120" height="50" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#1976D2">去结算</text>
          </g>

          <!-- 箭头5 -->
          <line x1="800" y1="150" x2="870" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="870,147 880,150 870,153" fill="#999"/>

          <!-- 选择支付方式 -->
          <g transform="translate(920, 150)">
            <rect x="-80" y="-25" width="160" height="50" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#1976D2">选择支付方式</text>
          </g>

          <!-- 箭头6 -->
          <line x1="1000" y1="150" x2="1070" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="1070,147 1080,150 1070,153" fill="#999"/>

          <!-- 完成支付 -->
          <g transform="translate(1130, 150)">
            <circle cx="0" cy="0" r="30" fill="#F44336" stroke="#D32F2F" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="white" font-weight="bold">完成</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- 后台管理流程图 -->
    <div class="flow-section">
      <h2><span class="iconfont icon-admin-flow"></span>后台管理流程</h2>
      <p class="flow-description">展示管理员对商品、订单和用户的管理流程</p>
      <div class="flow-diagram">
        <svg width="1200" height="400" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
          <!-- 开始节点 -->
          <g transform="translate(50, 150)">
            <circle cx="0" cy="0" r="30" fill="#4CAF50" stroke="#388E3C" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="white" font-weight="bold">开始</text>
          </g>

          <!-- 箭头1 -->
          <line x1="80" y1="150" x2="150" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="150,147 160,150 150,153" fill="#999"/>

          <!-- 管理员登录 -->
          <g transform="translate(200, 150)">
            <rect x="-60" y="-25" width="120" height="50" rx="8" fill="#FFF3E0" stroke="#F57C00" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#E65100">管理员登录</text>
          </g>

          <!-- 箭头2 -->
          <line x1="260" y1="150" x2="330" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="330,147 340,150 330,153" fill="#999"/>

          <!-- 管理中心 -->
          <g transform="translate(380, 150)">
            <rect x="-70" y="-30" width="140" height="60" rx="8" fill="#FFEBEE" stroke="#C2185B" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#C2185B" font-weight="bold">管理中心</text>
          </g>

          <!-- 分支箭头 -->
          <line x1="450" y1="150" x2="500" y2="150" stroke="#999" stroke-width="2"/>
          <line x1="500" y1="150" x2="500" y2="80" stroke="#999" stroke-width="2"/>
          <line x1="500" y1="150" x2="500" y2="220" stroke="#999" stroke-width="2"/>
          <line x1="500" y1="220" x2="500" y2="290" stroke="#999" stroke-width="2"/>
          <polygon points="500,77 510,80 500,83" fill="#999"/>
          <polygon points="500,293 510,290 500,287" fill="#999"/>

          <!-- 商品管理 -->
          <g transform="translate(600, 80)">
            <rect x="-60" y="-25" width="120" height="50" rx="8" fill="#E8F5E9" stroke="#388E3C" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#2E7D32">商品管理</text>
          </g>

          <!-- 订单管理 -->
          <g transform="translate(600, 150)">
            <rect x="-60" y="-25" width="120" height="50" rx="8" fill="#E8F5E9" stroke="#388E3C" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#2E7D32">订单管理</text>
          </g>

          <!-- 用户管理 -->
          <g transform="translate(600, 290)">
            <rect x="-60" y="-25" width="120" height="50" rx="8" fill="#E8F5E9" stroke="#388E3C" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#2E7D32">用户管理</text>
          </g>

          <!-- 箭头3 -->
          <line x1="700" y1="80" x2="770" y2="80" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="770,77 780,80 770,83" fill="#999"/>

          <!-- 箭头4 -->
          <line x1="700" y1="150" x2="770" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="770,147 780,150 770,153" fill="#999"/>

          <!-- 箭头5 -->
          <line x1="700" y1="290" x2="770" y2="290" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="770,287 780,290 770,293" fill="#999"/>

          <!-- 商品上下架 -->
          <g transform="translate(820, 80)">
            <rect x="-70" y="-25" width="140" height="50" rx="8" fill="#E0F7FA" stroke="#00695C" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#004D40">商品上下架</text>
          </g>

          <!-- 订单处理 -->
          <g transform="translate(820, 150)">
            <rect x="-70" y="-25" width="140" height="50" rx="8" fill="#E0F7FA" stroke="#00695C" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#004D40">订单处理</text>
          </g>

          <!-- 会员管理 -->
          <g transform="translate(820, 290)">
            <rect x="-70" y="-25" width="140" height="50" rx="8" fill="#E0F7FA" stroke="#00695C" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="#004D40">会员管理</text>
          </g>

          <!-- 汇总箭头 -->
          <line x1="940" y1="105" x2="990" y2="105" stroke="#999" stroke-width="2"/>
          <line x1="940" y1="150" x2="990" y2="150" stroke="#999" stroke-width="2"/>
          <line x1="940" y1="265" x2="990" y2="265" stroke="#999" stroke-width="2"/>
          <line x1="990" y1="105" x2="990" y2="150" stroke="#999" stroke-width="2"/>
          <line x1="990" y1="265" x2="990" y2="150" stroke="#999" stroke-width="2"/>
          <line x1="990" y1="150" x2="1060" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="1060,147 1070,150 1060,153" fill="#999"/>

          <!-- 数据统计 -->
          <g transform="translate(1120, 150)">
            <circle cx="0" cy="0" r="30" fill="#F44336" stroke="#D32F2F" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" fill="white" font-weight="bold">完成</text>
          </g>
        </svg>
      </div>
      <div class="flow-note">
        <p><strong>注：</strong>后台管理系统主要包含三大核心模块：商品管理（商品上下架、价格调整、库存管理）、订单管理（订单查询、订单处理、退款处理）和用户管理（会员信息、消费记录、优惠券管理）。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductFlow'
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}
body {
  background-color: #f5f5f5;
  padding: 20px;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
h1 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #ff7a45;
}
.flow-section {
  margin-bottom: 40px;
}
h2 {
  color: #ff7a45;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
h2 .iconfont {
  margin-right: 10px;
  font-size: 24px;
}
.flow-diagram {
  width: 100%;
  overflow-x: auto;
  padding: 20px 0;
}
.flow-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}
.step-label {
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
  font-weight: bold;
}
.flow-note {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff8e6;
  border-left: 4px solid #ffcc00;
  color: #8a6d3b;
}
</style>