<template>
  <div id="app">
    <!-- <router-view/> -->
    <h1>开课吧-购物车</h1>
    <hr />
    <div>
      <h2>添加课程</h2>
      <div>
        <label for>课程名称：</label>
        <input type="text" v-model="courceInfo.name" />
      </div>
      <div>
        <label for>课程介个：</label>
        <input type="text" v-model="courceInfo.price" />
      </div>
      <div>
        <button @click="addCourceTolist">添加课程到列表</button>
      </div>
    </div>
    <div>
      <h2>课程列表</h2>
      <table>
        <tr>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in courceList" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>
            <button @click="addToCart(index)">添加</button>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <hr />
      <h1>购物车</h1>
      <cart :cartList="this.cartList" @remove="remove"></cart>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Cart from "./components/Cart";
export default {
  name: "app",
  components: { Cart },
  data() {
    return {
      cartList: [],
      courceInfo: {
        name: "",
        price: ""
      },
      courceList: [
        { id: 0, name: "web全栈课程", price: 18888 },
        { id: 1, name: "python", price: 8888 }
      ]
    };
  },
  methods: {
    remove(index) {
      this.cartList.splice(index, 1);
    },
    addCourceTolist() {
      this.courceList.push({ ...this.courceInfo, id: this.courceList.length });
    },
    addToCart(index) {
      let item = this.courceList[index];
      let cartIndex = this.cartList.findIndex(t => t.id === item.id);
      if (cartIndex !== -1) {
        this.cartList[cartIndex].num += 1;
      } else {
        this.cartList.push({ ...item, num: 1, isActive: true });
      }
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
