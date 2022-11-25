import { createStore } from "vuex";
import _ from "lodash";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      status: "stoped", // 'stoped' | 'gaming' | 'finished'
      listItem: {},
    };
  },
  getters: {
    getStatus: (state) => state.status,
    getListItem: (state) => state.listItem,
    getRemaing: (state) => state.listItem.filter((card) => card.matched === false).length / 2,
  },
  mutations: {
    changeStatus(state, status) {
      state.status = status;
    },
    addItems(state, items) {
      state.listItem = items;
    },
    changItems(state, newItems) {
      state.listItem = newItems;
    },
  },
  actions: {
    shuffle({ commit, state }) {
      let shuffleCards = _.shuffle(state.listItem);
      shuffleCards = shuffleCards.map((card, index) => {
        return {
          ...card,
          position: index,
          matched: false,
          visible: true, // TODO: cambiar luego
        };
      });
      commit("changItems", shuffleCards);
    },
  },
});

export default store;
