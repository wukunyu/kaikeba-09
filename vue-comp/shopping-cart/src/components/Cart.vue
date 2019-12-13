<template>
  <div>
    <h2>购物车</h2>
    <table>
      <tr>
        <th>勾选</th>
        <th>名称</th>
        <th>价格</th>
        <th>数量</th>
        <th>总价</th>
      </tr>
      <tr v-for="(item, index) in cartList" :key="item.id">
        <td>
          <input type="checkbox" v-model="item.isActive" id />
        </td>
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
        <td>
          <button @click="minus(index)">-</button>
          {{item.num}}
        </td>
        <button @click="add(index)">+</button>
        <td>{{item.num * item.price}}</td>
      </tr>
      <tr>
        <td colspan="2">{{activeNum}}/{{allNum}}</td>
        <td colspan="2">{{allPrice}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ["cartList"],
  computed: {
    activeNum() {
      return this.cartList.filter(item => item.isActive).length;
    },
    allNum() {
      return this.cartList.length;
    },
    allPrice() {
      let ret = 0;
       this.cartList
        .filter(item => item.isActive)
        .forEach(s => {
           ret += s.price * s.num
        });
        return ret
    }
  },
  methods: {
    minus(index) {
      let num = this.cartList[index].num;
      if (num > 1) {
        this.cartList[index].num -= 1;
      } else {
        if (window.confirm("确定要删除？")) {
          this.$emit("remove", index);
        }
      }
    },
    add(index) {
      this.cartList[index].num += 1;
    }
  }
};
</script>

<style scoped>
</style>