import { createStore } from "vuex";
import _ from "lodash";

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
          visible: true, // TODO: cambiar luego
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
      // TODO: quitar comentado
      // const scores = JSON.parse(ls);
      let scores = [
        { position: 1, name: "Victor", time: 12 },
        { position: 2, name: "Victor2", time: 22 },
        { position: 3, name: "Victor3", time: 32 },
        { position: 4, name: "Victor4", time: 142 },
        { position: 5, name: "Victor5", time: 52 },
        { position: 6, name: "Victor6", time: 62 },
        { position: 7, name: "Victor7", time: 272 },
        { position: 8, name: "Victor8", time: 82 },
        { position: 9, name: "Victor9", time: 92 },
        { position: 10, name: "Victor10", time: 102 },
        { position: 11, name: "Victor", time: 13 },
        { position: 12, name: "Victor2", time: 42 },
        { position: 13, name: "Victor3", time: 32 },
        { position: 14, name: "Coquis", time: 41 },
        { position: 15, name: "Victor5", time: 42 },
        { position: 16, name: "Paula", time: 62 },
        { position: 17, name: "Victor7", time: 82 },
        { position: 18, name: "Victor8", time: 92 },
        { position: 19, name: "Victor9", time: 42 },
        { position: 20, name: "VictorH.", time: 13 },
      ];
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
