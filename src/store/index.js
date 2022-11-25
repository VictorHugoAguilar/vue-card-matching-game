import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      status: "stoped", // 'stoped' | 'gaming' | 'finished'
      count: 0,
    };
  },
  getters: {
    getStatus: (state) => state.status,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    changeStatus(state, status) {
      state.status = status;
    },
  },
});

export default store;
