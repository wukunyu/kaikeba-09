<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-link :to="{name: 'pageA', params: {id: '123'}}">to a</router-link>
    <router-link :to="{name: 'pageB', params: {id: '222'}}">to b</router-link>
    <router-view />

    <button type="primary" @click="increament">+</button>
    {{$store.state.count}}
    <button type="primary" @click="decrement">-</button>
    <button @click="test">test</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "App",
  methods: {
    test() {
      console.log(123);
      let aa = mapActions(["increament", "decrement"])
      console.log(...aa);
    },
    ...mapActions(["increament", "decrement"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
