import { ref } from "vue";
import { useStore } from "vuex";
import halloweenDeck from "@/data/halloweenDeck.json";

const cardList = ref([]);

const initDeck = (deckData) => {
  deckData.forEach((item) => {
    cardList.value.push({
      value: item,
      variant: 1,
      visible: true,
      position: null,
      matched: false,
    });
    cardList.value.push({
      value: item,
      variant: 2,
      visible: false,
      position: null,
      matched: false,
    });
  });
};

const updateCardPosition = () => {
  cardList.value = cardList.value.map((card, item) => {
    return {
      ...card,
      position: item,
    };
  });
};

const init = () => {
  const store = useStore();
  initDeck(halloweenDeck);
  updateCardPosition();
  store.commit("addItems", cardList);
};

export default function createDeck() {
  return {
    cardList,
    init,
  };
}
