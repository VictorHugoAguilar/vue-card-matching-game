import { computed } from "vue";
import { useStore } from "vuex";

export default function createGame() {
  const store = useStore();

  store.dispatch("readScore");

  const players = computed(() => store.getters.getScores);

  const addScore = (score) => {
    store.dispatch("saveScore", score);
  };

  return {
    players,
    addScore,
  };
}
