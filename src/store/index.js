import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { users: [], messages: [] },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
    },
    addMessage(state, message) {
      state.messages.push(message);
    }
  },
  actions: {},
  modules: {}
});
