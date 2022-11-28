import { createStore } from "vuex";
import _ from "lodash";
// eslint-disable-next-line no-unused-vars
import mockScore from "@/store/mock-score.json";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      status: "stoped", // 'stoped' | 'gaming' | 'finished'
      listItem: {},
      time: 0,
      scores: [],
    };
  },
  getters: {
    getStatus: (state) => state.status,
    getListItem: (state) => state.listItem,
    getTime: (state) => state.time,
    getRemaing: (state) => state.listItem.filter((card) => card.matched === false).length / 2,
    getScores: (state) => state.scores.slice(0, 18),
  },
  mutations: {
    changeStatus(state, status) {
      state.status = status;
    },
    setTime(state, time) {
      state.time = time;
    },
    addItems(state, items) {
      state.listItem = items;
    },
    changItems(state, newItems) {
      state.listItem = newItems;
    },
    saveScores(state, scores) {
      state.scores = scores;
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
          visible: false, // cambiar luego si se quiere hacer mostrar for test
        };
      });
      commit("changItems", shuffleCards);
    },
    readScore({ dispatch }) {
      const ls = localStorage.getItem("scores");
      if (!ls) {
        console.log("vacio");
        return;
      }
      const scores = JSON.parse(ls);
      // let scores =mockScore
      dispatch("refreshScore", scores);
    },
    saveScore({ dispatch, state }, score) {
      const scores = [...state.scores, score];
      dispatch("refreshScore", scores);
      localStorage.setItem("scores", JSON.stringify(scores));
    },
    refreshScore({ commit }, scores) {
      scores
        .sort(function (a, b) {
          if (Number(a.time) > Number(b.time)) {
            return 1;
          }
          if (Number(a.time) < Number(b.time)) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })
        .map((score, index) => {
          score.position = index + 1;
          return score;
        });
      commit("saveScores", scores);
    },
  },
});

export default store;
