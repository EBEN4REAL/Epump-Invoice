import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: localStorage.getItem("remisCardUserDetails") ? JSON.parse(localStorage.getItem('remisCardUserDetails')).firstName : false,
  },
  getters: {
    getUserName(state) {
      return state.userName
    },
  },
  mutations: {
    setUserName(state, payload) {
      state.userName = payload
      console.log(payload)
    },  
  },
  modules: {}
});

