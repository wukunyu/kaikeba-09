import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 1,
    money: 100
  },
  mutations: {
    increament(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  },
  actions: {
    increament: ({ commit }) => {
      commit("increament");
    },
    decrement: ({ commit }) => {
      commit("decrement");
    }
  },
  getters: {
    
  }
});

export default store;
