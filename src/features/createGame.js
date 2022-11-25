import { ref, computed } from "vue";
import _ from "lodash";
import { useStore } from "vuex";
import getHash from "@/utilities/hash";

export default function createGame(deck) {
  const store = useStore();
  const newPlayer = ref(true);

  const startGame = () => {
    newPlayer.value = false;
    restartGame();
  };

  const restartGame = () => {
    store.commit("changeStatus", `gaming${getHash()}`);

    deck.value = _.shuffle(deck.value);

    deck.value = deck.value.map((card, index) => {
      return {
        ...card,
        position: index,
        matched: false,
        visible: true, // TODO: cambiar luego
      };
    });
  };

  const status = computed(() => {
    if (remainingPairs.value === 0) {
      store.commit("changeStatus", "finished");

      return "Player wins";
    } else {
      return `Remaining Pairs: ${remainingPairs.value}`;
    }
  });

  const remainingPairs = computed(() => {
    const remainingCards = deck.value.filter((card) => card.matched === false).length;
    return remainingCards / 2;
  });

  return {
    newPlayer,
    startGame,
    restartGame,
    status,
    remainingPairs,
  };
}
