<template>
  <div class="container">
    <h1>奶茶点单小程序后端数据表设计</h1>

    <!-- 用户表 -->
    <div class="table-section">
      <h2><span class="iconfont icon-user"></span>用户表 (users)</h2>
      <p class="table-description">存储用户基本信息</p>
      <table>
        <tr>
          <th>字段名</th>
          <th>数据类型</th>
          <th>约束</th>
          <th>描述</th>
        </tr>
        <tr>
          <td class="primary-key">user_id</td>
          <td>INT</td>
          <td>PRIMARY KEY, AUTO_INCREMENT</td>
          <td>用户唯一标识</td>
        </tr>
        <tr>
          <td>username</td>
          <td>VARCHAR(50)</td>
          <td>NOT NULL</td>
          <td>用户名</td>
        </tr>
        <tr>
          <td>phone</td>
          <td>VARCHAR(20)</td>
          <td>UNIQUE, NOT NULL</td>
          <td>手机号码</td>
        </tr>
        <tr>
          <td>password</td>
          <td>VARCHAR(100)</td>
          <td>NOT NULL</td>
          <td>加密密码</td>
        </tr>
        <tr>
          <td>avatar_url</td>
          <td>VARCHAR(255)</td>
          <td></td>
          <td>头像URL</td>
        </tr>
        <tr>
          <td>created_at</td>
          <td>DATETIME</td>
          <td>DEFAULT CURRENT_TIMESTAMP</td>
          <td>注册时间</td>
        </tr>
        <tr>
          <td>updated_at</td>
          <td>DATETIME</td>
          <td>DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP</td>
          <td>更新时间</td>
        </tr>
      </table>
    </div>

    <!-- 商品分类表 -->
    <div class="table-section">
      <h2><span class="iconfont icon-category"></span>商品分类表 (categories)</h2>
      <p class="table-description">存储商品分类信息</p>
      <table>
        <tr>
          <th>字段名</th>
          <th>数据类型</th>
          <th>约束</th>
          <th>描述</th>
        </tr>
        <tr>
          <td class="primary-key">category_id</td>
          <td>INT</td>
          <td>PRIMARY KEY, AUTO_INCREMENT</td>
          <td>分类唯一标识</td>
        </tr>
        <tr>
          <td>name</td>
          <td>VARCHAR(50)</td>
          <td>NOT NULL</td>
          <td>分类名称</td>
        </tr>
        <tr>
          <td>description</td>
          <td>VARCHAR(255)</td>
          <td></td>
          <td>分类描述</td>
        </tr>
        <tr>
          <td>sort_order</td>
          <td>INT</td>
          <td>DEFAULT 0</td>
          <td>排序序号</td>
        </tr>
        <tr>
          <td>icon_url</td>
          <td>VARCHAR(255)</td>
          <td></td>
          <td>分类图标URL</td>
        </tr>
      </table>
    </div>

    <!-- 商品表 -->
    <div class="table-section">
      <h2><span class="iconfont icon-product"></span>商品表 (products)</h2>
      <p class="table-description">存储商品信息</p>
      <table>
        <tr>
          <th>字段名</th>
          <th>数据类型</th>
          <th>约束</th>
          <th>描述</th>
        </tr>
        <tr>
          <td class="primary-key">product_id</td>
          <td>INT</td>
          <td>PRIMARY KEY, AUTO_INCREMENT</td>
          <td>商品唯一标识</td>
        </tr>
        <tr>
          <td>name</td>
          <td>VARCHAR(100)</td>
          <td>NOT NULL</td>
          <td>商品名称</td>
        </tr>
        <tr>
          <td class="foreign-key">category_id</td>
          <td>INT</td>
          <td>FOREIGN KEY REFERENCES categories(category_id)</td>
          <td>所属分类ID</td>
        </tr>
        <tr>
          <td>price</td>
          <td>DECIMAL(10,2)</td>
          <td>NOT NULL</td>
          <td>商品价格</td>
        </tr>
        <tr>
          <td>description</td>
          <td>TEXT</td>
          <td></td>
          <td>商品描述</td>
        </tr>
        <tr>
          <td>image_url</td>
          <td>VARCHAR(255)</td>
          <td>NOT NULL</td>
          <td>商品图片URL</td>
        </tr>
        <tr>
          <td>stock</td>
          <td>INT</td>
          <td>DEFAULT 0</td>
          <td>库存数量</td>
        </tr>
        <tr>
          <td>sales</td>
          <td>INT</td>
          <td>DEFAULT 0</td>
          <td>销售数量</td>
        </tr>
        <tr>
          <td>is_recommend</td>
          <td>TINYINT</td>
          <td>DEFAULT 0</td>
          <td>是否推荐(1是,0否)</td>
        </tr>
        <tr>
          <td>status</td>
          <td>TINYINT</td>
          <td>DEFAULT 1</td>
          <td>状态(1上架,0下架)</td>
        </tr>
      </table>
    </div>

    <!-- 订单表 -->
    <div class="table-section">
      <h2><span class="iconfont icon-order"></span>订单表 (orders)</h2>
      <p class="table-description">存储订单基本信息</p>
      <table>
        <tr>
          <th>字段名</th>
          <th>数据类型</th>
          <th>约束</th>
          <th>描述</th>
        </tr>
        <tr>
          <td class="primary-key">order_id</td>
          <td>VARCHAR(32)</td>
          <td>PRIMARY KEY</td>
          <td>订单唯一标识</td>
        </tr>
        <tr>
          <td class="foreign-key">user_id</td>
          <td>INT</td>
          <td>FOREIGN KEY REFERENCES users(user_id)</td>
          <td>用户ID</td>
        </tr>
        <tr>
          <td>total_amount</td>
          <td>DECIMAL(10,2)</td>
          <td>NOT NULL</td>
          <td>订单总金额</td>
        </tr>
        <tr>
          <td>status</td>
          <td>TINYINT</td>
          <td>NOT NULL</td>
          <td>订单状态(0待支付,1已支付,2已取消,3已完成)</td>
        </tr>
        <tr>
          <td>payment_method</td>
          <td>VARCHAR(20)</td>
          <td></td>
          <td>支付方式</td>
        </tr>
        <tr>
          <td>payment_time</td>
          <td>DATETIME</td>
          <td></td>
          <td>支付时间</td>
        </tr>
        <tr>
          <td>create_time</td>
          <td>DATETIME</td>
          <td>DEFAULT CURRENT_TIMESTAMP</td>
          <td>创建时间</td>
        </tr>
        <tr>
          <td>remark</td>
          <td>VARCHAR(255)</td>
          <td></td>
          <td>订单备注</td>
        </tr>
      </table>
    </div>

    <!-- 订单项表 -->
    <div class="table-section">
      <h2><span class="iconfont icon-order-item"></span>订单项表 (order_items)</h2>
      <p class="table-description">存储订单中的商品明细</p>
      <table>
        <tr>
          <th>字段名</th>
          <th>数据类型</th>
          <th>约束</th>
          <th>描述</th>
        </tr>
        <tr>
          <td class="primary-key">item_id</td>
          <td>INT</td>
          <td>PRIMARY KEY, AUTO_INCREMENT</td>
          <td>订单项唯一标识</td>
        </tr>
        <tr>
          <td class="foreign-key">order_id</td>
          <td>VARCHAR(32)</td>
          <td>FOREIGN KEY REFERENCES orders(order_id)</td>
          <td>订单ID</td>
        </tr>
        <tr>
          <td class="foreign-key">product_id</td>
          <td>INT</td>
          <td>FOREIGN KEY REFERENCES products(product_id)</td>
          <td>商品ID</td>
        </tr>
        <tr>
          <td>product_name</td>
          <td>VARCHAR(100)</td>
          <td>NOT NULL</td>
          <td>商品名称</td>
        </tr>
        <tr>
          <td>price</td>
          <td>DECIMAL(10,2)</td>
          <td>NOT NULL</td>
          <td>购买时单价</td>
        </tr>
        <tr>
          <td>quantity</td>
          <td>INT</td>
          <td>NOT NULL</td>
          <td>购买数量</td>
        </tr>
        <tr>
          <td>subtotal</td>
          <td>DECIMAL(10,2)</td>
          <td>NOT NULL</td>
          <td>小计金额</td>
        </tr>
      </table>
    </div>

    <!-- 管理员表 -->
    <div class="table-section">
      <h2><span class="iconfont icon-admin"></span>管理员表 (admins)</h2>
      <p class="table-description">存储后台管理系统用户信息</p>
      <table>
        <tr>
          <th>字段名</th>
          <th>数据类型</th>
          <th>约束</th>
          <th>描述</th>
        </tr>
        <tr>
          <td class="primary-key">admin_id</td>
          <td>INT</td>
          <td>PRIMARY KEY, AUTO_INCREMENT</td>
          <td>管理员唯一标识</td>
        </tr>
        <tr>
          <td>username</td>
          <td>VARCHAR(50)</td>
          <td>NOT NULL</td>
          <td>管理员用户名</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTables'
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
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
h1 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #ff7a45;
}
.table-section {
  margin-bottom: 40px;
}
h2 {
  color: #ff7a45;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
h2 .iconfont {
  margin-right: 10px;
  font-size: 24px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #555;
}
tr:hover {
  background-color: #f9f9f9;
}
.table-description {
  color: #666;
  margin-bottom: 10px;
  font-style: italic;
}
.primary-key {
  color: #ff4d4f;
  font-weight: bold;
}
.foreign-key {
  color: #1890ff;
}
</style>