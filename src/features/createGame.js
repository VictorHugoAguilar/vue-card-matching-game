import { ref, computed } from "vue";
import { useStore } from "vuex";
import getHash from "@/utilities/hash";

export default function createGame() {
  const store = useStore();
  const newPlayer = ref(true);

  const remainingPairs = computed(() => store.getters.getRemaing);

  const startGame = () => {
    newPlayer.value = false;
    restartGame();
  };

  const restartGame = () => {
    store.commit("changeStatus", `gaming${getHash()}`);
    store.dispatch("shuffle");
  };

  const status = computed(() => {
    if (remainingPairs.value === 0) {
      store.commit("changeStatus", "finished");

      return "Player wins";
    } else {
      return `Remaining Pairs: ${remainingPairs.value}`;
    }
  });

  return {
    newPlayer,
    startGame,
    restartGame,
    status,
    remainingPairs,
  };
}
